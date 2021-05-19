import React from 'react';
import './TableList.css';
const TableList = props => {
  const { headerRender, bodyRender, isList } = props;
  return (
    <>
      <div className="table-list">
        <div className="table-list__header">{headerRender}</div>
        <div className={`table-list__body ${isList ? '' : 'padding-body'}`}>
          {bodyRender}
        </div>
      </div>
    </>
  );
};

export default TableList;
