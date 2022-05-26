import { Box, ImageList, ImageListItem, Typography, Link as MuiLink } from '@mui/material'
import * as React from 'react'
import { styled as MuiStyled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import StyledImage from '../../StyledImage'
import Link from 'next/link'
import ButtonCategory from './ButtonCategory'

interface IFlashNewProps {
  image: string
  title: string
  category: string
  date: string
  style: any
  linkCategory: string
  linkPost: string
}

const useStyles = makeStyles((theme) => ({
  styledListImage: {
    '& > li:last-child': {
      paddingBottom: 0,
    },
  },
}))

const StyledTitlePost = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  cursor: 'pointer',
}))

const StyledCategory = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '26px',
  color: '#2D95E3',
  cursor: 'pointer',
}))

const StyledDateOfPost = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '26px',
}))

const FlashNew: React.FunctionComponent<IFlashNewProps> = (props) => {
  const { image, title, category, date, linkCategory, style, linkPost } = props

  const classes = useStyles()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ImageList
        className={classes.styledListImage}
        sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', margin: '0' }}
      >
        <ImageListItem
          sx={{
            paddingBottom: '32px',
            height: '100%!important',
            display: 'flex',
            flexDirection: style % 2 === 0 ? 'row-reverse' : 'row',
          }}
        >
          <Box sx={{ width: '50%', position: 'relative' }}>
            <Link href={linkPost} passHref>
              <MuiLink>
                <StyledImage
                  src={image}
                  defaultImage={'/images/post-1.jpeg'}
                  sx={{
                    cursor: 'pointer',
                    '& > span': {
                      borderRadius: style % 2 === 0 ? '0 5px 5px 0' : '5px 0 0 5px',
                      boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
                    },
                    '& > span > img': {
                      maxHeight: '100%!important',
                      maxWidth: '100%!important',
                    },
                  }}
                />
              </MuiLink>
            </Link>

            <Link href={linkCategory} passHref>
              <ButtonCategory categoryName={category} />
            </Link>
          </Box>

          <Box sx={{ width: '50%', padding: '32px' }}>
            <Link href={linkPost} passHref>
              <MuiLink sx={{ textDecoration: 'none', color: '#110F24' }}>
                <StyledTitlePost>{title}</StyledTitlePost>
              </MuiLink>
            </Link>

            <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: '16px', paddingBottom: '8px' }}>
              <Link href={linkPost} passHref>
                <StyledCategory>{category}&nbsp;</StyledCategory>
              </Link>
              <StyledDateOfPost>-&nbsp;{date}</StyledDateOfPost>
            </Box>
          </Box>
        </ImageListItem>
      </ImageList>
    </Box>
  )
}

export default FlashNew
