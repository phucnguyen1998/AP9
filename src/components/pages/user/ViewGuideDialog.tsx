import { Close } from '@mui/icons-material'
import { Dialog, IconButton, styled as MuiStyled } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { closeViewGuideDialog } from './../../../store/slices/layoutSlice'
import { Guide } from './Guide'

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

const ViewGuideDialog = () => {
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeViewGuideDialog())
  }

  return (
    <StyledDialog open onClose={handleClose}>
      <Guide />
      <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} onClick={handleClose}>
        <Close />
      </IconButton>
    </StyledDialog>
  )
}

export default ViewGuideDialog
