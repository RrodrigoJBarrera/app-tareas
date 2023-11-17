import { useEffect, useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskNotification from './components/TaskNotification';

const initTasks = [
  {
    id: 0,
    name: 'Example Task',
    complete: false,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  const [newTask, setNewTask] = useState('');
  const [searchTask, setSearchTask] = useState('');
  const [filterTask, setFilterTask] = useState('');
  const [message, setMessage] = useState(null);
  const [messageTaskAdd, setMessageTaskAdd] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setFilterTask(true);
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

  const findTask = filterTask
    ? tasks.filter(
        (task) =>
          task.name.toUpperCase().indexOf(searchTask.toUpperCase()) !== -1
      )
    : tasks.filter(
        (task) =>
          task.name.toUpperCase().indexOf(searchTask.toUpperCase()) !== -1 &&
          task.complete === filterTask
      );

  const handleSearch = (event) => {
    setSearchTask(event.target.value);
  };

  const toggleClickFilter = () => {
    filterTask ? setFilterTask(false) : setFilterTask(true);
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
        <div className="container text-start w-50 h-75 overflow-scroll bg-light rounded-4 shadow">
          <div className="row">
            <div className="col-12 ">
              <TaskList
                list={findTask}
                toggleCompleteOf={toggleCompleteItem}
                toggleDeleteOf={toggleDeleteItem}
              ></TaskList>
            </div>
          </div>
        </div>
      </div>

      {/* <TaskFilter
        onChange={handleSearch}
        onClick={toggleClickFilter}
        filterTask={filterTask}
      ></TaskFilter> */}
    </>
  );
};

export default App;
