import * as yup from 'yup';

const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PassRegx =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[a-zA-Z]).{8,}$/;

export const nameSchema = (message, maxMessage) =>
  yup.string().trim().required(message).max(20, maxMessage);

export const emailSchema = yup
  .string()
  .trim()
  .required('Email address is required.')
  .email('Please enter valid email address.')
  .matches(emailRegExp, 'Please enter valid email id.');

export const passwordSchema = name =>
  yup
    .string()
    .min(8, 'Minimum 8 characters required.')
    .trim()
    .required(`${name ?? 'Password'} is required.`)
    .matches(
      PassRegx,
      'Password must contain 8 characters(1 uppercase, lowercase, number, and special character).',
    );

export const passwordLoginSchema = name =>
  yup
    .string()
    .trim()
    .required(`${name ?? 'Password'} is required.`);

export const loginValidationScheme = yup.object().shape({
  email: emailSchema,
  password: passwordLoginSchema(),
});

export const confirmPasswordSchema = reference =>
  yup
    .string()
    .oneOf(
      [yup.ref(reference), null],
      "Password and Confirm Password doesn't match.",
    )
    .required('Confirm password is required.');

export const signUpValidationScheme = yup.object().shape({
  name: nameSchema(
    'First name is required.',
    'First name should maximum 20 characters.',
  ),
  surname: nameSchema(
    'Last name is required.',
    'Last name should maximum 20 characters.',
  ),
  email: emailSchema,
  password: passwordSchema(),
  confirmPassword: confirmPasswordSchema('password'),
});

export const forgotEmailScheme = yup.object().shape({
  email: emailSchema,
});

export const resetPasswordScheme = yup.object().shape({
  password: passwordSchema(),
  confirmPassword: confirmPasswordSchema('password'),
});
