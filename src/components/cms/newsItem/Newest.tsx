import { Box, Button, ImageList, ImageListItem, Typography, Link as MuiLink } from '@mui/material'
import * as React from 'react'
import { styled as MuiStyled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import StyledImage from '../../StyledImage'
import Link from 'next/link'
import ButtonCategory from './ButtonCategory'

interface INewestProps {
  image: string
  title: string
  category: string
  date: string
  description: string
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
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '24px',
  paddingBottom: '24px',
  cursor: 'pointer',
}))

const StyledDescription = MuiStyled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
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

const Newest: React.FunctionComponent<INewestProps> = (props) => {
  const { image, title, category, date, linkCategory, description, linkPost } = props
  const classes = useStyles()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <ImageList
        className={classes.styledListImage}
        sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 0, margin: 0 }}
      >
        <ImageListItem
          sx={{
            paddingBottom: '32px',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Link href={linkPost} passHref>
              <StyledImage
                src={image}
                defaultImage={'/images/post-1.jpeg'}
                sx={{
                  cursor: 'pointer',
                  '& > span': { borderRadius: '5px 5px 0 0', maxHeight: '280px' },
                  '& > span > img': {
                    maxHeight: '100%!important',
                    maxWidth: '100%!important',
                  },
                }}
              />
            </Link>
            <Link href={linkCategory} passHref>
              <ButtonCategory categoryName={category} bgColor="#7B1FA2" />
            </Link>
          </Box>

          <Box sx={{ padding: '32px' }}>
            <Link href={linkPost} passHref>
              <StyledTitlePost>{title}</StyledTitlePost>
            </Link>
            <Box sx={{ display: 'flex', flexDirection: 'row', paddingBottom: '24px', paddingTop: '16px' }}>
              <Link href={linkPost} passHref>
                <StyledCategory>{category}&nbsp;</StyledCategory>
              </Link>
              <StyledDateOfPost>-&nbsp;{date}</StyledDateOfPost>
            </Box>
            <StyledDescription>{description}</StyledDescription>
          </Box>
        </ImageListItem>
      </ImageList>
    </Box>
  )
}

export default Newest
