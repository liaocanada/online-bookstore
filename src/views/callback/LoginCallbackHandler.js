import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { login, setUserData } from '../../redux/authenticationSlice';
import getHashParams from '../shared/helpers/getHashParams';
import { getUser } from '../../api/usersApi';
import config from '../../config';

// Receives a cognito code, and uses it to make a request for a JWT.
//     Then, stores JWT in Redux state
const LoginCallBackHandler = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const hashObj = getHashParams(location);

  // TODO Call cognito api to get JWT instead of receiving it directly in url
  const jwt = hashObj.id_token;

  // Get the path that the user was on before logging in
  const redirectPath = sessionStorage.getItem(config.sessionStorage.CURRENT_PATH_KEY);

  if (jwt) {
    // Decode and save jwt (account data) to redux
    const accountData = jwtDecode(jwt);
    const payload = { jwt, accountData };
    dispatch(login(payload));

    // Fetch user data asynchronously. When done, save it to redux.
    const username = accountData['cognito:username'];
    getUser(username).then(userAndOrders => dispatch(setUserData(userAndOrders.user)));

    history.push(redirectPath || '/?message=loginSuccess');
  } else {
    history.push('/?message=loginFailed');
  }

  return null;
};

export default LoginCallBackHandler;
