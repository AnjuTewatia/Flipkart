import {Pressable, StyleSheet, TextInput, View, Text} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../utils/styleConst';
import {Typography} from './Typography';
import {DropDownIcon, EyeCloseIcon, EyeOpenIcon} from '../Icons';

const InputField = ({
  type,
  formik,
  label,
  isDateField,
  bgWhite,
  name,
  error,
  style,
  bgcolor,
  dropdown,
  options,
  setCategoryId,
  ...rest
}) => {
  const isPassword = type === 'password';
  const [showPass, setShowPass] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility

  const handleEyeToggle = e => {
    e.stopPropagation();
    setShowPass(!showPass);
  };
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (categoryName, categoryId) => {
    setCategoryId(categoryId);
    formik?.setFieldValue(name, categoryName);
    setShowDropdown(false);
  };
  return (
    <View style={styles.inputContainer}>
      {label && (
        <Typography type="xs" style={styles.label}>
          {label}
        </Typography>
      )}
      <Pressable
        onPress={() => {
          dropdown ? handleDropdownToggle() : null;
        }}
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
          {backgroundColor: bgcolor ? bgcolor : '#F5F5F5'},
        ]}>
        {dropdown && (
          <View style={{position: 'absolute', right: 20}}>
            <DropDownIcon />
          </View>
        )}
        <TextInput
          editable={!dropdown}
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
      </Pressable>
      {showDropdown && dropdown && (
        <View style={styles.dropdown}>
          {options?.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => handleOptionSelect(option?.name, option?.id)}
              style={styles.option}>
              <Typography type="p">{option?.name}</Typography>
            </Pressable>
          ))}
        </View>
      )}
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
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,

    // elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 999,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});
