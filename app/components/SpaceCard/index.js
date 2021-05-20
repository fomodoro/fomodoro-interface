import React from 'react';
import './SpaceCard.css';
import { Heading } from 'rimble-ui';

const SpaceCard = props => {
  const { image, name, tokenName, noti, isFavorite } = props;
  console.log('t', props);
  return (
    <div className="space-card">
      <img src={image} alt={name} className="space-card__image" />
      <Heading as="h2">{name}</Heading>
      <div className="space-card__token-name"> {tokenName}</div>
    </div>
  );
};

export default SpaceCard;
