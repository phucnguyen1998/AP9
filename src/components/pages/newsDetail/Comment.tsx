import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar, Box, Typography } from '@mui/material'
import { styled as MuiStyled } from '@mui/material/styles'
import StyledImage from '../../StyledImage'

interface ICommentProps {}

const StyledImagePost = MuiStyled(Avatar)(({ theme }) => ({
  width: '46px',
  height: '46px',
}))

const Comment: React.FunctionComponent<ICommentProps> = (props) => {
  const { t } = useTranslation()

  const listComment = [
    {
      author: 'Joeby Ragpa',
      message:
        'This template is so awesome. I didn’t expect so many features inside. E-commerce pages are very useful, you can launch your online store in few seconds. I will rate 5 stars. ',
      date: 'Apr. 27, 2018 at 12:17 pm',
      childComment: [
        {
          author: 'Alexander Samokhin',
          message:
            'This template is so awesome. I didn’t expect so many features inside. E-commerce pages are very useful, you can launch your online store in few seconds. I will rate 5 stars. ',
          date: 'Apr. 27, 2018 at 12:17 pm',
        },
        {
          author: 'Alexander Samokhin',
          message: 'This template is so awesome.  ',
          date: 'Apr. 27, 2018 at 12:17 pm',
        },
        {
          author: 'Alexander Samokhin',
          message: 'This template is so awesome. ',
          date: 'Apr. 27, 2018 at 12:17 pm',
        },
      ],
    },
    {
      author: 'Camille Alforque',
      message:
        'This template is so awesome. I didn’t expect so many features inside. E-commerce pages are very useful, you can launch your online store in few seconds. I will rate 5 stars. ',
      date: 'Apr. 27, 2018 at 12:17 pm',
      childComment: [],
    },
  ]
  return (
    <Box>
      <Typography sx={{ paddingTop: '24px', fontSize: '28px', fontWeight: 700 }}>
        2 {t('news.comment_title')}
      </Typography>
      <Box>
        {listComment.map((item, index) => (
          <React.Fragment key={index}>
            <Box sx={{ display: 'flex', flexDirection: 'row', borderBottom: '1px dotted #E3E4E8', paddingTop: '24px' }}>
              <Box sx={{ paddingRight: '16px' }}>
                <StyledImagePost>
                  <StyledImage
                    src="/images/default-brand-logo.svg"
                    sx={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </StyledImagePost>
              </Box>
              <Box
                sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: '12px', paddingBottom: '16px' }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', columnGap: '14px' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '14px', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>{item.author}</Typography>
                    <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>{item.date}</Typography>
                  </Box>
                </Box>
                <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>{item.message}</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Reply</Typography>
              </Box>
            </Box>

            {item.childComment?.map((childComment, indexChildComment) => {
              return (
                <Box
                  key={indexChildComment}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    borderBottom: '1px dotted #E3E4E8',
                    paddingTop: '24px',
                    marginLeft: '50px',
                  }}
                >
                  <Box sx={{ paddingRight: '16px' }}>
                    <StyledImagePost>
                      <StyledImage
                        src="/images/default-brand-logo.svg"
                        sx={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </StyledImagePost>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      rowGap: '12px',
                      paddingBottom: '16px',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', columnGap: '14px' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '14px', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>{childComment.author}</Typography>
                        <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>{childComment.date}</Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>{childComment.message}</Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Reply</Typography>
                  </Box>
                </Box>
              )
            })}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  )
}

export default Comment
