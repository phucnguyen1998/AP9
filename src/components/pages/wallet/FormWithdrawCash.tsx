import { Field, Form, Formik } from 'formik'
import * as React from 'react'
import { styled as MuiStyled, Theme } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { FormInput } from '../../FormInput'
import AuthButton from '../../AuthDialog/AuthButton'
import { useTranslation } from 'react-i18next'
import NoticeComponent from './NoticeComponent'
import { formWithDrawalSchema } from './validationSchema'
import { useApiRequest } from '../../../hooks/useApiRequest'
import URLs from '../../../constants/URLs'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { FormAutocomplete } from '../../FormAutocomplete'
import { closeFormTransferMoney } from '../../../store/slices/layoutSlice'
import Loader from '../../Loader'

interface IFormWithdrawCashProps {}

const GridWrapper = MuiStyled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  columnGap: '24px',
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    flexDirection: 'row',
  },
}))

const StyledButton = MuiStyled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    width: '60%',
    margin: 'auto',
  },
}))

const useStyles = makeStyles((theme: Theme) => ({
  styleInput: {
    paddingBottom: '24px',
    width: '100%',
    '& > .MuiFormControl-root > .MuiOutlinedInput-root > .Mui-disabled': { background: '#ECECEE;' },
  },
  styleDatepicker: {
    '& > .MuiFormControl-root > .MuiOutlinedInput-root > input': { padding: '8.5px 32px 8.5px 14px' },
    '& > .MuiFormControl-root': { width: '100%' },
  },
}))

const FormWithdrawCash: React.FunctionComponent<IFormWithdrawCashProps> = ({}) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const classes = useStyles()
  const [dataWithdrawal, setDataWithdrawal] = useState<any>(null)
  const banks = useSelector((store: RootState) => store.common.banks, shallowEqual)
  const accessToken = useSelector((store: RootState) => store.auth.accessToken, shallowEqual)
  const user = useSelector((store: RootState) => store.auth.user, shallowEqual)

  const {
    data: requestWithdrawal,
    error: WithdrawalError,
    mutate: mutateWithdrawal,
    isValidating,
  } = useApiRequest(
    {
      url: `${URLs.AUTH_REQUEST_WITHDRAWAL}`,
      method: 'POST',
      data: dataWithdrawal,
      accessToken,
    },
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
    }
  )

  useEffect(() => {
    if (dataWithdrawal) {
      mutateWithdrawal()
    }
  }, [dataWithdrawal])

  useEffect(() => {
    if (requestWithdrawal) {
      enqueueSnackbar(t('wallet_page.request_withdrawl_success'), { variant: 'success' })
      dispatch(closeFormTransferMoney())
    } else if (WithdrawalError) {
      if (WithdrawalError.code && WithdrawalError.code === 11) {
        enqueueSnackbar(t('message_error_code_11'), { variant: 'error' })
      }
      enqueueSnackbar(t('message_error_send_request_fail'), { variant: 'error' })
    }
  }, [requestWithdrawal, WithdrawalError])

  const handleSubmitForm = (values: any) => {
    let data = {
      amount: values.withdrawlAmount,
      bank_id: values.bank?.id,
      bank_branch: values.bank.name,
      bank_owner_name: values.accountName,
      bank_account_number: values.accountNumber,
      tax_identification_number: values.taxCode,
    }

    setDataWithdrawal(data)
  }

  const validateWithdrawlAmount = (withdrawlAmount: string) => {
    let error

    let withdrawl = parseInt(withdrawlAmount)
    let balanceAvailable = parseInt(user.wallet.balance)

    if (withdrawl > balanceAvailable) {
      error = t('wallet_page.with_drawal_form.withdrawlAmount_not_available')
    } else {
      error = ''
    }

    return error
  }

  return (
    <>
      <Formik
        initialValues={{
          bank: '',
          accountName: '',
          branchBank: '',
          accountNumber: '',
          withdrawlAmount: '',
          taxCode: '',
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false)
          handleSubmitForm(values)
        }}
        validationSchema={formWithDrawalSchema(t)}
      >
        {(properties) => {
          const { touched, errors } = properties
          return (
            <Form style={{ width: '100%' }}>
              <Box>
                <NoticeComponent />
                <Typography
                  fontWeight={'bold'}
                  textAlign={'left'}
                  component="h1"
                  variant="h5"
                  sx={{ fontSize: 20, marginBottom: 3, marginTop: 3 }}
                >
                  {t('wallet_page.form_title')}
                </Typography>

                <GridWrapper>
                  <FormAutocomplete
                    name="bank"
                    required={true}
                    className={classes.styleInput}
                    options={banks}
                    touched={touched}
                    errors={errors}
                    placeholder={t('wallet_page.form_bank_name')}
                  />

                  <Field
                    fullWidth
                    required={true}
                    className={classes.styleInput}
                    size="small"
                    component={FormInput}
                    name="accountName"
                    type="text"
                    placeholder={t('wallet_page.form_account_name')}
                    error={touched.accountName && Boolean(errors.accountName)}
                  />
                </GridWrapper>

                <GridWrapper>
                  <Field
                    fullWidth
                    required={true}
                    className={classes.styleInput}
                    size="small"
                    component={FormInput}
                    name="branchBank"
                    type="text"
                    placeholder={t('wallet_page.form_branch_bank')}
                    error={touched.branchBank && Boolean(errors.branchBank)}
                  />

                  <Field
                    fullWidth
                    required={true}
                    className={classes.styleInput}
                    size="small"
                    component={FormInput}
                    name="accountNumber"
                    type="text"
                    placeholder={t('wallet_page.form_account_number')}
                    error={touched.accountNumber && Boolean(errors.accountNumber)}
                  />
                </GridWrapper>

                <GridWrapper>
                  <Field
                    fullWidth
                    required={true}
                    className={classes.styleInput}
                    size="small"
                    component={FormInput}
                    name="withdrawlAmount"
                    type="text"
                    validate={validateWithdrawlAmount}
                    placeholder={t('wallet_page.form_withdrawal_amount')}
                    error={touched.withdrawlAmount && Boolean(errors.withdrawlAmount)}
                  />

                  <Field
                    fullWidth
                    required={false}
                    className={classes.styleInput}
                    size="small"
                    component={FormInput}
                    name="taxCode"
                    type="text"
                    placeholder={t('wallet_page.form_tax_code')}
                    error={touched.taxCode && Boolean(errors.taxCode)}
                  />
                </GridWrapper>

                {isValidating && (
                  <Box sx={{ width: '100%', height: '60px', position: 'relative', marginBottom: '24px' }}>
                    <Loader />
                  </Box>
                )}

                <StyledButton>
                  <AuthButton disable={isValidating} mt={0} label={t('wallet_page.form_button_label')} />
                </StyledButton>
              </Box>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default FormWithdrawCash
