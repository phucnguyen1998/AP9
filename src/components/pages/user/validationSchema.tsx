import * as Yup from 'yup'
import { AnyObject, Maybe } from 'yup/lib/types'

export const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$%+\\\/'!#$^?:.(){}[\]~_`-]{6,}$/
declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends Yup.BaseSchema<TType, TContext, TOut> {
    identityNumber(errror: any): Yup.StringSchema<TType, TContext>
  }
}

const profileSchema = (t: any) => {
  return Yup.object().shape({
    name: Yup.string()
      .required(t('profile_page.validate.first_name'))
      .nullable(false)
      .typeError(t('profile_page.validate.first_name')),
    lastName: Yup.string()
      .required(t('profile_page.validate.last_name'))
      .nullable(false)
      .typeError(t('profile_page.validate.last_name')),
    phone: Yup.number()
      .typeError(t('profile_page.validate.phone_number_error_type'))
      .required(t('profile_page.validate.phone_number'))
      .nullable(),
    birthday: Yup.date().nullable(false).typeError(t('profile_page.validate.date_of_birth')),
    country: Yup.object()
      .required(t('profile_page.validate.country'))
      .nullable(false)
      .typeError(t('profile_page.validate.country')),
  })
}

const validatePhone = (value: string) => {
  let error
  if (!value) {
    error = 'kyc_page.validation.error_phone_not_null'
  }
  {
    let [phoneNumber, dialCode] = value.split('|')
    phoneNumber = phoneNumber.replace(`+${dialCode}`, '')

    switch (dialCode) {
      case '84':
        let vnRegexPhoneNumber = /(^(0?[93785]{1})([0-9]{8})$)/g
        if (!phoneNumber.match(vnRegexPhoneNumber)) {
          error = 'kyc_page.validation.error_phone_invalid'
        }
        break

      default:
        break
    }
  }
  return error
}

const kycProfileSchema = (t: any) => {
  Yup.addMethod(Yup.string, 'identityNumber', function (errorMessage) {
    return this.test(`test-card-type`, errorMessage, function (value) {
      const { path, createError } = this
      const passport = value?.match(/(^[A-Z]{1})([0-9]*)$/)

      if (passport) {
        if (passport[2]?.length !== 7) {
          return createError({ path, message: errorMessage.passport })
        }
        return true
      } else {
        const identity = value?.match(/^(?=[0-9]*$)(?:.{9}|.{12})$/)
        if (value && !identity) {
          return createError({ path, message: errorMessage.identity })
        }
      }
      return (value && value.length > 0) || createError({ path, message: errorMessage.all })
    })
  })

  return Yup.object().shape({
    name: Yup.string().required(t('kyc_page.validation.name')).nullable(false).typeError(t('kyc_page.validation.name')),
    lastName: Yup.string()
      .required(t('kyc_page.validation.last_name'))
      .nullable(false)
      .typeError(t('kyc_page.validation.last_name')),
    birthday: Yup.date().nullable(false).typeError(t('kyc_page.validation.date_of_birth')),
    createdPassport: Yup.date().nullable(false).typeError(t('kyc_page.validation.created_passport')),
    country: Yup.object()
      .required(t('kyc_page.validation.country'))
      .nullable(false)
      .typeError(t('kyc_page.validation.country')),
    city: Yup.object().required(t('kyc_page.validation.city')).nullable(false).typeError(t('kyc_page.validation.city')),

    passport: Yup.string()
      .required(t('kyc_page.validation.passport'))
      .identityNumber({
        identity: t('kyc_page.validation.identity_incorrect'),
        passport: t('kyc_page.validation.passport_incorrect'),
        all: t('kyc_page.validation.passport_type_error'),
      }),
    address: Yup.string()
      .required(t('kyc_page.validation.address'))
      .nullable(false)
      .typeError(t('kyc_page.validation.address')),
  })
}

export { profileSchema, kycProfileSchema, validatePhone }
