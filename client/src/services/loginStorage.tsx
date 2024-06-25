import storage from '../redux/storage';

const loadLoginState = async () => {
  let user;
  await storage
    .load({
      key: 'loginState',

      autoSync: true,

      syncInBackground: true,

      syncParams: {
        extraFetchOptions: {},
        someFlag: true,
      },
    })
    .then(ret => {
      user = ret;
    })
    .catch(err => {
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          break;
        case 'ExpiredError':
          // TODO
          break;
      }
    });

  return user;
};

const storeLoginState = (data: any) => {
  storage.save({
    key: 'loginState', // Note: Do not use underscore("_") in key!
    data,
    // if expires not specified, the defaultExpires will be applied instead.
    // if set to null, then it will never expire.
    expires: 1000 * 3600,
  });
};

export {storeLoginState, loadLoginState};
