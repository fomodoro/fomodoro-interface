import React from 'react';
import './ConnectButton.css';
import { Box, Button, Heading, Text } from 'rimble-ui';

const ConnectButton = props => {
  const { walletAddress } = props;
  const displayAddress = walletAddress
    ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(
        walletAddress.length - 5,
        walletAddress.length,
      )}`
    : 'Connect Wallet';
  return (
    <div className="connect-button">
      <Button>{displayAddress}</Button>
    </div>
  );
};

export default ConnectButton;
