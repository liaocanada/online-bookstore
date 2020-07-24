import { createSlice } from '@reduxjs/toolkit';

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: { jwt: null, isLoggedIn: false, accountData: null, userData: null },
  reducers: {
    login: (state, action) => {
      state.jwt = action.payload.jwt;
      state.accountData = action.payload.accountData;
      state.isLoggedIn = true;
    },
    setUserData: (state, action) => {
      const { jwt, accountData, isLoggedIn } = state;
      if (jwt && accountData && isLoggedIn && accountData['cognito:username'] === action.payload.username) {
        state.userData = action.payload;
        // TODO check email too?
      } else {
        console.log('User data does not match logged in account!');
      }
    }
  },
});

// Actions (operations which mutate state)
export const { login, setUserData } = authorizationSlice.actions;

// Reducer (handling actions)
export default authorizationSlice.reducer;

// Selectors (retrieving data from the state)
export const selectJwt = state => state.authorization.jwt;
export const selectIsLoggedIn = state => state.authorization.isLoggedIn;
export const selectUsername = state => (state.authorization.accountData ?
  state.authorization.accountData['cognito:username'] : '');

export const selectUserData = state => (state.authorization.userData || {});
