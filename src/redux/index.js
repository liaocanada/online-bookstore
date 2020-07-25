import { configureStore } from '@reduxjs/toolkit';
import authentication from './authenticationSlice';

export default configureStore({
  reducer: {
    authentication,
  },
});
