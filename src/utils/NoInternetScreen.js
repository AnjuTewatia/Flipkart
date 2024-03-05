import NetInfo from '@react-native-community/netinfo';

const NoInternetScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>No Internet Connection</Text>
    </View>
  );
};

export default NoInternetScreen;
