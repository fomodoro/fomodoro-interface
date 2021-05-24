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
import CreateSpacePage from 'containers/CreateSpacePage/Loadable';
import CreateProposalPage from 'containers/CreateProposalPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Web3 from 'web3';
import fleek from '@fleekhq/fleek-storage-js';
import Governance from 'contracts/Governance.json';
import { ContractProvider } from 'context/ContractContext';

import GlobalStyle from '../../global-styles';
import ContractContext from '../../context/ContractContext';

const AppWrapper = styled.div`
  max-width: 80vw;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  const [isLoading, setLoading] = useState(true);

  const [state, setState] = useState({
    account: '',
    governance: {},
  });

  useEffect(() => {
    loadWeb3();
  },[]);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const web3 = window.web3;
      await loadBlockChaindata(web3);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      const web3 = window.web3;
      loadBlockChaindata(web3)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      );
    }

  };

  const loadBlockChaindata = async (web3) => {
    const accounts =  await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const networkData = Governance.networks[networkId];
    if (networkData) {
      const governance = new web3.eth.Contract(
        Governance.abi,
        networkData.address,
      );
      setState({ account: accounts[0], governance });
      setLoading(false);
    } else {
      window.alert('Smart contract not deployed to detected network.');
    }
  }

  return isLoading ? null :(
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
      <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <ContractProvider value={state}>
        <Header />
      </ContractProvider>
      <ContractProvider value={state}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/space" component={SpacePage} />
          <Route exact path="/space/create" component={CreateSpacePage} />
          <Route exact path="/space/proposal" component={ProposalPage} />
          <Route
            exact
            path="/space/proposal/create"
            component={CreateProposalPage}
          />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </ContractProvider>
      <GlobalStyle />
    </AppWrapper>
  );
}
