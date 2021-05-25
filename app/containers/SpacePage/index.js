import React, { useEffect, useState, useContext } from 'react';
import fleek from '@fleekhq/fleek-storage-js';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { Row } from 'antd';
import { Heading } from 'rimble-ui';

import ProposalList from '../../components/ProposalList/index';
import UsualButton from '../../components/UsualButton/index';
import './SpacePage.css';
import ContractContext from 'context/ContractContext';

function HomePage(props) {
  const [list, setList] = useState([]);
  const { governance } = useContext(ContractContext);
  const space = props.location.state.space;
  const to =  {
    pathname: `/space/${props.match.params.id}/create-proposal`,
    state: {space}
  }
  
  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
      let id = props.match.params.id;
      let proposals = await governance.methods.getProposals(id).call();
      let proposalList = [];
      for (const proposalId of proposals) {
        console.log(proposalId)
        let input = {
          apiKey: 'oXUQSeADxx68n4FS6XUiTg==',
          apiSecret: 'ifJEyPgAUdSFBg9gvWKLL1x42krnmdanRXMXTGVk4pQ=',
          key: `proposals/${proposalId}`,
          getOptions: ['hash', 'data']
        };
        const result = await fleek.get(input);
        const detail = await JSON.parse(result.data);
        const title = detail.proposal.title;
        const startTime = moment(detail.proposal.startTime);
        const endTime = moment(detail.proposal.endTime);
        const now = moment();
        let status = 'pending';
        let description = `Start ${startTime.fromNow()}`;

        if (endTime.isBefore(now)) {
          status = 'closed';
          description = `End ${endTime.fromNow()}`;
        }

        if (startTime.isBefore(now) && endTime.isAfter(now)) {
          status = 'active'
          description = `End ${endTime.fromNow()}`;
        }

        const item = {
          id: proposalId,
          status: status,
          title: title,
          description: description,
          route: `/space/proposal/${proposalId}`
        };
        proposalList = [...proposalList, item];
      }
      setList(proposalList);
  }

  return (
    <>
      <div className="space-page">
        <Row justify="space-between" style={{ margin: 20 }}>
          <div className="space-page__title">
            <Heading as={'h4'}>{space}</Heading>
            <Heading as={'h2'}>Proposal</Heading>
          </div>

          <Link to={to}>
            <UsualButton
              text="NEW PROPOSAL"
              width="200"
            />
          </Link>
        </Row>
        <Row />
        <ProposalList list={list} />
      </div>
    </>
  );
}

export default HomePage;
