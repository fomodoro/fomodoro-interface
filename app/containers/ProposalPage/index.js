import React from 'react';
import { FormattedMessage } from 'react-intl';

import VoteList from '../../components/VoteList/index';
import SignList from '../../components/SignList/index';
import ProgressList from '../../components/ProgressList/index';
import UsualButton from '../../components/UsualButton/index';
import { Row, Col, Input } from 'antd';
import { Heading, Pill } from 'rimble-ui';
import './ProposalPage.css';

function ProposalPage() {
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

  const test = {
    title: '[Proposal] Authorize Gauntlet for Oracle Pools #QmZ21uS',
    status: 'Closed',
    description:
      'This proposal also appears on Balancers forum. Three weeks ago, Balancer governors voted to allow Gauntlet to set swap fees on pools deployed from the WeightedPoolFactory. At the time, this was the only Balancer V2 pool factory available; but since then, another specialization has been deployed for two-token pools which provide TWAP oracles. This proposal seeks to grant t.',
  };
  const voteList = [
    { id: 1, title: 'Disagree' },
    { id: 2, title: '10% per transaction' },
    { id: 3, title: '20% per transaction ' },
    { id: 4, title: '30% per transaction ' },
    { id: 5, title: '40% per transaction ' },
    { id: 6, title: '50% per transaction ' },
  ];

  const userList = [
    {
      id: 1,
      walletAddress: '123123213',
      vote: 'disagree',
      power: '500 SUSHI',
    },
    {
      id: 2,
      walletAddress: '123123213',
      vote: 'disagree',
      power: '500 SUSHI',
    },
    {
      id: 3,
      walletAddress: '123123213',
      vote: 'disagree',
      power: '500 SUSHI',
    },
    {
      id: 4,
      walletAddress: '123123213',
      vote: 'disagree',
      power: '500 SUSHI',
    },
  ];

  const progressList = [
    {
      id: 1,

      vote: 'disagree',
      power: '500 SUSHI',
      percent: 60,
    },
    {
      id: 1,

      vote: 'disagree',
      power: '500 SUSHI',
      percent: 40,
    },
  ];

  return (
    <>
      <div className="proposal-page">
        <div className="proposal-page__wrapper">
          <Row gutter={[32, 16]}>
            <Col span={18}>
              <Heading as={'h2'}>{test.title}</Heading>
              <Pill color="primary" style={{ marginBottom: 20 }}>
                {test.status}
              </Pill>
              <Row style={{ marginBottom: 20 }}>
                Crypto art is the soul of the industry, pushing us forward and
                brightening our days. The unfortunate reality is that only a few
                people can live from sales in the form of NFTs as well as the
                speed of growth in the market making it scary to leave other
                opportunities behind to focus on crypto art exclusively. I
                propose to alleviate these struggles by launching the Sushi Art
                Class of 2021, giving out 5 scholarships of 50k USDC per annum
                for ambitious artists to push this part of our community
                forward. To be funded are new advances in interweaving crypto
                and art, personal development, and community outreach. The
                funding for a 1 year period shall provide the security artists
                need to plunge themselves into this exciting world. SushiSwap
                has no expectancy for this project except for one piece of work
                to be presented by the artists as an addition to the Sushi
                Gallery at the end of the scholarship. The Sushi Gallery will be
                safeguarded by the SUSHI OPS wallet and displayed in a to-b
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
