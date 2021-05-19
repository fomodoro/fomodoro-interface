import React from 'react';
import { Pill, Heading } from 'rimble-ui';
import TableList from '../TableList/index';
import './ProposalList.css';

const ProposalList = props => {
  const { list } = props;
  const ProposalListHeader = () => (
    <div className="proposal-list__header">Active</div>
  );
  const ProposalListBody = () => (
    <>
      {list &&
        list.map((item, index) => (
          <div className="proposal-list__item" key={index}>
            <div className="proposal-list__item--title">
              {item.status === 'active' ? (
                <Pill color="green">Active</Pill>
              ) : item.status === 'closed' ? (
                <Pill color="red">Closed</Pill>
              ) : (
                <Pill color="primary">Pending</Pill>
              )}
              <Heading
                as="h3"
                style={{ marginBottom: 5, marginTop: 5, marginLeft: 10 }}
              >
                {item.title}
              </Heading>
            </div>
            <div className="proposal-list__item--description">
              # {item.description}
            </div>
          </div>
        ))}
    </>
  );
  return (
    <TableList
      headerRender={<ProposalListHeader />}
      bodyRender={<ProposalListBody />}
      isList
    />
  );
};
export default ProposalList;
