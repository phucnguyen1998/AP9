import React, { useState, useEffect } from 'react'
import { styled as MuiStyled, Theme } from '@mui/material/styles'
import { Box, Typography, Link as MuiLink, Input, Grid, InputLabel } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import { Field, Form, Formik } from 'formik'
import dayjs from 'dayjs'
import AuthButton from '../../AuthDialog/AuthButton'
import { useTranslation } from 'react-i18next'
import router from 'next/router'
import { FormInput } from '../../FormInput'
import { FormAutocomplete } from '../../FormAutocomplete'
import { FormSelect } from '../../FormSelect'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Link from 'next/link'
import { AP9_THEME } from '../../../constants/theme'
import { profileSchema } from './validationSchema'
import { useSnackbar } from 'notistack'
import URLs from '../../../constants/URLs'
import { useApiRequest } from '../../../hooks/useApiRequest'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import Compressor from 'compressorjs'
import { EKYCUnverifiedIcon, EKYCVerifiedIcon } from '../../AP9Icons'
import { GenderConfig } from './../../../constants/configs'
import { KYC_STATUS } from './../../../constants/common'
import { makeStyles } from '@mui/styles'
import { DatePicker } from 'formik-mui-lab'
import { AuthState, SignInSuccessPayload, signinSuccess } from '../../../store/slices/authSlice'
import Loader from '../../Loader'

interface UserProfileProps {}

const useStyles = makeStyles((theme: Theme) => ({
  styleInput: {
    paddingBottom: '24px',
    width: '100%',
    '& > .MuiFormControl-root > .MuiOutlinedInput-root > .Mui-disabled': { background: '#ECECEE;' },
  },
  styleLastInput: {
    width: '100%',
    '& > .MuiFormControl-root > .MuiOutlinedInput-root > .Mui-disabled': { background: '#ECECEE;' },
  },
  styleDatepicker: {
    '& > .MuiFormControl-root > .MuiOutlinedInput-root > input': { padding: '8.5px 32px 8.5px 14px' },
    '& > .MuiFormControl-root': { width: '100%' },
  },
}))

const BoxWrapper = MuiStyled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingLeft: 24,
  paddingRight: 24,
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const StyledTitle = MuiStyled(Box)(({ theme }) => ({
  display: 'flex',
  alignItem: 'start',
  padding: '24px 24px 0 24px',
}))

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

const StyledLink = MuiStyled(MuiLink)(({ theme }) => ({
  marginBottom: '12px',
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 600,
  [theme.breakpoints.up('lg')]: {
    marginBottom: '24px',
  },
}))

const UploadAvatar = MuiStyled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  border: `2px solid ${theme.palette.background.paper}`,
}))

const StyledInputLabel = MuiStyled(InputLabel)(({ theme }) => ({
  marginBottom: '8px',
  [theme.breakpoints.up('lg')]: {},
  fontWeight: 600,
  fontSize: '16px',
  color: '#110F24',
}))

