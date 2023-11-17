import React from 'react';

const TaskForm = ({ value, onChange, onSubmit, text }) => {
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <div className="row text-center align-items-center justify-content-center">
            <div className="col-auto">
              <input
                className="form-control"
                value={value}
                onChange={onChange}
                placeholder="Nueva Tarea"
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-light"
                type="submit "
                id="liveToastBtn"
              >
                {text}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskForm;
