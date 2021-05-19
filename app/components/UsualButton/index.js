import React from 'react';
import { Button } from 'rimble-ui';

const UsualButton = props => {
  const { onClick, text, ...another } = props;
  return (
    <Button.Outline
      onClick={() => onClick && onClick()}
      style={{ borderRadius: 50 }}
      {...another}
    >
      {text}
    </Button.Outline>
  );
};

export default UsualButton;
