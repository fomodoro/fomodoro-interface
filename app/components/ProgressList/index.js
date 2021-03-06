import React from 'react';
import { Pill, Heading, Blockie, Progress } from 'rimble-ui';
import TableList from '../TableList/index';
import './ProgressList.css';
import { Empty } from 'antd';

const ProgressList = props => {
  const { progressList } = props;
  const ProgressListHeader = () => (
    <div className="progress-list__header">
      <Heading
        as="h3"
        style={{ marginTop: 0, marginRight: 10, marginBottom: 0 }}
      >
        Current Result
      </Heading>
    </div>
  );
  const ProgressListBody = () => (
    <>
      {progressList && progressList.length > 0 ? (
        progressList.map((item, index) => (
          <>
            <div className="progress-list__item-wrapper">
              <div className="progress-list__item" key={index}>
                <div className="progress-list__item--vote">{item.vote}</div>
                <div className="progress-list__item--power">{item.power}</div>
                <div className="progress-list__item--percent">
                  {Number(item.percent)}%
                </div>
              </div>
              <div className="progress-list__progress" key={index}>
                <Progress
                  value={Number(item.percent) / 100}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </>
        ))
      ) : (
        <Empty />
      )}
    </>
  );
  return (
    <TableList
      headerRender={<ProgressListHeader />}
      bodyRender={<ProgressListBody />}
      isList
    />
  );
};
export default ProgressList;
