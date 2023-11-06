import customFetch from "../../utils/axios";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { handleClearValue } from "../job/jobSlice";
import { logoutUser } from "./userSlice";

export const registerUserThunk = async(url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}

export const loginUserThunk = async(url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}

export const updateUserThunk = async(url, user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, user);
    return resp.data;
  } catch (error) {
    if (error.response.statusCode === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}

export const clearStoreThunk = async(message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(handleClearValue());
    thunkAPI.dispatch(clearAllJobsState());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
}