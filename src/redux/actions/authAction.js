import axios from 'axios';

let API_AUTH_URL;

if (process.env.NODE_ENV === "development") {
  // url local
  API_AUTH_URL = "http://localhost:5000/api/v1/auth";
} else {
  // url production
  API_AUTH_URL = process.env.REACT_APP_API_AUTH_URL;
}

// Action Types
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Action Creators
export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Thunks
export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/register`, userData);
    return dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerFailure(error.response.data.message));
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/login`, userData);
    return dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
    throw error
  }
};
