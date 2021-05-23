/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SpacePage from 'containers/SpacePage/Loadable';
import ProposalPage from 'containers/ProposalPage/Loadable';
import CreateProposalPage from 'containers/CreateProposalPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Web3 from 'web3';
import fleek from '@fleekhq/fleek-storage-js';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: 80vw;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  const [state, setState] = useState({});
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    setState({ account: accounts[0] });
    localStorage.setItem('account', accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = Governance.networks[networkId];
    if (networkData) {
      const contract = new web3.eth.Contract(
        Governance.abi,
        networkData.address,
      );

      setState({ contract });
      localStorage.setItem('contract', contract);
    } else {
      window.alert('Smart contract not deployed to detected network.');
    }
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/space" component={SpacePage} />
        <Route exact path="/space/proposal" component={ProposalPage} />
        <Route
          exact
          path="/space/proposal/create"
          component={CreateProposalPage}
        />
        <Route path="" component={NotFoundPage} />
      </Switch>

      <GlobalStyle />
    </AppWrapper>
  );
}
