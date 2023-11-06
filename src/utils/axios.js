import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";
import { logoutUser } from "../features/user/userSlice";

const customFetch = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.statusCode === 401) {
    thunkAPI.dispatch(logoutUser());
    return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
}

export default customFetch;