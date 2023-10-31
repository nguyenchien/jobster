import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { logoutUser } from "../user/userSlice";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";

// init state
const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

// create job
export const createJob = createAsyncThunk(
  'job/create',
  async (job, thunkAPI) => {
    try {
      const resp = await customFetch.post('/jobs', job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`
        }
      });
      thunkAPI.dispatch(handleClearValue());
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Logging out...'));
        return thunkAPI.rejectWithValue('Unauthorized! Logging out...');
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// delete job
export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const resp = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`
        }
      });
      thunkAPI.dispatch(getAllJobs());
      return resp.data.msg;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// job slice
const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, {payload: {name, value}}) => {
      state[name] = value;
    },
    handleClearValue: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || ''
      };
    }
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Job created successfully!');
    },
    [createJob.rejected]: (state, payload) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteJob.fulfilled]: (state, {payload}) => {
      toast.success(payload);
    },
    [deleteJob.rejected]: (state, payload) => {
      toast.error(payload);
    },
  }
});

export default jobSlice.reducer;
export const { handleChange, handleClearValue } = jobSlice.actions;