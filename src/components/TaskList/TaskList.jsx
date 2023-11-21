import React from 'react';
import TaskItem from '../TaskItem/TaskItem.jsx';

const TaskList = ({ list, toggleCompleteOf, toggleDeleteOf, toggleEditOf }) => {
  return (
    <>
      <ul className="pb-3 ps-0 pe-0">
        {list
          .map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              task={task}
              toggleComplete={toggleCompleteOf}
              toggleDelete={toggleDeleteOf}
              toggleEdit={toggleEditOf}
            ></TaskItem>
          ))
          .sort((a, b) => {
            if (a.complete && !b.complete) {
              return -1; // a viene antes que b
            } else if (!a.complete && b.complete) {
              return 1; // b viene antes que a
            } else {
              return 0; // Sin cambios en el orden
            }
          })
          .reverse()}
      </ul>
    </>
  );
};

export default TaskList;
