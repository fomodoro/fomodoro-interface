import React, { useState, useContext, useEffect } from 'react';
import ContractContext from 'context/ContractContext';
import { FormattedMessage } from 'react-intl';

import SpaceCard from '../../components/SpaceCard/index';
import UsualButton from '../../components/UsualButton/index';
import { Row, Col, Input } from 'antd';
import './Homepage.css';
import { Link } from 'react-router-dom';
import web3 from 'web3';

function HomePage() {
  const [cardList, setCardList] = useState([]);
  const { governance } = useContext(ContractContext);

  useEffect(() => {
    fetchSpaces();
  }, []);


  const fetchSpaces = async () => {
      let spaces = await governance.methods.getAllSpaces().call();
      let cards = [];
      for (const spaceId of spaces) {
        const space = await governance.methods.getSpace(spaceId).call();
        const card = {
          image: 'https://raw.githubusercontent.com/snapshot-labs/snapshot-spaces/master/spaces/balancer/space.png',
          name: web3.utils.toAscii(space.name),
          tokenName: web3.utils.toAscii(space.symbol),
          noti: 1,
          isFavorite: true,
          id: 1,
        };
        cards = [...cards, card];
      }
      setCardList(cards);
  }

  const fetchSpace = async (id) => {
    let space
  }

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
              <Link to="/space">
                <Col span={6} xxl={4} key={index}>
                  <SpaceCard {...item} />
                </Col>
              </Link>
            </>
          );
        })}
      </Row>
    </>
  );
}

export default HomePage;
