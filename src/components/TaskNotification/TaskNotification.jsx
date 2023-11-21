import React from 'react';

const TaskNotification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className="m-5 p-4 rounded-4 bg-success text-light animate__animated animate__fadeIn">
      {message}
    </div>
  );
};

export default TaskNotification;
