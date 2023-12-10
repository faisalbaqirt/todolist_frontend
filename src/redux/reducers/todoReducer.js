import {
    GET_TODOLIST_SUCCESS,
    GET_TODOLIST_FAILURE,
    CREATE_TODO_SUCCESS,
    CREATE_TODO_FAILURE,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_FAILURE,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILURE,
  } from '../actions/todoAction';
  
  const initialState = {
    todolist: [],
    error: null,
  };
  
  const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_TODOLIST_SUCCESS:
        return {
          ...state,
          todolist: action.payload,
          error: null,
        };
      case GET_TODOLIST_FAILURE:
        return {
          ...state,
          todolist: [],
          error: action.payload,
        };
      case CREATE_TODO_SUCCESS:
      case UPDATE_TODO_SUCCESS:
      case DELETE_TODO_SUCCESS:
        return {
          ...state,
          error: null,
        };
      case CREATE_TODO_FAILURE:
      case UPDATE_TODO_FAILURE:
      case DELETE_TODO_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      // Handle other todo-related actions if needed
      default:
        return state;
    }
  };
  
  export default todoReducer;
  