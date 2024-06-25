import storage from '../../redux/storage';
import {getData, removeData} from '../asyncStorage';
import {loadLoginState} from '../loginStorage';
import loadSignUpState from '../signUpStorage';

const signOut = async (navigation: any) => {
  let loggedUser: any;
  let SignedUpUser: any;
  loggedUser = await getData('login');
  SignedUpUser = await loadSignUpState();
  if (loggedUser) {
    await removeData('login');
  }
  if (SignedUpUser) {
    storage.remove({
      key: 'signUpState',
    });
  }
  loggedUser = await getData('login');
  SignedUpUser = await loadSignUpState();
  console.log(loggedUser);

  if (!loggedUser || !SignedUpUser) {
    navigation.reset({
      index: 0,
      routes: [{name: 'intro'}],
    });
  }
};

export default signOut;
