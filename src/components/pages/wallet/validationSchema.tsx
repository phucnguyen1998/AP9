import { parseInt } from 'lodash'
import * as Yup from 'yup'

const formWithDrawalSchema = (t: any) => {
  return Yup.object().shape({
    bank: Yup.object().required(t('wallet_page.with_drawal_form.bank_name')).nullable(),
    accountName: Yup.string().required(t('wallet_page.with_drawal_form.accountName')),
    branchBank: Yup.string().required(t('wallet_page.with_drawal_form.branchBank')),
    accountNumber: Yup.string().required(t('wallet_page.with_drawal_form.accountNumber')),
    withdrawlAmount: Yup.number()
      .typeError(t('wallet_page.with_drawal_form.withdrawlAmount_error_type'))
      .required(t('wallet_page.with_drawal_form.withdrawlAmount')),
  })
}

export { formWithDrawalSchema }
