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

// all jobs slice
const allJobsSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    }
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
    }
  }
});
export const {showLoading, hideLoading} = allJobsSlice.actions;
export default allJobsSlice.reducer;