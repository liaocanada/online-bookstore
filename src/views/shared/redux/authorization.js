import { createSlice } from '@reduxjs/toolkit';

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: { jwt: null, isLoggedIn: false },
  reducers: {
    login: (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
    }
  },
});

// Actions (operations which mutate state)
export const { login } = authorizationSlice.actions;

// Reducer (handling actions)
export default authorizationSlice.reducer;

// Selectors (retrieving data from the state)
export const selectJwt = state => state.authorization.jwt;
export const selectIsLoggedIn = state => state.authorization.isLoggedIn;
