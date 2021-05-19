import React from 'react';
import './ConnectButton.css';
import { Box, Button, Heading, Text } from 'rimble-ui';

const ConnectButton = props => {
  const { walletAddress } = props;
  return (
    <div className="connect-button">
      <Button>{walletAddress || 'Connect Wallet'}</Button>
    </div>
  );
};

export default ConnectButton;
