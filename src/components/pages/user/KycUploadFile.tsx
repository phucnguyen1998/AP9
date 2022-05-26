import { Box, Input, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import * as React from 'react'
import Image from 'next/image'
import {
  StyledRightBlock,
  StyledUploadArea,
  StyledUploadIcon,
  StyledUploadLabel,
  StyledUploadTitle,
  StyledWrapperUpload,
} from './ekyc/styled'

interface IKycUploadFileProps {
  labelButton: any
  label: any
  sx?: any
  children: any
  onChange: any
  id: string
  imagePreview: any
  onClearImagePrevew?: any
}

const KycUploadFile: React.FunctionComponent<IKycUploadFileProps> = ({
  labelButton,
  label,
  children,
  imagePreview,
  onChange,
  onClearImagePrevew,
  id,
  sx,
}) => {
  return (
    <Box sx={{ ...sx }}>
      <StyledWrapperUpload>
        <StyledUploadArea htmlFor={id}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
            <Input sx={{ display: 'none' }} id={id} type="file" onChange={onChange} />
            <StyledUploadIcon />
            <StyledUploadLabel textAlign={'left'} variant="body1">
              {labelButton}
            </StyledUploadLabel>
          </div>
        </StyledUploadArea>

        <StyledRightBlock sx={{ position: 'relative' }}>
          {imagePreview ? (
            <>
              <Image alt="" src={imagePreview} layout="fill" objectFit="contain" />
              <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={onClearImagePrevew}>
                <Close />
              </IconButton>
            </>
          ) : (
            children
          )}
        </StyledRightBlock>
      </StyledWrapperUpload>

      <StyledUploadTitle textAlign={'center'} variant="h1">
        {label}
      </StyledUploadTitle>
    </Box>
  )
}

export default KycUploadFile
