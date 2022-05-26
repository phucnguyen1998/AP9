import { Box, ImageList, ImageListItem, Typography, Link as MuiLink, Button } from '@mui/material'
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
  description: string
}

const useStyles = makeStyles((theme) => ({
  styledListImage: {
    '& > li:last-child': {
      paddingBottom: 0,
    },
  },
}))

const StyledTitlePost = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '16px',
  [theme.breakpoints.up('lg')]: {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '24px',
    cursor: 'pointer',
  },
}))

const StyledDescription = MuiStyled(Typography)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    cursor: 'pointer',
  },
}))

const StyledCategory = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '8px',
  lineHeight: '10px',
  [theme.breakpoints.up('lg')]: {
    fontSize: '14px',
    lineHeight: '26px',
  },
  color: '#2D95E3',
  cursor: 'pointer',
  fontWeight: 600,
}))

const StyledDateOfPost = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '8px',
  lineHeight: '10px',
  [theme.breakpoints.up('lg')]: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '26px',
  },
}))

const StyledWrapperContent = MuiStyled(Box)(({ theme }) => ({
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
    padding: '32px',
  },
  width: '50%',
}))

const StyledWrapperCategory = MuiStyled(Box)(({ theme }) => ({
  paddingBottom: 0,
  [theme.breakpoints.up('lg')]: {
    paddingTop: '16px',
    paddingBottom: '24px',
  },
  display: 'flex',
  flexDirection: 'row',
}))

const FlashNew: React.FunctionComponent<IFlashNewProps> = (props) => {
  const { image, title, category, date, linkCategory, linkPost } = props
  const classes = useStyles()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <ImageList
        className={classes.styledListImage}
        sx={{ width: '100%', display: 'flex', flexDirection: 'column', margin: '0' }}
      >
        <ImageListItem
          sx={{
            paddingBottom: '32px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Box sx={{ width: '50%', position: 'relative' }}>
            <Link href={linkPost} passHref>
              <StyledImage
                src={image}
                defaultImage={'/images/post-1.jpeg'}
                sx={{
                  cursor: 'pointer',
                  '& > span': {
                    borderRadius: '5px 0 0 5px',
                    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
                    maxHeight: '306px',
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
          </Box>

          <StyledWrapperContent>
            <Link href={linkPost} passHref>
              <StyledTitlePost>{title}</StyledTitlePost>
            </Link>
            <StyledWrapperCategory>
              <Link href={linkCategory} passHref>
                <StyledCategory>{category}&nbsp;</StyledCategory>
              </Link>
              <StyledDateOfPost>-&nbsp;{date}</StyledDateOfPost>
            </StyledWrapperCategory>
            <StyledDescription>{title}</StyledDescription>
          </StyledWrapperContent>
        </ImageListItem>
      </ImageList>
    </Box>
  )
}

export default FlashNew
