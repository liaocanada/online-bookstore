import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateJwt } from '../shared/redux/authorization';
import getHashParams from '../shared/helpers/getHashParams';

// Receives a cognito code, and uses it to make a request for a JWT.
//     Then, stores JWT in Redux state
const LoginCallBackHandler = props => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const hashObj = getHashParams(location);

  // TODO Call cognito api to get JWT instead of receiving it directly in url
  const jwt = hashObj.id_token;

  if (jwt) {
    dispatch(updateJwt(jwt));
    history.push('/?message=loginSuccess');
  } else {
    history.push('/?message=loginFailed');
  }

  return null;
};

export default LoginCallBackHandler;
