import { Box, Typography } from '@mui/material'
import * as React from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useTranslation } from 'react-i18next'

interface INoticeComponentProps {}

const NoticeComponent: React.FunctionComponent<INoticeComponentProps> = (props) => {
  const { t } = useTranslation()
  let contents = ['wallet_page.notice_1', 'wallet_page.notice_2', 'wallet_page.notice_3', 'wallet_page.notice_4']
  return (
    <>
      <Box sx={{ width: '100%', paddingBottom: 3, borderBottom: '1.5px solid #ECECEE' }}>
        <Box sx={{ display: 'flex', columnGap: '8px' }}>
          <InfoOutlinedIcon sx={{ width: 20, height: 20, marginTop: '2px' }} />
          <Typography
            fontWeight={'bold'}
            textAlign={'left'}
            component="h1"
            variant="h5"
            sx={{ fontSize: 18, marginBottom: 2, fontWeight: 600 }}
          >
            {t('wallet_page.notice_title')}
          </Typography>
        </Box>

        <Box>
          {contents.map((item, index) => {
            return (
              <Typography sx={{ fontSize: '16px', fontWeight: 400 }} key={index}>
                {t(item)}
              </Typography>
            )
          })}
        </Box>
      </Box>
    </>
  )
}

export default NoticeComponent
