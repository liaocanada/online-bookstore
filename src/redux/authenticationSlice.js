import { createSlice } from '@reduxjs/toolkit';

/**
 * userData: {
 *   address: string,
 *   email: string,
 *   first_name: string,
 *   last_name: string,
 *   picture: string, (url)
 *   time_created: string, (YYYY-MM-DD HH:MM:SS.M)
 *   username: string 
 * }
 */

export const authenticationSlice = createSlice({
  name: 'authentication',
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
export const { login, setUserData } = authenticationSlice.actions;

// Reducer (handling actions)
export default authenticationSlice.reducer;

// Selectors (retrieving data from the state)
export const selectJwt = state => state.authentication.jwt;
export const selectIsLoggedIn = state => state.authentication.isLoggedIn;
export const selectUsername = state => (state.authentication.accountData ?
  state.authentication.accountData['cognito:username'] : '');

export const selectUserData = state => (state.authentication.userData || {});
