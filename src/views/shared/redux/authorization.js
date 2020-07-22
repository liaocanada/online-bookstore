import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: { jwt: null, isLoggedIn: false, jwtDecoded: null },
  reducers: {
    login: (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
      state.jwtDecoded = jwtDecode(action.payload);
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
export const selectUsername = state => (state.authorization.jwtDecoded ?
  state.authorization.jwtDecoded['cognito:username'] : '');
export const selectEmail = state => (state.authorization.jwtDecoded ?
  state.authorization.jwtDecoded.email : '');
