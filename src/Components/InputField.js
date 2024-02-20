import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../utils/styleConst';
import {Typography} from './Typography';
import {EyeCloseIcon, EyeOpenIcon} from '../Icons';

const InputField = ({
  type,
  formik,
  label,
  isDateField,
  bgWhite,
  name,
  error,
  style,
  ...rest
}) => {
  const isPassword = type === 'password';
  const [showPass, setShowPass] = useState(false);

  const handleEyeToggle = e => {
    e.stopPropagation();
    setShowPass(!showPass);
  };

  return (
    <View style={styles.inputContainer}>
      <Typography type="xs" style={styles.label}>
        {label}
      </Typography>
      <View
        style={[
          styles.textInput,
          style,
          formik?.errors[name] &&
            formik?.touched[name] && {
              borderWidth: 1,
              borderColor: COLORS.errorborder,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 4, // For Android
            },
        ]}>
        <TextInput
          editable={isDateField ? false : true}
          cursorColor={COLORS.darkGrey}
          placeholderTextColor={COLORS.placeholder}
          onChangeText={formik?.handleChange(name)}
          value={formik?.values[name]}
          secureTextEntry={isPassword && !showPass}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          {...rest}
          style={[styles.input]}
        />
        {isPassword && (
          <Pressable onPress={handleEyeToggle} style={styles.eyeIcon}>
            {showPass ? <EyeOpenIcon /> : <EyeCloseIcon />}
          </Pressable>
        )}
      </View>
      {error ? (
        <Typography style={styles.error} type="error">
          {error}
        </Typography>
      ) : (
        formik?.errors[name] &&
        formik?.touched[name] && (
          <Typography style={styles.error} type="error">
            {formik?.errors[name] ?? ''}
          </Typography>
        )
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 8,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 10,
  },
  textInput: {
    fontSize: 14,
    backgroundColor: '#F5F5F5',
    height: 58,
    borderRadius: 8,
    padding: 10,
    paddingRight: 14,
    color: '#000000',
    fontWeight: '400',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    color: COLORS.primary,
  },
  eyeIcon: {
    position: 'absolute',
    padding: 14,
    right: 0,
    lineHeight: '0',
    justifyContent: 'center',
  },
  error: {
    // position: 'absolute',
    // top: '100%',
    marginTop: 4,
    left: 6,
  },
});
