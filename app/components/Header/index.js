import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import ContractContext from 'context/ContractContext';

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
import { Link } from 'react-router-dom';

function Header() {
  const {account} = useContext(ContractContext);
  return (
    <>
      <div className="header">
        <Link to='/'>
          <Heading>Fomodoro</Heading>
        </Link>
        <ConnectButton walletAddress={account} />
      </div>
      <Divider />
    </>
  );
}

export default Header;
