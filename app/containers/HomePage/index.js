import React, { useState, useContext, useEffect } from 'react';
import ContractContext from 'context/ContractContext';
import { Link } from 'react-router-dom';
import web3 from 'web3';
import { Row, Col, Input } from 'antd';

import SpaceCard from '../../components/SpaceCard/index';
import UsualButton from '../../components/UsualButton/index';
import './Homepage.css';
import spaceLogo from 'images/space.png';

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
          image: spaceLogo,
          name: web3.utils.toAscii(space.name),
          tokenName: web3.utils.toAscii(space.symbol),
          noti: 1,
          isFavorite: true,
          id: spaceId,
          route: `/space/${spaceId}`
        };
        cards = [...cards, card];
      }
      setCardList(cards);
  }

  return (
    <>
      <Row justify="space-between">
        <Input.Search
          placeholder="Search Space"
          style={{ width: 30, borderRadius: 40, width: 300 }}
        />
        <Link to="/create-space">
          <UsualButton text="CREATE SPACE" width={200} />
        </Link>
      </Row>

      <Row className="home-page-wrapper">
        {cardList.map((item, index) => {
          return (
            <>
              <Link to={item.route} key={index}>
                <Col span={6} xxl={4}>
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
