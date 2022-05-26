/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { AP9_THEME } from '../../constants/theme'
import KycStepTwo from '../../components/pages/user/ekyc/ekyc'
import KycStepOne from '../../components/pages/user/kyc-step-1'
import { styled as MuiStyled } from '@mui/material/styles'
import { shallowEqual, useSelector } from 'react-redux'
import withAuth from '../../components/withAuth'
import { KYC_STATUS } from '../../constants/common'
import Router from 'next/router'

interface ProfileProps {}

const ContainerWrapper = MuiStyled(Container)(({ theme }) => ({
  width: '100%',
  justifyContent: 'space-between',
  padding: '0px 0px 24px 0px',
  backgroundColor: AP9_THEME.palette.background.paper,
  position: 'relative',

  [theme.breakpoints.up('lg')]: {
    display: 'block',
    marginTop: '24px',
    marginBottom: '24px',
    padding: 0,
    boxShadow: '0px 1px 3px rgb(0 0 0 / 10%)',
    borderRadius: 4,
  },
}))

const KycStep2: React.FunctionComponent<ProfileProps> = (props) => {
  const user = useSelector((store: any) => store.auth.user, shallowEqual)
  const [showFormKyc, setShowFormKyc] = useState(false && user && user.kycStatus !== 0)

  useEffect(() => {
    if (user && user.kycStatus === KYC_STATUS.ACCEPT) {
      Router.replace('/user/profile')
      return
    }
    if (user && user.kycStatus !== KYC_STATUS.UN_KYC) {
      setShowFormKyc(true)
    } else {
      setShowFormKyc(false)
    }
  }, [user])

  return (
    <ContainerWrapper>
      {showFormKyc ? (
        <KycStepTwo />
      ) : (
        <KycStepOne
          handleClick={() => {
            setShowFormKyc(true)
          }}
        />
      )}
    </ContainerWrapper>
  )
}

export default withAuth(KycStep2)
