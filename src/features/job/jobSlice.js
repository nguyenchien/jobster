import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

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
  'job/createJob',
  createJobThunk
);

// delete job
export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  deleteJobThunk
);

// edit job
export const editJobById = createAsyncThunk(
  'job/editJob',
  editJobThunk
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
      }
    },
    setEditJob: (state, {payload}) => {
      return {
        ...state,
        isEditing: true,
        ...payload
      }
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
    [editJobById.pending]: (state) => {
      state.isLoading = true;
    },
    [editJobById.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Job modified successfully!');
    },
    [editJobById.rejected]: (state, payload) => {
      state.isLoading = false;
      toast.error(payload);
    },
  }
});

export default jobSlice.reducer;
export const { handleChange, handleClearValue, setEditJob } = jobSlice.actions;