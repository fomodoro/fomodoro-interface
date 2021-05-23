import React from 'react';
import { FormattedMessage } from 'react-intl';

import ProposalList from '../../components/ProposalList/index';
import UsualButton from '../../components/UsualButton/index';
import { Row, Col, Input } from 'antd';
import { Heading } from 'rimble-ui';

import { Link } from 'react-router-dom';
import './SpacePage.css';

function HomePage() {
  const list = [
    {
      id: 1,
      status: 'active',
      title: 'It suggest to gas volumne',
      description: 'End in 6 month',
    },
    {
      id: 2,
      status: 'closed',
      title: 'It suggest to gas volumne',
      description: 'End in 6 month',
    },
    {
      id: 3,
      status: 'pending',
      title: 'It suggest to gas volumne',
      description: 'End in 6 month',
    },
  ];

  return (
    <>
      <div className="space-page">
        <Row justify="space-between" style={{ margin: 20 }}>
          <div className="space-page__title">
            <Heading as={'h4'}>Balancer</Heading>
            <Heading as={'h2'}>Proposal</Heading>
          </div>

          <Link to="/space/proposal/create">
            <UsualButton
              text="NEW PROPOSAL"
              width="200"
              // onClick={() => history.push('/home')}
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
