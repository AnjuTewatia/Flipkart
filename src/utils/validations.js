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
  first_name: nameSchema(
    'First name is required.',
    'First name should maximum 20 characters.',
  ),
  last_name: nameSchema(
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

export const oldPassSchema = (message, maxMessage) =>
  yup.string().trim().required(message).max(20, maxMessage);
export const changePasswordScheme = yup.object().shape({
  current_password: oldPassSchema('Old password is required.'),
  password: passwordSchema(),
  confirmPassword: confirmPasswordSchema('password'),
});

export const editnameSchema = (message, maxMessage) =>
  yup.string().trim().required(message).max(20, maxMessage);

export const editemailSchema = yup
  .string()
  .trim()
  .email('Please enter valid email address.')
  .matches(emailRegExp, 'Please enter valid email id.');

export const editProfileScheme = yup.object().shape({
  first_name: editnameSchema(
    'First name is required .',
    'First name should maximum 20 characters.',
  ),
  last_name: editnameSchema(
    'Last name is required .',
    'Last name should maximum 20 characters.',
  ),
  // email: editemailSchema,
});

export const addItemValidation = yup.object().shape({
  name: nameSchema(
    'Item name is required.',
    'Item name should maximum 20 characters.',
  ),
  brandName: nameSchema('Brand Category is required.'),
  alcohol_percentage: yup
    .number()

    .required('Alcohol percentage is required.')
    .max(100, 'Percentage must be less than or equal to 100.'),
  quantity: yup.number().required('Quantity is required').max(9999, '9999'),
  pack_size: yup
    .string()
    .trim()
    .required('Pack size is required')
    .max(2, 'quantity should maximum 2 characters.'),
  price: yup
    .string()
    .trim()
    .required('Price is required.')
    .max(6, 'Price must be less than or equal to 999999.'),
});

export const addBrandValidation = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Brand name is required.')
    .max(50, 'Brand name should maximum 50 characters.'),
  category: nameSchema('Category is required.'),
});

export const addStoreValidation = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Store name is required.')
    .max(50, 'Store name should maximum 50 characters.'),
  address: nameSchema('Address is required.'),
});
export const PriceSchema = yup.object().shape({
  updated_price: yup
    .string()
    .trim()
    .required('Price is required.')
    .max(6, 'Price must be less than or equal to 999999.'),
});
