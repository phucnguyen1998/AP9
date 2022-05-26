import React, { useCallback, useEffect, useState } from 'react'
import { Box, Typography, Grid, Link as MuiLink, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { AP9_THEME } from '../../../../constants/theme'
import { useTranslation } from 'react-i18next'
import { Field, Form, Formik } from 'formik'
import { FormInput } from '../../../FormInput'
import { DatePicker } from 'formik-mui-lab'
import isBase64 from 'is-base64'
import {
  BoxWrapperContent,
  BoxWrapper,
  GridWrapper,
  StyledTitle,
  BoxContent,
  StyledPersonKyc,
  StyledPassportIcon,
  StyledIdBack,
  StyledIdFront,
  StyledInputLabel,
} from './styled'
import AuthButton from '../../../AuthDialog/AuthButton'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../../store/store'
import { useApiRequest } from '../../../../hooks/useApiRequest'
import URLs from '../../../../constants/URLs'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { GenderConfig } from '../../../../constants/configs'
import KycUploadFile from '../KycUploadFile'
import { debounce } from 'lodash'
import { KYC_TYPES } from '../../../../constants/common'
import Compressor from 'compressorjs'
import dayjs from 'dayjs'
import { kycProfileSchema, validatePhone } from '../validationSchema'
import { openViewGuideDialog } from '../../../../store/slices/layoutSlice'
import { AuthState, signinSuccess, SignInSuccessPayload } from '../../../../store/slices/authSlice'
import { FormSelect } from '../../../FormSelect'
import { FormAutocomplete } from '../../../FormAutocomplete'
import { Checkbox } from 'formik-mui'
import { styled as MuiStyled } from '@mui/material'
import CustomMuiPhoneNumber from '../../../CustomMuiPhoneNumber'
import Loader from '../../../Loader'

interface KycStepTwoProps {}

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

const Error = MuiStyled((props: any) => <Typography component={'div'} {...props} />)(({ theme }) => ({
  fontSize: 12,
  color: '#d32f2f',
  marginTop: 4,
  marginLeft: 14,
}))

const KycStepTwo: React.FunctionComponent<KycStepTwoProps> = ({}) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const classes = useStyles()
  const router = useRouter()
  const [listCountries, setListCountries] = useState<any>([])
  const [listCities, setListCities] = useState<any>([])
  const [listStates, setListStates] = useState<any>([])
  const [countryId, setCountryId] = useState<any>(240)
  const [kycType, setKycType] = useState<number | null>(null)
  const [countryName, setCountryName] = useState('')
  const [imageBefore, setImageBefore] = useState(null)
  const [imageBeforeUpload, setImageBeforeUpload] = useState('')
  const [imageAfter, setImageAfter] = useState(null)
  const [imageAfterUpload, setImageAfterUpload] = useState('')
  const [imageFace, setImageFace] = useState(null)
  const [imageFaceUpload, setImageFaceUpload] = useState('')
  const [dataKyc, setDataKyc] = useState<any>(null)

  const debouncePassport = useCallback(
    debounce((nextValue) => {
      if (nextValue && nextValue.match(/^[A-Z]{1}[0-9]{7}/)) {
        setKycType(KYC_TYPES.PASSPORT)
      } else if (nextValue && (nextValue.length === 9 || nextValue.length === 12)) {
        setKycType(KYC_TYPES.CCCD)
      } else {
        setKycType(null)
      }
    }, 500),
    []
  )

  const accessToken = useSelector((store: RootState) => store.auth.accessToken, shallowEqual)
  const user = useSelector((store: RootState) => store.auth.user, shallowEqual)
  const auth: AuthState = useSelector((store: RootState) => store.auth, shallowEqual)

  const selectImageBefore = (event: any) => {
    setImageBefore(event.target.files[0])
  }

  const selectImageAfter = (event: any) => {
    setImageAfter(event.target.files[0])
  }

  const selectImageFace = (event: any) => {
    setImageFace(event.target.files[0])
  }

  const compressFile = (file: any, setfile: any) => {
    new Compressor(file, {
      quality: 0.4,
      success(result) {
        let reader = new FileReader()
        reader.readAsDataURL(result)
        reader.onloadend = function () {
          let base64String = reader.result
          setfile(base64String)
        }
      },
      error(err) {
        console.log(err)
      },
    })
  }

  // Compressor file
  useEffect(() => {
    if (imageBefore) {
      compressFile(imageBefore, setImageBeforeUpload)
    }
  }, [imageBefore])

  useEffect(() => {
    if (imageAfter) {
      compressFile(imageAfter, setImageAfterUpload)
    }
  }, [imageAfter])

  useEffect(() => {
    if (imageFace) {
      compressFile(imageFace, setImageFaceUpload)
    }
  }, [imageFace])

  // API get countries
  const {
    data: countries,
    error: getCountryError,
    mutate: mutateCountry,
  } = useApiRequest({
    url: `${URLs.AUTH_GET_COUNTRIES}`,
    method: 'GET',
    accessToken,
  })

  // API get cities
  const {
    data: cities,
    error: getCityError,
    mutate: mutatecity,
  } = useApiRequest(
    {
      url: `${URLs.AUTH_GET_CITIES}?name=${countryName}&countryId=${countryId}`,
      method: 'GET',
      accessToken,
    },
    {
      revalidateOnMount: true,
    }
  )

  // API get states
  const {
    data: dataStates,
    error: getStatesError,
    mutate: mutateStates,
  } = useApiRequest({
    url: `${URLs.AUTH_GET_STATES}?name=${countryName}&countryId=${countryId}`,
    method: 'GET',
    accessToken,
  })

  // api kyc
  const {
    data: kyc,
    error: kycError,
    mutate: mutateKyc,
    isValidating: submittingForm,
  } = useApiRequest({
    url: `${URLs.AUTH_KYC}/${user?.id}`,
    method: 'PUT',
    data: dataKyc,
    accessToken,
  })

  // call API get profile, countries
  useEffect(() => {
    if (!accessToken) {
      router.push('/')
    } else {
      mutateCountry()
    }
  }, [accessToken])

  // set list countries
  useEffect(() => {
    if (countries) {
      setListCountries(countries.data)
    } else if (getCountryError) {
      enqueueSnackbar(getCountryError.data.data, { variant: 'error' })
    }
  }, [countries, getCountryError])

  // call api get list cities by id country
  useEffect(() => {
    if (countryId) {
      mutatecity()
      mutateStates()
    }
  }, [countryId, countryName])

  // set list city
  useEffect(() => {
    if (cities) {
      setListCities(cities.data)
    } else if (getCountryError) {
      enqueueSnackbar(getCityError.data.data, { variant: 'error' })
    }
  }, [cities, getCityError])

  // set list states
  useEffect(() => {
    if (dataStates) {
      setListStates(dataStates.data)
    } else if (getStatesError) {
      enqueueSnackbar(getStatesError.data.data, { variant: 'error' })
    }
  }, [dataStates, getStatesError])

  // fill data
  useEffect(() => {
    if (user) {
      setCountryId(user.countries ? user.countries.id : 240)
      setImageBeforeUpload(user.imageBefore)
      setImageAfterUpload(user.imageAfter)
      setImageFaceUpload(user.imageFace)
    }
  }, [user])

  const renderUploadDocument = () => {
    if (kycType) {
      if (kycType === KYC_TYPES.PASSPORT) {
        return (
          <>
            <KycUploadFile
              sx={{ paddingTop: 3 }}
              imagePreview={imageBeforeUpload}
              onClearImagePrevew={() => {
                setImageBeforeUpload('')
              }}
              id={'image-passport-before'}
              labelButton={t('kyc_page.step_2.button_upload_passport_label')}
              label={t('kyc_page.step_2.upload_front_passport_label')}
              onChange={selectImageBefore}
            >
              <StyledPassportIcon />
            </KycUploadFile>

            <KycUploadFile
              sx={{ paddingTop: '12px' }}
              imagePreview={imageFaceUpload}
              onClearImagePrevew={() => {
                setImageFaceUpload('')
              }}
              id={'image-passport-face'}
              labelButton={t('kyc_page.step_2.button_upload_passport_label')}
              label={t('kyc_page.step_2.upload_person_kyc_label')}
              onChange={selectImageFace}
            >
              <StyledPersonKyc />
            </KycUploadFile>
          </>
        )
      } else if (kycType === KYC_TYPES.CCCD) {
        return (
          <>
            <KycUploadFile
              sx={{ paddingTop: 3 }}
              imagePreview={imageBeforeUpload}
              onClearImagePrevew={() => {
                setImageBeforeUpload('')
              }}
              id={'image-cccd-before'}
              labelButton={t('kyc_page.step_2.button_upload_passport_label')}
              label={t('kyc_page.step_2.upload_before_cccd_label')}
              onChange={selectImageBefore}
            >
              <StyledIdFront />
            </KycUploadFile>

            <KycUploadFile
              sx={{ paddingTop: '12px' }}
              imagePreview={imageAfterUpload}
              onClearImagePrevew={() => {
                setImageAfterUpload('')
              }}
              id={'image-cccd-after'}
              labelButton={t('kyc_page.step_2.button_upload_passport_label')}
              label={t('kyc_page.step_2.upload_after_cccd_label')}
              onChange={selectImageAfter}
            >
              <StyledIdBack />
            </KycUploadFile>

            <KycUploadFile
              sx={{ paddingTop: '12px' }}
              imagePreview={imageFaceUpload}
              onClearImagePrevew={() => {
                setImageFaceUpload('')
              }}
              id={'image-cccd-face'}
              labelButton={t('kyc_page.step_2.button_upload_passport_label')}
              label={t('kyc_page.step_2.upload_cccd_kyc_label')}
              onChange={selectImageFace}
            >
              <StyledPersonKyc />
            </KycUploadFile>
          </>
        )
      }
    }
    return null
  }

  // handleSubmit
  const handleFormSubmit = (values: any) => {
    if (isBase64(imageBeforeUpload, { allowMime: true })) {
      values.imageBefore = imageBeforeUpload
    }
    if (isBase64(imageAfterUpload, { allowMime: true })) {
      values.imageAfter = imageAfterUpload
    }
    if (isBase64(imageFaceUpload, { allowMime: true })) {
      values.imageFace = imageFaceUpload
    }

    values.birthday = values.birthday ? dayjs(values.birthday).format('YYYY-MM-DD') : null
    values.createdPassport = values.createdPassport ? dayjs(values.createdPassport).format('YYYY-MM-DD') : null
    values.cityId = values.city.id
    values.countryId = values.country.id
    values.stateId = values.state?.id || ''
    values.phone = values.phone.split('|')[0]
    setDataKyc(values)
  }

  // call api kyc
  useEffect(() => {
    if (dataKyc) {
      mutateKyc()
    }
  }, [dataKyc])

  useEffect(() => {
    if (kyc) {
      let authData: SignInSuccessPayload = {
        access_token: auth.accessToken,
        refresh_token: auth.refreshToken,
        expires_in: auth.expiresIn,
        token_type: auth.tokenType,
      }
      dispatch(signinSuccess(authData))
      enqueueSnackbar(t('kyc_page.send_info.success'), { variant: 'success' })
      router.push('/user/profile')
    } else if (kycError) {
      enqueueSnackbar(kycError.data.message, { variant: 'error' })
    }
  }, [kyc, kycError])

  let initialValues = {
    name: user?.name || '',
    lastName: user?.lastName || '',
    birthday: user?.birthday,
    sex: user?.sex,
    passport: user?.passport || '',
    createdPassport: user?.createdPassport,
    phone: user?.phone || '',
    country: user?.countries,
    state: user?.states,
    city: user?.cities,
    zipCode: user?.zipCode || '',
    address: user?.address || '',
    address1: user?.address1 || '',
    checked: false,
  }

  return (
    <>
      {submittingForm && <Loader className="fixed" />}
      <BoxWrapperContent sx={{ borderBottom: '1px solid #CCCED0' }}>
        <StyledTitle textAlign={'left'} variant="h1">
          {t('kyc_page.step_2.title')}
        </StyledTitle>
        <BoxContent>
          <Grid justifyContent="left" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>{t('kyc_page.step_2.note')}</Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>{t('kyc_page.step_2.note_content')}</Typography>
          </Grid>
        </BoxContent>
      </BoxWrapperContent>
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        enableReinitialize
        validationSchema={kycProfileSchema(t)}
      >
        {(properties) => {
          const { values, touched, errors, handleChange, isValidating } = properties
          debouncePassport(values.passport)
          return (
            <Form style={{ padding: '24px' }}>
              <BoxWrapper sx={{ borderBottom: '1px solid #CCCED0', paddingTop: 0, paddingBottom: 0 }}>
                <Typography textAlign={'left'} variant="h1" sx={{ fontSize: '18px', fontWeight: 600 }}>
                  {t('kyc_page.step_2.info_title')}
                </Typography>
                <Box sx={{ width: '100%', marginTop: 2 }}>
                  <GridWrapper>
                    <Field
                      fullWidth
                      required={true}
                      className={classes.styleInput}
                      size="small"
                      component={FormInput}
                      name="name"
                      type="text"
                      placeholder={t('kyc_page.step_2.first_name')}
                      error={touched.name && Boolean(errors.name)}
                    />

                    <Field
                      fullWidth
                      required={true}
                      className={classes.styleInput}
                      size="small"
                      component={FormInput}
                      name="lastName"
                      type="text"
                      placeholder={t('kyc_page.step_2.last_name')}
                      error={touched.lastName && Boolean(errors.lastName)}
                    />
                  </GridWrapper>

                  <GridWrapper>
                    <Grid className={classes.styleDatepicker} item xs={12} mb={3}>
                      <StyledInputLabel>
                        {t('kyc_page.step_2.birth_day')} <span style={{ color: 'red' }}>*</span>
                      </StyledInputLabel>
                      <Field component={DatePicker} name="birthday" />
                    </Grid>

                    <FormSelect
                      sx={{ background: '#f6f6f9' }}
                      required={true}
                      name="sex"
                      className={classes.styleInput}
                      listOptions={GenderConfig}
                      placeholder={t('kyc_page.step_2.gender')}
                    />
                  </GridWrapper>

                  <GridWrapper>
                    <Field
                      fullWidth
                      required={true}
                      className={classes.styleInput}
                      size="small"
                      component={FormInput}
                      name="passport"
                      type="text"
                      placeholder={t('kyc_page.step_2.passport_number')}
                      error={touched.passport && Boolean(errors.passport)}
                    />

                    <Grid className={classes.styleDatepicker} item xs={12} mb={3}>
                      <StyledInputLabel>
                        {t('kyc_page.step_2.passport_issued_on')} <span style={{ color: 'red' }}>*</span>
                      </StyledInputLabel>
                      <Field component={DatePicker} name="createdPassport" />
                    </Grid>
                  </GridWrapper>

                  <Grid item xs={12} mb={3}>
                    <StyledInputLabel>
                      {t('kyc_page.step_2.phone_number')} <span style={{ color: 'red' }}>*</span>
                    </StyledInputLabel>
                    <Field
                      component={CustomMuiPhoneNumber}
                      name="phone"
                      id="phone"
                      validate={validatePhone}
                      onChange={handleChange}
                      value={values.phone}
                    />
                    {errors.phone && <Error>{t<any>(errors.phone)}</Error>}
                  </Grid>

                  <GridWrapper>
                    <FormAutocomplete
                      name="country"
                      required={true}
                      className={classes.styleInput}
                      options={listCountries}
                      touched={touched}
                      errors={errors}
                      placeholder={t('kyc_page.step_2.country')}
                    />

                    <FormAutocomplete
                      name="state"
                      className={classes.styleInput}
                      options={listStates}
                      touched={touched}
                      errors={errors}
                      placeholder={t('kyc_page.step_2.state')}
                    />
                  </GridWrapper>

                  <GridWrapper>
                    <FormAutocomplete
                      name="city"
                      required={true}
                      className={classes.styleInput}
                      options={listCities}
                      touched={touched}
                      errors={errors}
                      placeholder={t('kyc_page.step_2.city')}
                    />

                    <Field
                      fullWidth
                      className={classes.styleInput}
                      size="small"
                      component={FormInput}
                      name="zipCode"
                      type="text"
                      placeholder={t('kyc_page.step_2.post_code')}
                      error={touched.zipCode && Boolean(errors.zipCode)}
                    />
                  </GridWrapper>

                  <GridWrapper>
                    <Field
                      fullWidth
                      required={true}
                      className={classes.styleInput}
                      size="small"
                      component={FormInput}
                      name="address"
                      type="text"
                      placeholder={t('kyc_page.step_2.address_1')}
                      error={touched.address && Boolean(errors.address)}
                    />

                    <Field
                      fullWidth
                      className={classes.styleInput}
                      size="small"
                      component={FormInput}
                      name="address1"
                      type="text"
                      placeholder={t('kyc_page.step_2.address_2')}
                      error={touched.address1 && Boolean(errors.address1)}
                    />
                  </GridWrapper>
                </Box>
              </BoxWrapper>

              <BoxWrapper sx={{ paddingBottom: '12px', paddingTop: '12px' }}>
                {kycType && (
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography textAlign={'left'} variant="h1" sx={{ fontSize: '18px', fontWeight: 600 }}>
                      {t('kyc_page.step_2.upload_passport_title')}
                    </Typography>

                    <MuiLink
                      variant="body2"
                      onClick={() => {
                        dispatch(openViewGuideDialog())
                      }}
                      sx={{ textDecoration: 'none', color: AP9_THEME.palette.primary.main, cursor: 'pointer' }}
                    >
                      {t('kyc_page.step_2.view_guide')}
                    </MuiLink>
                  </Box>
                )}

                {renderUploadDocument()}
              </BoxWrapper>

              <Box>
                <Grid sx={{ display: 'flex', flexDirection: 'row', columnGap: '0px' }}>
                  <Field component={Checkbox} type="checkbox" name="checked" id="condition-agree" />
                  <Typography sx={{ fontSize: '14px' }} component={'label'} htmlFor="condition-agree">
                    {t('kyc_page.accept_terms')}
                  </Typography>
                </Grid>

                <AuthButton disable={values.checked ? false : true} label={t('kyc_page.step_2.button_label')} />
              </Box>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default KycStepTwo
