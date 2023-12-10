import axios from 'axios';

let API_TODOLIST_URL;

if (process.env.NODE_ENV === "development") {
  // url local
  API_TODOLIST_URL = "http://localhost:5000/api/v1/todolist";
} else {
  // url production
  API_TODOLIST_URL = process.env.REACT_APP_API_TODOLIST_URL;
}

// Action Types
export const GET_TODOLIST_SUCCESS = 'GET_TODOLIST_SUCCESS';
export const GET_TODOLIST_FAILURE = 'GET_TODOLIST_FAILURE';
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';
export const CREATE_TODO_FAILURE = 'CREATE_TODO_FAILURE';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

// Action Creators
export const getTodolistSuccess = (todolist) => ({
  type: GET_TODOLIST_SUCCESS,
  payload: todolist,
});

export const getTodolistFailure = (error) => ({
  type: GET_TODOLIST_FAILURE,
  payload: error,
});

export const createTodoSuccess = () => ({
  type: CREATE_TODO_SUCCESS,
});

export const createTodoFailure = (error) => ({
  type: CREATE_TODO_FAILURE,
  payload: error,
});

export const updateTodoSuccess = () => ({
  type: UPDATE_TODO_SUCCESS,
});

export const updateTodoFailure = (error) => ({
  type: UPDATE_TODO_FAILURE,
  payload: error,
});

export const deleteTodoSuccess = (todoId) => ({
  type: DELETE_TODO_SUCCESS,
  payload: todoId,
});

export const deleteTodoFailure = (error) => ({
  type: DELETE_TODO_FAILURE,
  payload: error,
});

// Thunks
export const getTodolist = () => async (dispatch) => {
  try {
    const response = await axios.get(API_TODOLIST_URL, {
        headers: {
          Authorization:`${localStorage.getItem('token')}`
        }
      });
    dispatch(getTodolistSuccess(response.data.data));
  } catch (error) {
    dispatch(getTodolistFailure(error.response.data.message));
  }
};

export const createTodo = (task, description) => async (dispatch) => {
  try {
    await axios.post(API_TODOLIST_URL, { task, description }, {
        headers: {
          Authorization:`${localStorage.getItem('token')}`
        }
      });
    dispatch(createTodoSuccess());
  } catch (error) {
    dispatch(createTodoFailure(error.response.data.message));
  }
};

export const updateStatusTodo = (id, status) => async (dispatch) => {
  try {
    await axios.put(`${API_TODOLIST_URL}/${id}`, { status }, {
        headers: {
          Authorization:`${localStorage.getItem('token')}`
        }
      });
    dispatch(updateTodoSuccess());
  } catch (error) {
    dispatch(updateTodoFailure(error.response.data.message));
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_TODOLIST_URL}/${id}`, {
        headers: {
          Authorization:`${localStorage.getItem('token')}`
        }
      });
    dispatch(deleteTodoSuccess(id));
  } catch (error) {
    dispatch(deleteTodoFailure(error.response.data.message));
  }
};
