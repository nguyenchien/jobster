import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

// init state
const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numberOfPage: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

// get all jobs
export const getAllJobs = createAsyncThunk(
  'allJobs/getJobs',
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get('/jobs');
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('There was an error');
    }
  }
)

// show status
export const showStats = createAsyncThunk(
  'allJobs/showStats',
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get('/jobs/stats');
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)

// all jobs slice
const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
    handleChange: (state, {payload: {name, value}}) => {
      // state.page = 1 later
      state[name] = value;
    },
    clearFilters: (state) => {
      return {
        ...state,
        ...initialFiltersState
      }
    },
  },
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, {payload}) => {
      state.jobs = payload.jobs;
      state.isLoading = false;
    },
    [getAllJobs.rejected]: (state, {payload}) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [showStats.pending]: (state) => {
      state.isLoading = true;
    },
    [showStats.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      state.stats = payload.defaultStats;
      state.monthlyApplications = payload.monthlyApplications;
    },
    [showStats.rejected]: (state, {payload}) => {
      state.isLoading = false;
      toast.error(payload);
    },
  }
});
export const {showLoading, hideLoading, handleChange, clearFilters} = allJobsSlice.actions;
export default allJobsSlice.reducer;