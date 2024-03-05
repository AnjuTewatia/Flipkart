import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import RightHeaderButton from '../../Components/RightHeaderButton';
import Common from '../../utils/common';
import {Typography} from '../../Components/Typography';
import RenderImages from '../../Components/RenderImages';
import IMAGES from '../../utils/Images';
import {Tick} from '../../Icons';
import {useAppContext} from '../../Components/AppContext';
import Button from '../../Components/Button';

const SubScription = ({navigation}) => {
  return (
    <AppBaseComponent
      title={'Subscription Plan'}
      backButton
      navigation={navigation}
      renderChild={Content({navigation})}
      rightButton={<RightHeaderButton title={'Restore'} />}
    />
  );
};

const Content = ({navigation}) => {
  const {windowWidth} = useAppContext();
  return (
    <>
      <ScrollView style={Common.container}>
        <View style={[styles.planView, {height: 320}]}>
          <ImageBackground
            source={IMAGES.subPlanbg}
            style={{
              width: '99%',
              height: 280,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography type="h1" style={{color: '#8C2457', fontSize: 20}}>
              Subscription Plan
            </Typography>
            <Typography type="h1" style={styles.price}>
              $9.99{' '}
              <Typography type="h4" style={{color: '#F87E7D'}}>
                {' '}
                / month.
              </Typography>
            </Typography>
            <View style={styles.instruction}>
              <View style={styles.tickwrrper}>
                <Tick />
              </View>
              <Typography
                style={[styles.instructionText, {width: windowWidth - 100}]}>
                Get notifications when there is a change in price of your
                favorite store or item
              </Typography>
            </View>
            <View style={styles.instruction}>
              <View style={styles.tickwrrper}>
                <Tick />
              </View>
              <Typography style={styles.instructionText}>Remove ads</Typography>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.separator} />
        <View style={[styles.planView, {minHeight: 300, padding: 10}]}>
          <ImageBackground
            source={IMAGES.subs}
            style={{
              width: '99%',
              minHeight: 280,
              alignSelf: 'center',
              paddingVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button title={'Buy Plan'} onPress={() => null} />
            <Typography style={styles.substext}>
              You can manage your subscription and turn off auto-renewal by
              going to your account settings after purchase.
            </Typography>
            <Typography />
            <Typography style={styles.substext}>
              Subscription will auto-renew every month/year based on the
              subscription plan you have purchased, through your account unless
              you cancel it 24 hours prior to the end of the current billing
              period.
            </Typography>
            <Typography />

            <Typography style={styles.substext}>
              Any unused portion of a free trial, if offered, will be forfeited
              when you purchase a subscription, where applicable.
            </Typography>
          </ImageBackground>
        </View>
      </ScrollView>
    </>
  );
};

export default SubScription;

const styles = StyleSheet.create({
  planView: {
    width: '99%',
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowColor: '#CFAFF3',
    shadowRadius: 4,
    elevation: 4, //
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontSize: 50,
    paddingTop: 20,
    zIndex: 999,
    fontFamily: 'DMSans-Bold',
    color: '#F87E7D',
  },
  instruction: {
    width: '85%',
    alignSelf: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  tickwrrper: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#8C2457',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  instructionText: {
    fontSize: 14,
    color: '#371841',
    marginHorizontal: 6,
  },
  separator: {
    borderBottomWidth: 2,
    borderStyle: 'dashed',
    width: '95%',
    alignSelf: 'center',
    marginVertical: 0.5,
    borderColor: '#F5F5F5',
  },
  substext: {
    fontSize: 12,
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
    color: '#6E6F76',
  },
});
