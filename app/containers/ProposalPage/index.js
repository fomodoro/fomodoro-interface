import React, {useState, useContext, useEffect} from 'react';
import { Row, Col } from 'antd';
import { Heading, Pill } from 'rimble-ui';
import { Link } from 'react-router-dom';
import fleek from '@fleekhq/fleek-storage-js';
import moment from 'moment';

import VoteList from '../../components/VoteList/index';
import SignList from '../../components/SignList/index';
import ProgressList from '../../components/ProgressList/index';
import './ProposalPage.css';
import ContractContext from 'context/ContractContext';

function ProposalPage(props) {
  const [proposal, setProposal] = useState({});
  const [voteList, setVoteList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const { account, governance } = useContext(ContractContext);
  const proposalId = props.match.params.id;
  const to =  {
    pathname: `/space/proposal/${proposalId}`,
  }
  
  useEffect(() => {
    fetchProposal();
  }, []);

  const fetchProposal = async () => {
      let proposal = await governance.methods.getProposal(proposalId).call();
      let input = {
        apiKey: 'oXUQSeADxx68n4FS6XUiTg==',
        apiSecret: 'ifJEyPgAUdSFBg9gvWKLL1x42krnmdanRXMXTGVk4pQ=',
        key: `proposals/${proposalId}`,
        getOptions: ['hash', 'data']
      };
      const result = await fleek.get(input);
      const detail = await JSON.parse(result.data);
      const title = detail.proposal.title;
      const description = detail.proposal.description;
      const choices = detail.proposal.choices;
      const startTime = moment(detail.proposal.startTime);
      const endTime = moment(detail.proposal.endTime);
      const now = moment();
      let status = 'pending';
      if (endTime.isBefore(now)) {
        status = 'closed';
      }
      if (startTime.isBefore(now) && endTime.isAfter(now)) {
        status = 'active'
      }
      setProposal({title, status, description});
      setVoteList(choices);

      let totalPower = 0
      let voterIds = proposal.voterList;
      let voters = [];
      for (const voterId of voterIds) {
        const voterDetail = await governance.methods.getVoter(voterId).call();
        totalPower += voterDetail.power;
        const voter = {
          id: voterId,
          walletAddress: voterDetail.voter,
          vote: choices[voterDetail.choiceIndex],
          power: voterDetail.power,
        };
        voters = [...voters, voter];
      }
      setUserList(voters);

      const voteProgressList = choices.map((choice, index) => {
          const power = voters.reduce(((voter1, voter2) => voter1.power + voter2.power), 0);
          return {
            id: index,
            vote: choice,
            power: power,
            percent: totalPower ? (power / totalPower) * 100 : 0,
          }
      });
      setProgressList(voteProgressList);
  }

  return (
    <>
      <div className="proposal-page">
        <div className="proposal-page__wrapper">
          <Row gutter={[32, 16]}>
            <Col span={18}>
              <Heading as={'h2'}>{proposal.title}</Heading>
              <Pill color="primary" style={{ marginBottom: 20 }}>
                {proposal.status}
              </Pill>
              <Row style={{ marginBottom: 20 }}>
                {proposal.description}
              </Row>
              <div style={{ marginBottom: 20 }}>
                <VoteList voteList={voteList} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <SignList userList={userList} />
              </div>
            </Col>
            <Col span={6}>
              <ProgressList progressList={progressList} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default ProposalPage;
