import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  titleChanged,
  taskDeleted,
  taskCreated,
  completeTask,
  getTasks,
  getTaskLoadingStatus,
  loadTasks,
} from './store/task';
import configureStore from './store/store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getError } from './store/errors';

const store = configureStore();

const App = (params) => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTaskLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };
  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };
  const createTask = () => {
    dispatch(taskCreated());
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  console.log(state);

  return (
    <>
      <h1>App</h1>
      <button onClick={() => createTask()}>CreateTask</button>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>onClick</button>
            <button onClick={() => changeTitle(el.id)}>changeTitle</button>
            <button onClick={() => deleteTask(el.id)}>deleteTask</button>

            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
