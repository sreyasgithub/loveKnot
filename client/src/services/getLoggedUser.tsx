import {getData} from './asyncStorage';
import {loadLoginState} from './loginStorage';

const getLoggedtUser = async () => {
  const user = await getData('login');
  return user;
};

const loggedUser = getLoggedtUser();
export default loggedUser;
