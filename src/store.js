import {configureStore} from '@reduxjs/toolkit';
import jobSlice from './features/job/jobSlice';
import userSlice from './features/user/userSlice';
import alljobsSlice from './features/alljobs/alljobsSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    alljobs: alljobsSlice,
  }
})