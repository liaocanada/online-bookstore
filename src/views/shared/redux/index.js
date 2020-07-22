import { configureStore } from '@reduxjs/toolkit';
import authorization from './authorization';

export default configureStore({
  reducer: {
    authorization,
  },
});
