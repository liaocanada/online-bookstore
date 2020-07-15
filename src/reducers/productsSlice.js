import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    value: [{ product_id: 1, name: 'helloooo', price: 0, authors: '', genres: '', quantity: 1 }]
  },
  reducers: {
    // increment: state => {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    //   state.value += 1
    // },
    updateProducts: products => {
      // TODO make API call
      products.value.push({ product_id: 2, name: 'world', price: 0, authors: '', genres: '', quantity: 1 });
    }
  }
});

// Actions (operations which mutate state)
export const { updateProducts } = productsSlice.actions;

// Reducer (handling actions)
export default productsSlice.reducer;

// Selectors (retrieving data from the state)
export const selectAllProducts = state => state.products.value;
export const selectProductById = (state, id) => state.products.value.find(product => product.id === id);
