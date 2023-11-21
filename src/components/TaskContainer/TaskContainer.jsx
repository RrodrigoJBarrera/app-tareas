import React from 'react';
import { useEffect, useState } from 'react';
import TaskList from '../TaskList/TaskList.jsx';
import TaskForm from '../TaskForm/TaskForm.jsx';
import TaskNotification from '../TaskNotification/TaskNotification.jsx';
import { v4 as uuidv4 } from 'uuid';

function TaskContainer() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  const [newTask, setNewTask] = useState('');
  const [message, setMessage] = useState(null);
  const [messageTaskAdd, setMessageTaskAdd] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    tasks.length === 0 ? setMessage('Lista Vacia') : setMessage(null);
  }, [tasks]);

  const addTask = (event) => {
    event.preventDefault();
    const taskObject = {
      id: uuidv4(),
      name: newTask,
      complete: false,
    };
    setTasks(tasks.concat(taskObject));
    setMessageTaskAdd('Tarea Agregada!');
    setTimeout(() => {
      setMessageTaskAdd(null);
    }, 3000);
    setNewTask('');
  };

  const toggleCompleteItem = (itemId) => {
    const task = tasks.find((t) => t.id === itemId);
    const changeTask = { ...task, complete: !task.complete };
    setTasks(
      tasks
        .map((task) => (task.id !== itemId ? task : changeTask))
        .sort((a, b) => {
          if (a.complete && !b.complete) {
            return -1; // a viene antes que b
          } else if (!a.complete && b.complete) {
            return 1; // b viene antes que a
          } else {
            return 0; // Sin cambios en el orden
          }
        })
    );
  };

  const toggleDeleteItem = (id) => {
    const newTasks = tasks.filter((task) => id !== task.id);
    setTasks(newTasks);
  };

  const toggleEditItem = (id) => {
    const editTask = tasks.find((task) => id === task.id);
    setNewTask(editTask.name);
    toggleDeleteItem(id);
  };

  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  return (
    <>
      <div className="position-static">
        <div class="position-absolute bottom-0 end-0">
          <TaskNotification
            message={messageTaskAdd || message}
          ></TaskNotification>
        </div>
      </div>
      <div className="container vh-100 justify-content-center align-items-center text-center">
        <h1>Lista de Tareas</h1>
        <div className="row">
          <div className="col-12 p-5">
            <TaskForm
              onSubmit={addTask}
              value={newTask}
              onChange={handleTaskChange}
              text={'Save'}
            ></TaskForm>
          </div>
        </div>
        <div className="container text-start w-50 h-75 overflow-scroll bg-light rounded-4 opacity shadow">
          <div className="row">
            <div className="col-12 ">
              <TaskList
                list={tasks}
                toggleCompleteOf={toggleCompleteItem}
                toggleDeleteOf={toggleDeleteItem}
                toggleEditOf={toggleEditItem}
              ></TaskList>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskContainer;
