import React from 'react';
import { Pill, Heading, Button } from 'rimble-ui';
import TableList from '../TableList/index';
import './VoteList.css';
import UsualButton from '../UsualButton/index';
import { Empty } from 'antd';

const VoteList = props => {
  const { voteList } = props;
  console.log('u', voteList);
  const VoteListHeader = () => (
    <div className="vote-list__header">
      <Heading as="h3" style={{ margin: 0 }}>
        Cast your Vote
      </Heading>
    </div>
  );
  const VoteListBody = () => (
    <>
      <div className="vote-list__body">
        {voteList && voteList.length > 0 ? (
          voteList.map((item, index) => (
            <div className="vote-list__item" key={index}>
              <UsualButton text={item} width="100%" />
            </div>
          ))
        ) : (
          <Empty />
        )}
        <div className="vote-list__item-vote">
          <Button.Base width="100%" style={{ borderRadius: 40 }}>
            Vote
          </Button.Base>
        </div>
      </div>
    </>
  );
  return (
    <TableList
      headerRender={<VoteListHeader />}
      bodyRender={<VoteListBody />}
      isList
    />
  );
};
export default VoteList;
