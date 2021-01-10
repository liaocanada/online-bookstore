import { useHistory } from 'react-router-dom';
import config from '../../config';

const LogoutCallBackHandler = () => {
  const history = useHistory();

  // Get the path that the user was on before logging in
  const redirectPath = sessionStorage.getItem(config.sessionStorage.CURRENT_PATH_KEY);
  history.push(redirectPath || '/');  // TODO if redirectPath requires authentication, redirect to / instead

  return null;
};

export default LogoutCallBackHandler;
