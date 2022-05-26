import { Box, Link as MuiLink, Typography } from '@mui/material'
import * as React from 'react'
import StyledImage from '../../StyledImage'
import Link from 'next/link'
import { styled as MuiStyled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import ButtonCategory from './ButtonCategory'

interface IFlashNewLargeProps {
  image: string
  title: string
  category: string
  linkCategory: string
  linkPost: string
}

const FlashNewLarge: React.FunctionComponent<IFlashNewLargeProps> = (props) => {
  const { image, title, category, linkCategory, linkPost } = props
  return (
    <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 0, margin: 0 }}>
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
          <Link href={linkPost} passHref>
            <StyledImage
              src={image}
              defaultImage={'/images/post-1.jpeg'}
              sx={{
                cursor: 'pointer',
                '& > span': {
                  height: '100%',
                  borderRadius: '5px',
                  boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
                },
                '& > span > img': {
                  maxHeight: '100%!important',
                  maxWidth: '100%!important',
                },
              }}
            />
          </Link>
          <Link href={linkCategory} passHref>
            <ButtonCategory categoryName={category} />
          </Link>
          <Link href={linkPost} passHref>
            <MuiLink>
              <Typography
                sx={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '20%',
                  color: '#FFF',
                  fontWeight: 700,
                  fontSize: '20px',
                  lineHeight: '24px',
                }}
              >
                {title}
              </Typography>
            </MuiLink>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default FlashNewLarge
