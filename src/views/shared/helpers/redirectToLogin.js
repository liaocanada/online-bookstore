import config from '../../../config';

export default currentPath => {
  sessionStorage.setItem(config.sessionStorage.CURRENT_PATH_KEY, currentPath);
  window.location = config.LOGIN_URL;
};
