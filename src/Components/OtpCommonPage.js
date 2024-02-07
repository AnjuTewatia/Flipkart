import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Typography} from './Typography';
import {COLORS} from '../utils/styleConst';
import Common from '../utils/common';
import {formatNumberWithLeadingZero} from '../utils/functions';
import Button from './Button';
const CELL_COUNT = 4;

const OtpCommonPage = ({
  loading,
  email,
  value,
  setValue,
  handleSubmit,
  resendOtp,
  optTimer,
  setOptTimer,
}) => {
  //   const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const handleOnchange = text => {
    const newValue = text.replace(/[^0-9]/g, '');
    setValue(newValue);
  };

  useEffect(() => {
    if (optTimer >= 0) {
      setInterval(() => {
        setOptTimer(prev => (prev > 0 ? prev - 1 : prev));
      }, 1000);
    } else {
      return;
    }
  }, []);

  return (
    <View>
      <View style={styles.wrapper}>
        <View style={Common.formWrapper}>
          <CodeField
            ref={ref}
            value={value}
            onChangeText={handleOnchange}
            cellCount={4}
            rootStyle={styles.codeFieldRoot}
            inputMode="numeric"
            keyboardType="numeric"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View
                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}>
                <Typography type="p" style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : '')}
                </Typography>
              </View>
            )}
            {...props}
          />
          {optTimer === 0 ? (
            <Pressable style={{padding: 4}} onPress={resendOtp}>
              <Typography type="h5" style={styles.resetOtpText}>
                Resend OTP
              </Typography>
            </Pressable>
          ) : (
            <View style={styles.timerText}>
              <Typography type="p" style={{}}>
                Resend OTP in
              </Typography>
              <Typography style={styles.boldText} type="p">
                00:{formatNumberWithLeadingZero(optTimer)}
              </Typography>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default OtpCommonPage;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 26,
    gap: 20,
    flexGrow: 1,
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'flex-start',
  },
  cellRoot: {
    width: 60,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
    backgroundColor: COLORS.bgColor,
    borderRadius: 8,
    borderWidth: 1,
  },
  timerText: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  resetOtpText: {
    color: '#F87E7D',
    fontWeight: '600',
  },
  boldText: {
    fontWeight: '700',
    color: '#F87E7D',
  },
  cellText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
  },
  focusCell: {
    borderColor: '#F87E7D',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // For Android
  },
});
