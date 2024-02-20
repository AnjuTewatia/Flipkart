import {
  Button,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Height} from '../utils/styleConst';
import {Typography} from './Typography';
import RenderImages from './RenderImages';
import LinearGradient from 'react-native-linear-gradient';
import {ArrowIcon} from '../Icons';

const HomeImages = ({image, title, instruction, onPress, btnImg}) => {
  return (
    <View style={styles.imgWrapper}>
      <ImageBackground resizeMode="contain" source={image} style={styles.bgImg}>
        <View style={styles.wrapper}>
          <Typography type="h1" style={styles.titleText}>
            {title}
          </Typography>
          <Typography type="h3" style={styles.instruction}>
            {instruction}
          </Typography>

          <View style={styles.rowView}>
            <View style={[styles.borderView, {width: '25%'}]} />
            <View style={[styles.borderView, {width: '15%'}]} />
            <View style={[styles.borderView, {width: '8%'}]} />
          </View>

          <ButtonComponent image={btnImg} title={title} onPress={onPress} />
        </View>
      </ImageBackground>
    </View>
  );
};

const ButtonComponent = ({image, title, onPress}) => {
  return (
    <Pressable style={styles.btnContainer} onPress={onPress}>
      <RenderImages source={image} style={{width: 16, height: 16}} />
      <Typography type="p" style={styles.btntitle}>
        {title}
      </Typography>

      <LinearGradient
        colors={['#371841', '#8C2457']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.linearGradient}>
        <ArrowIcon />
      </LinearGradient>
    </Pressable>
  );
};

export default HomeImages;

const styles = StyleSheet.create({
  imgWrapper: {
    height: Height / 3,
    justifyContent: 'center',
    width: '100%',
    marginVertical: Platform.OS === 'android' ? 8 : 2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowColor: '#CFAFF3',
    shadowRadius: 4,
    elevation: 4, // For Android
    borderRadius: 10,
  },
  bgImg: {
    height: '100%',
    width: '100%',
  },
  titleText: {
    marginTop: 8,
    fontSize: 18,
    // fontWeight: '700',
    color: '#fff',
    fontFamily: 'CinzelDecorative-Bold',
  },
  wrapper: {
    padding: 10,
    height: '100%',
  },
  instruction: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    width: '80%',
  },
  rowView: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  borderView: {
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderColor: '#fff',
    borderRadius: 10,
    borderRadius: 10,
    marginHorizontal: 1,
  },
  // button styling
  btnContainer: {
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    marginBottom: 10,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btntitle: {
    marginHorizontal: 8,
    color: '#371841',
    fontWeight: '600',
  },
  linearGradient: {
    width: 40,
    height: 40,
    borderRadius: 39,
    position: 'absolute',
    right: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
