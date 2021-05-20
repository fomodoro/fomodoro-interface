import React from 'react';
import { FormattedMessage } from 'react-intl';

import SpaceCard from '../../components/SpaceCard/index';
import UsualButton from '../../components/UsualButton/index';
import { Row, Col, Input } from 'antd';
import './Homepage.css';

function HomePage() {
  const cardList = [
    {
      image:
        'https://raw.githubusercontent.com/snapshot-labs/snapshot-spaces/master/spaces/balancer/space.png',
      name: 'Balancer',
      tokenName: 'BAL',
      noti: 1,
      isFavorite: true,
      id: 1,
    },
    {
      image:
        'https://raw.githubusercontent.com/snapshot-labs/snapshot-spaces/master/spaces/balancer/space.png',
      name: 'Balancer',
      tokenName: 'BAL',
      noti: 1,
      isFavorite: true,
      id: 2,
    },

    {
      image:
        'https://raw.githubusercontent.com/snapshot-labs/snapshot-spaces/master/spaces/balancer/space.png',
      name: 'Balancer',
      tokenName: 'BAL',
      noti: 1,
      isFavorite: true,
      id: 3,
    },
    {
      image:
        'https://raw.githubusercontent.com/snapshot-labs/snapshot-spaces/master/spaces/balancer/space.png',
      name: 'Balancer',
      tokenName: 'BAL',
      noti: 1,
      isFavorite: true,
      id: 4,
    },
    {
      image:
        'https://raw.githubusercontent.com/snapshot-labs/snapshot-spaces/master/spaces/balancer/space.png',
      name: 'Balancer',
      tokenName: 'BAL',
      noti: 1,
      isFavorite: true,
      id: 12,
    },

    {
      image:
        'https://raw.githubusercontent.com/snapshot-labs/snapshot-spaces/master/spaces/balancer/space.png',
      name: 'Balancer',
      tokenName: 'BAL',
      noti: 1,
      isFavorite: true,
      id: 13,
    },
    {
      image:
        'https://raw.githubusercontent.com/snapshot-labs/snapshot-spaces/master/spaces/balancer/space.png',
      name: 'Balancer',
      tokenName: 'BAL',
      noti: 1,
      isFavorite: true,
      id: 14,
    },
    {
      image:
        'https://raw.githubusercontent.com/snapshot-labs/snapshot-spaces/master/spaces/balancer/space.png',
      name: 'Balancer',
      tokenName: 'BAL',
      noti: 1,
      isFavorite: true,
      id: 22,
    },

    {
      image:
        'https://raw.githubusercontent.com/snapshot-labs/snapshot-spaces/master/spaces/balancer/space.png',
      name: 'Balancer',
      tokenName: 'BAL',
      noti: 1,
      isFavorite: true,
      id: 23,
    },
    {
      image:
        'https://raw.githubusercontent.com/snapshot-labs/snapshot-spaces/master/spaces/balancer/space.png',
      name: 'Balancer',
      tokenName: 'BAL',
      noti: 1,
      isFavorite: true,
      id: 24,
    },
  ];

  return (
    <>
      <Row justify="space-between">
        <Input.Search
          placeholder="Search Space"
          style={{ width: 30, borderRadius: 40, width: 300 }}
        />
        <UsualButton text="CREATE SPACE" width={200} />
      </Row>

      <Row className="home-page-wrapper">
        {cardList.map((item, index) => {
          return (
            <>
              <Col span={6} xxl={4} key={index}>
                <SpaceCard {...item} />
              </Col>
            </>
          );
        })}
      </Row>
    </>
  );
}

export default HomePage;
