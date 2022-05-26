import * as Yup from 'yup'
import { passwordRegExp } from '../../utils/common'

const signInSchema = (t: any) => {
  return Yup.object().shape({
    emailOrPhoneNumber: Yup.string()
      .email('validate.sign_up.invalid_email_or_number_phone_format')
      .required('validate.sign_in.email_or_phone'),
    password: Yup.string().required('validate.sign_in.password'),
  })
}

const forgotPasswordSchema = (t: any) => {
  return Yup.object().shape({
    email: Yup.string()
      .email('validate.sign_up.invalid_email_or_number_phone_format')
      .required('validate.sign_in.email_or_phone'),
  })
}

const changePasswordSchema = (pwd: any, t: any) => {
  return Yup.object().shape({
    password: Yup.string()
      .required('validate.sign_up.password')
      .matches(passwordRegExp, 'validate.sign_up.re_password_not_valid'),
    confirmPassword: Yup.string()
      .required('validate.sign_up.re_password')
      .matches(passwordRegExp, 'validate.sign_up.re_password_not_valid')
      .equals([pwd], 'validate.sign_up.re_password_not_match'),
  })
}

const signUpSchema = (pwd: string, t: any) => {
  return Yup.object().shape({
    name: Yup.string().required('validate.sign_up.fullname'),
    email: Yup.string()
      .email('validate.sign_up.invalid_email_or_number_phone_format')
      .required('validate.sign_up.email_or_phone'),
    password: Yup.string()
      .required('validate.sign_up.password')
      .matches(passwordRegExp, 'validate.sign_up.re_password_not_valid'),
    confirmPassword: Yup.string()
      .required('validate.sign_up.re_password')
      .matches(passwordRegExp, 'validate.sign_up.re_password_not_valid')
      .equals([pwd], 'validate.sign_up.re_password_not_match'),
  })
}
export { signInSchema, signUpSchema, forgotPasswordSchema, changePasswordSchema }
