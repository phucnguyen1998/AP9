import { Close } from '@mui/icons-material'
import { Box, Container, Dialog, Grid, IconButton, styled as MuiStyled } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeFormTransferMoney } from './../../../store/slices/layoutSlice'
import FormWithdrawCash from './FormWithdrawCash'
import NoticeComponent from './NoticeComponent'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const StyledDialog = MuiStyled(Dialog)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    '& .MuiDialog-container': {
      alignItems: 'center',
    },
    '& .MuiPaper-root': {
      margin: 0,
      maxHeight: '100%',
      maxWidth: '100%',
    },
  },
}))

const BoxWrapper = MuiStyled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    columnGap: '32px',
  },
}))

const FormTransferMoney = () => {
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeFormTransferMoney())
  }

  return (
    <StyledDialog open onClose={handleClose}>
      <Container
        component="main"
        sx={{
          paddingTop: 3,
          paddingBottom: 3,
        }}
      >
        <BoxWrapper>
          <FormWithdrawCash />
        </BoxWrapper>
      </Container>

      <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} onClick={handleClose}>
        <Close />
      </IconButton>
    </StyledDialog>
  )
}

export default FormTransferMoney
