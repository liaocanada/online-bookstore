import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsSlice';

export default configureStore({
  reducer: {
    // Defines a state.products in the redux store
    //     with actions handled by the productsReducer
    products: productsReducer
  }
});
