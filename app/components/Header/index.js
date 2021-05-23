import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import ConnectButton from '../ConnectButton/index';
import { Heading } from 'rimble-ui';
import './header.css';
import SpaceCard from '../SpaceCard/index';
import UsualButton from '../UsualButton/index';
import ProposalList from '../ProposalList/index';
import TableList from '../TableList/index';
import VoteList from '../VoteList/index';
import SignList from '../SignList/index';
import ProgressList from '../ProgressList/index';
import { Divider } from 'antd';

function Header() {
  const account = localStorage.getItem('account');
  // console.log('t', account);
  const cardProps = {
    image:
      'https://raw.githubusercontent.com/snapshot-labs/snapshot-spaces/master/spaces/balancer/space.png',
    name: 'Balancer',
    tokenName: 'BAL',
    noti: 1,
    isFavorite: true,
  };
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
      <div className="header">
        <Heading>Fomodoro</Heading>
        <ConnectButton walletAddress={account} />
      </div>
      <Divider />
      {/* <SpaceCard {...cardProps} />
      <UsualButton text="TEST" width={50} />
      <ProposalList list={list} />
      <VoteList voteList={voteList} />
      <SignList userList={userList} />
      <ProgressList progressList={progressList} />> */}
    </>
  );
}

export default Header;
