import React from 'react';

const TaskItem = ({ task, toggleComplete, toggleDelete, toggleEdit, id }) => {
  const handleClickComplete = () => {
    toggleComplete(id);
  };

  const handleClickRemove = () => {
    toggleDelete(id);
  };

  const handleClickEdit = () => {
    toggleEdit(id);
  };

  const taskComplete = () => task.complete;
  return (
    <>
      <div className=" pt-3 ps-3 fs-3 pe-3 animate__animated animate__fadeInDown">
        {taskComplete() ? (
          <div className="row border border-4 border-success rounded-4 p-3 align-items-center ">
            <div className="col">
              {taskComplete() ? (
                <span className="text-decoration-line-through text-wrap">
                  {task.name}
                </span>
              ) : (
                <span className="text-wrap">{task.name}</span>
              )}
            </div>
            <div className="col-auto">
              {taskComplete() ? (
                <i
                  onClick={handleClickComplete}
                  className="bi bi-check-square-fill fs-5"
                ></i>
              ) : (
                <i
                  onClick={handleClickComplete}
                  className="bi bi-check-square fs-5"
                ></i>
              )}
            </div>
            <div className="col-auto">
              <i
                onClick={handleClickRemove}
                className="bi bi-trash3-fill fs-5 "
              ></i>
            </div>
          </div>
        ) : (
          <div className="row border rounded-4 p-3 align-items-center">
            <div className="col">
              {taskComplete() ? (
                <span className="text-decoration-line-through">
                  {task.name}
                </span>
              ) : (
                <span>{task.name}</span>
              )}
            </div>
            <div className="col-auto">
              {taskComplete() ? (
                <i
                  onClick={handleClickComplete}
                  className="bi bi-check-square-fill fs-5"
                ></i>
              ) : (
                <i
                  onClick={handleClickComplete}
                  className="bi bi-check-square fs-5"
                ></i>
              )}
            </div>
            <div className="col-auto">
              <i
                onClick={handleClickEdit}
                className="bi bi-pencil-square fs-5"
              ></i>
            </div>
            <div className="col-auto">
              <i
                onClick={handleClickRemove}
                className="bi bi-trash3-fill fs-5"
              ></i>
            </div>
          </div>
        )}

        {/* <span>{task.complete ? 'Complete' : 'No complete'}</span> */}
      </div>
    </>
  );
};

export default TaskItem;
