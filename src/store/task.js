import { createSlice } from '@reduxjs/toolkit';
import todosService from '../services/todos.service';
import { setError } from './errors';

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex((el) => el.id === action.payload.id);
      state.entities[elementIndex] = { ...state.entities[elementIndex], ...action.payload };
    },
    create(state, action) {
      state.entities = [...state.entities, action.payload];
    },
    remove(state, action) {
      state.entities = state.entities.filter((el) => el.id !== action.payload.id);
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestedFailed(state, action) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recived, taskRequested, taskRequestedFailed, create } = actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestedFailed());
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id: id, completed: true }));
};

export function titleChanged(id) {
  return update({ id: id, title: `New title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export function taskCreated() {
  return create({ userId: 1, id: 123, title: 'New title', completed: false });
}

export const getTasks = () => (state) => state.task.entities;
export const getTaskLoadingStatus = () => (state) => state.task.isLoading;

export default taskReducer;
