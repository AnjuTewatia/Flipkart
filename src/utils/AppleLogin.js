import {appleAuth} from '@invertase/react-native-apple-authentication';

export const appleLogin = async () => {
  try {
    const credential = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293x
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    console.log('credentail ==>', credential);
  } catch (e) {
    console.log('Apple error ==>', e);

    if (e.code === 'ERR_REQUEST_CANCELED') {
      console.log(e.code);
    } else {
      console.log(e);
    }
  }
};
