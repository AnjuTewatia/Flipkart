import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';

// Define the function as async
const GoogleLogin = async () => {
  const configureParams = {
    scopes: ['email', 'profile'],
    webClientId:
      '1008076396840-rsl0n9975f4igkvu61idr94qtvcmilnk.apps.googleusercontent.com',
    iosClientId:
      '1008076396840-fj5sjb9hv41ruoij709muo4e6jab4u87.apps.googleusercontent.com',
    profileImageSize: 120,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  };
  try {
    GoogleSignin.configure(configureParams);
    const result = await GoogleSignin.signIn({
      // (Optional) Configure sign-in options here
    });

    if (result.status === statusCodes.SUCCESS) {
      // The user has signed in successfully
      console.log('result ==>', result);
      const {idToken, serverAuthCode} = result;
      console.log('Sign-in successful:', idToken, serverAuthCode);

      // (Optional) Send the sign-in credentials to your backend for further processing
    } else {
      // The user canceled the sign-in flow or an error occurred
      console.log('Sign-in failed:', result.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export default GoogleLogin;
