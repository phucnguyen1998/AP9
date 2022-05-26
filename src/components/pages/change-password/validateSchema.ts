import * as Yup from 'yup'
import { passwordRegExp } from '../../../utils/common'

const changePasswordSchema = (t: any) => {
  return Yup.object().shape({
    currentPassword: Yup.string().required(t('validate.change_pwd_for_logged_user.current_password')),
    newPassword: Yup.string()
      .required('validate.change_pwd_for_logged_user.current_password')
      .matches(passwordRegExp, 'validate.change_pwd_for_logged_user.pwd_not_valid'),
  })
}

export { changePasswordSchema }
