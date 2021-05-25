import React from 'react';
import { Pill, Heading, Blockie } from 'rimble-ui';
import TableList from '../TableList/index';
import './SignList.css';
import { Empty } from 'antd';

const SignList = props => {
  const { userList } = props;
  const SignListHeader = () => (
    <div className="sign-list__header">
      <Heading
        as="h3"
        style={{ marginTop: 0, marginRight: 10, marginBottom: 0 }}
      >
        Vote
      </Heading>
      <Pill color="primary">{userList.length}</Pill>
    </div>
  );
  const SignListBody = () => (
    <>
      {userList && userList.length > 0 ? (
        userList.map((item, index) => (
          <div className="sign-list__item" key={index}>
            <div className="sign-list__item--address">
              <Blockie
                opts={{
                  seed: 'foo',
                  color: '#dfe',
                  bgcolor: '#a71',
                  size: 7,
                  scale: 3,
                  spotcolor: '#000',
                }}
              />

              <div className="sign-list__item--address-wallet">
                {item.walletAddress}
              </div>
            </div>
            <div className="sign-list__item--vote">{item.vote}</div>
            <div className="sign-list__item--power">{item.power}</div>
          </div>
        ))
      ) : (
        <Empty />
      )}
    </>
  );
  return (
    <TableList
      headerRender={<SignListHeader />}
      bodyRender={<SignListBody />}
      isList
    />
  );
};
export default SignList;
