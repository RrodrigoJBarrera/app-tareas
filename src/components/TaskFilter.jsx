import React from 'react';

const TaskFilter = ({ onClick, onChange, filterTask }) => {
  return (
    <>
      <div>
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" onChange={onChange} />
        <button onClick={onClick}>
          {filterTask ? 'Filter No Complete' : 'Filter All'}
        </button>
      </div>
    </>
  );
};

export default TaskFilter;
