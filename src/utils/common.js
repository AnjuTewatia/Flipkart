import {StyleSheet} from 'react-native';

const Common = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  formWrapper: {
    gap: 24,
  },
  field: {
    elevation: 4,
    borderRadius: 8,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
export default Common;