const UserProfile: React.FunctionComponent<UserProfileProps> = ({}) => {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const classes = useStyles()
  const [listCountries, setListCountries] = useState<any>([])
  const [avatar, setAvatar] = useState('')
  const [file, setFile] = useState(null)
  const [fileCompress, setFileCompress] = useState<string | ArrayBuffer | null>(null)
  const [kycStatus, setKycStatus] = useState(0)

  const [dataUpdateProfile, setDataUpdateProfile] = useState<any>(null)
  const { t } = useTranslation()

  const accessToken = useSelector((store: RootState) => store.auth.accessToken, shallowEqual)
  const auth: AuthState = useSelector((store: RootState) => store.auth, shallowEqual)
  const user = useSelector((store: RootState) => store.auth.user, shallowEqual)

  let initialState = {
    uid: user?.uid,
    email: user?.email,
    name: user?.name,
    lastName: user?.lastName,
    phone: user?.phone,
    address: user?.address,
    country: user?.countries,
    sex: user?.sex,
    birthday: user?.birthday,
  }

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar)
      setKycStatus(user.kycStatus)
    }
  }, [user])

  // API get countries
  const {
    data: countries,
    error: getCountryError,
    mutate: mutateCountry,
  } = useApiRequest(
    {
      url: `${URLs.AUTH_GET_COUNTRIES}`,
      method: 'GET',
      configs: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  )

  // call API get profile, countries
  useEffect(() => {
    if (!accessToken) {
      router.push('/')
    } else {
      mutateCountry()
    }
  }, [accessToken, mutateCountry])

  useEffect(() => {
    if (countries) {
      setListCountries(countries.data)
    } else if (getCountryError) {
      enqueueSnackbar(getCountryError.data.data, { variant: 'error' })
    }
  }, [countries, enqueueSnackbar, getCountryError])

  // select avatar
  const selectAvatar = (event: any) => {
    setFile(event.target.files[0])
  }

  useEffect(() => {
    if (file) {
      new Compressor(file, {
        quality: 0.4,
        success(result) {
          let reader = new FileReader()
          reader.readAsDataURL(result)
          reader.onloadend = function () {
            let base64String = reader.result
            setFileCompress(base64String)
          }
        },
        error(err) {
          console.log(err)
        },
      })
    }
  }, [file])

  // update profile
  const handleFormSubmit = (values: any, actions: any) => {
    let data = {
      avatar: fileCompress,
      address: values.address,
      name: values.name,
      lastName: values.lastName,
      birthday: dayjs(values.birthDay).format('YYYY-MM-DD'),
      countryId: values.country.id,
      sex: values.sex,
      phone: values.phone,
    }

    setDataUpdateProfile(data)
    actions.setSubmitting(false)
  }

  const {
    data: updateProfile,
    error: updateProfileError,
    mutate: mutateUpdateProfile,
    isValidating,
  } = useApiRequest(
    {
      url: `${URLs.AUTH_GET_PROFILE}`,
      method: 'POST',
      data: dataUpdateProfile,
      configs: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  )

  useEffect(() => {
    if (dataUpdateProfile) {
      mutateUpdateProfile()
    }
  }, [dataUpdateProfile, mutateUpdateProfile])

  useEffect(() => {
    if (updateProfile) {
      enqueueSnackbar(t('profile_page.update.success'), { variant: 'success' })
      let authData: SignInSuccessPayload = {
        access_token: auth.accessToken,
        refresh_token: auth.refreshToken,
        expires_in: auth.expiresIn,
        token_type: auth.tokenType,
      }
      dispatch(signinSuccess(authData))
    } else if (updateProfileError) {
      enqueueSnackbar(updateProfileError.message, { variant: 'error' })
    }
  }, [
    auth.accessToken,
    auth.expiresIn,
    auth.refreshToken,
    auth.tokenType,
    dispatch,
    enqueueSnackbar,
    t,
    updateProfile,
    updateProfileError,
  ])

  const renderKycStatus = () => {
    switch (kycStatus) {
      case KYC_STATUS.UN_KYC:
        return <EKYCUnverifiedIcon sx={{ marginLeft: '6px', width: 20, color: '#C84040' }} />
      case KYC_STATUS.PENDING:
        return <EKYCVerifiedIcon sx={{ marginLeft: '6px', width: 20, color: '#E67337' }} />
      case KYC_STATUS.ACCEPT:
        return <EKYCVerifiedIcon sx={{ marginLeft: '6px', width: 20, color: '#3CA455' }} />
      case KYC_STATUS.REJECT:
        return <EKYCUnverifiedIcon sx={{ marginLeft: '6px', width: 20, color: '#C84040' }} />
      default:
        return <EKYCUnverifiedIcon sx={{ marginLeft: '6px', width: 20, color: '#C84040' }} />
    }
  }

  return (
    <>
      {isValidating && <Loader className="fixed" />}
      <StyledTitle>
        <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>{t('profile_page.account_info_title')}:</Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', paddingTop: '4px' }}>
          <Typography sx={{ marginLeft: 1, fontSize: '16px', fontWeight: 400 }}>KYC</Typography> {renderKycStatus()}
        </Box>
      </StyledTitle>
      <Formik
        initialValues={initialState}
        onSubmit={handleFormSubmit}
        enableReinitialize
        validationSchema={profileSchema(t)}
      >
        {(properties: any) => {
          const { touched, errors, handleSubmit, values } = properties
          return (
            <Form onSubmit={handleSubmit} style={{ width: '100%', paddingTop: '24px', paddingBottom: '24px' }}>
              <BoxWrapper sx={{ borderBottom: '1px solid #CCCED0' }}>
                <Stack direction="row" spacing={2}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <label htmlFor="icon-button-file">
                        <Input sx={{ display: 'none' }} id="icon-button-file" type="file" onChange={selectAvatar} />
                        <UploadAvatar
                          alt="Upload new avatar"
                          sx={{ background: AP9_THEME.palette.background.paper, border: '1px solid #F6F6F9' }}
                        >
                          <CameraAltOutlinedIcon
                            sx={{ width: '16.5px', height: '13px', color: AP9_THEME.palette.common.black }}
                          />
                        </UploadAvatar>
                      </label>
                    }
                  >
                    <Avatar
                      alt="Name"
                      src={(file && URL.createObjectURL(file)) || avatar}
                      sx={{ width: '100px', height: '100px' }}
                    />
                  </Badge>
                </Stack>

                <Typography sx={{ paddingTop: 1, fontSize: '16px', fontWeight: 600, marginBottom: 2 }}>
                  {`${values.name ? values.name : ''} ${values.lastName ? values.lastName : ''}`}
                </Typography>

                {user?.kycStatus !== KYC_STATUS.ACCEPT && (
                  <Link href="/user/ekyc" passHref>
                    <StyledLink>
                      {t('profile_page.verify_kyc_title')}
                      <ArrowForwardIosIcon sx={{ paddingLeft: 1, paddingTop: '12px' }} />
                    </StyledLink>
                  </Link>
                )}

                <GridWrapper>
                  <Field
                    fullWidth
                    disabled
                    className={classes.styleInput}
                    size="small"
                    component={FormInput}
                    name="email"
                    type="text"
                    placeholder={'Email'}
                    error={touched.email && Boolean(errors.email)}
                  />

                  <Field
                    fullWidth
                    disabled
                    className={classes.styleInput}
                    size="small"
                    component={FormInput}
                    name="uid"
                    type="text"
                    placeholder={'UID'}
                    error={touched.uid && Boolean(errors.uid)}
                  />
                </GridWrapper>
              </BoxWrapper>
              <BoxWrapper>
                <GridWrapper sx={{ paddingTop: 3 }}>
                  <Field
                    fullWidth
                    className={classes.styleInput}
                    size="small"
                    component={FormInput}
                    name="name"
                    type="text"
                    placeholder={t('profile_page.first_name')}
                    error={touched.name && Boolean(errors.name)}
                  />

                  <Field
                    fullWidth
                    className={classes.styleInput}
                    size="small"
                    component={FormInput}
                    name="lastName"
                    type="text"
                    placeholder={t('profile_page.last_name')}
                    error={touched.lastName && Boolean(errors.lastName)}
                  />
                </GridWrapper>

                <GridWrapper>
                  <Grid className={classes.styleDatepicker} item xs={12} mb={3}>
                    <StyledInputLabel>{t('profile_page.date_of_birth')}</StyledInputLabel>
                    <Field component={DatePicker} name="birthday" />
                  </Grid>

                  <FormSelect
                    name="sex"
                    className={classes.styleInput}
                    listOptions={GenderConfig}
                    placeholder={t('profile_page.gender')}
                  />
                </GridWrapper>

                <GridWrapper>
                  <FormAutocomplete
                    name="country"
                    className={classes.styleInput}
                    options={listCountries}
                    touched={touched}
                    errors={errors}
                    placeholder={t('profile_page.country')}
                  />

                  <Field
                    component={FormInput}
                    fullWidth
                    className={classes.styleInput}
                    size="small"
                    name="phone"
                    type="text"
                    placeholder={t('profile_page.phone_number')}
                    error={touched.phone && Boolean(errors.phone)}
                  />
                </GridWrapper>

                <Field
                  component={FormInput}
                  fullWidth
                  className={classes.styleLastInput}
                  size="small"
                  sx={{ paddingBottom: 0 }}
                  name="address"
                  type="text"
                  placeholder={t('profile_page.address')}
                  error={touched.address && Boolean(errors.address)}
                />

                <AuthButton disable={isValidating} label={t('profile_page.button_label.save')} />
              </BoxWrapper>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default UserProfile
