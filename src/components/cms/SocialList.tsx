import { Box, Typography } from '@mui/material'
import * as React from 'react'
import ButtonSocial from './ButtonSocial'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import { GooglePlusIcon } from '../AP9Icons'
import InstagramIcon from '@mui/icons-material/Instagram'
import PinterestIcon from '@mui/icons-material/Pinterest'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { useTranslation } from 'react-i18next'
import { LIST_SOCIAL } from '../../constants/common'

interface ISocialListProps {}

const SocialList: React.FunctionComponent<ISocialListProps> = (props) => {
  const { t } = useTranslation()

  const handleShare = (socialName: any) => {
    let link

    switch (socialName) {
      case LIST_SOCIAL.FACEBOOK:
        link = `https://www.facebook.com/`
        open(link)
        break

      case LIST_SOCIAL.TWITTER:
        link = `https://twitter.com/`
        open(link)
        break

      case LIST_SOCIAL.GOOGLE:
        link = `https://google.com/`
        open(link)
        break

      case LIST_SOCIAL.INSTAGRAM:
        link = `https://twitter.com/`
        open(link)
        break

      case LIST_SOCIAL.PINTEREST:
        link = `https://twitter.com/`
        open(link)
        break

      case LIST_SOCIAL.LINKEDIN:
        link = `https://twitter.com/`
        open(link)
        break

      default:
        break
    }
  }
  const open = (socialLink: string) => {
    window.open(socialLink, '_blank')
  }

  return (
    <Box sx={{ padding: '24px', display: 'flex', flexDirection: 'column', rowGap: '18px' }}>
      <Typography sx={{ fontSize: 20, fontWeight: 700, lineHeight: '24px' }}>
        {t('cms.social_component_title')}
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', columnGap: '18px' }}>
        <ButtonSocial
          text="TWITTER"
          bgColor="#55ACEE"
          onClick={() => {
            handleShare(LIST_SOCIAL.TWITTER)
          }}
        >
          <TwitterIcon sx={{ width: '15px', height: '18px', marginBottom: '2px' }} />
        </ButtonSocial>

        <ButtonSocial
          text="Facebook"
          bgColor="#36528C"
          onClick={() => {
            handleShare(LIST_SOCIAL.FACEBOOK)
          }}
        >
          <FacebookIcon sx={{ width: '15px', height: '18px', marginBottom: '2px' }} />
        </ButtonSocial>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', columnGap: '18px' }}>
        <ButtonSocial
          text="Google+"
          bgColor="#DE4B39"
          onClick={() => {
            handleShare(LIST_SOCIAL.GOOGLE)
          }}
        >
          <GooglePlusIcon sx={{ width: '19px', height: '14px', marginBottom: '2px' }} />
        </ButtonSocial>

        <ButtonSocial
          text="Instagram"
          bgColor="#C13282"
          onClick={() => {
            handleShare(LIST_SOCIAL.INSTAGRAM)
          }}
        >
          <InstagramIcon sx={{ width: '15px', height: '18px', marginBottom: '2px' }} />
        </ButtonSocial>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', columnGap: '18px' }}>
        <ButtonSocial
          text="Pinterest"
          bgColor="#BD081C"
          onClick={() => {
            handleShare(LIST_SOCIAL.PINTEREST)
          }}
        >
          <PinterestIcon sx={{ width: '15px', height: '18px', marginBottom: '2px' }} />
        </ButtonSocial>

        <ButtonSocial
          text="Linkedin"
          bgColor="#0077B5"
          onClick={() => {
            handleShare(LIST_SOCIAL.LINKEDIN)
          }}
        >
          <LinkedInIcon sx={{ width: '15px', height: '18px', marginBottom: '2px' }} />
        </ButtonSocial>
      </Box>
    </Box>
  )
}

export default SocialList
