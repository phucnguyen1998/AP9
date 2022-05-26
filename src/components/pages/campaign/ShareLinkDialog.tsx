import { Button, Dialog, styled as MuiStyled, Theme } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import {
  FacebookShareButton,
  TwitterShareButton,
  TumblrShareButton,
  RedditShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from 'react-share'
import { useCampaignLinkGeneration, useMobileCheck } from '../../../hooks/common'
import {
  FacebookSharingIcon,
  LinkedinSharingIcon,
  MailSharingIcon,
  RedditSharingIcon,
  TumblrSharingIcon,
  TwitterSharingIcon,
} from '../../AP9Icons'
import StyledImage from '../../StyledImage'

const ShareLinkDialog = MuiStyled((props: any) => {
  const { data, campaignRedirectURL, ...other } = props
  const { logo, name } = data
  const { fullLink, shortLink } = campaignRedirectURL
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const isMobile = useMobileCheck()

  const handleCopyButtonClick = () => {
    window.navigator.clipboard.writeText(fullLink)
    enqueueSnackbar(t('campaign_detail.share_link_dialog_copy_link_success'), {
      variant: 'success',
      preventDuplicate: true,
    })
  }

  return (
    <Dialog {...other}>
      <div className="content-wrapper">
        <div className="content">
          <StyledImage src={logo} className="logo-image" />
          <div className="right">
            <div className="campaign-name">{name}</div>
            <div className="link-info-wrapper">
              <div className="link">{isMobile ? shortLink : fullLink}</div>
              <Button color="primary" variant="contained" onClick={handleCopyButtonClick}>
                {t('campaign_detail.share_link_dialog_copy_button')}
              </Button>
            </div>
          </div>
        </div>
        <div className="social-sharing">
          <div className="social-share-title">{t('campaign_detail.share_link_dialog_social_sharing_title')}</div>
          <div className="share-buttons-wrapper">
            <FacebookShareButton url={fullLink}>
              <FacebookSharingIcon sx={{ width: 40 }} />
            </FacebookShareButton>
            <TwitterShareButton url={fullLink}>
              <TwitterSharingIcon sx={{ width: 40 }} />
            </TwitterShareButton>
            <TumblrShareButton url={fullLink}>
              <TumblrSharingIcon sx={{ width: 40 }} />
            </TumblrShareButton>
            <LinkedinShareButton url={fullLink}>
              <LinkedinSharingIcon sx={{ width: 40 }} />
            </LinkedinShareButton>
            <RedditShareButton url={fullLink}>
              <RedditSharingIcon sx={{ width: 40 }} />
            </RedditShareButton>
            <EmailShareButton url={fullLink}>
              <MailSharingIcon sx={{ width: 40 }} />
            </EmailShareButton>
          </div>
        </div>
      </div>
    </Dialog>
  )
})((style: { theme: Theme }) => ({
  '& .MuiPaper-root': {
    maxWidth: 700,
  },
  '& .content-wrapper': {
    padding: 24,
    backgroundColor: '#fff',
  },

  '& .content': {
    display: 'flex',
    columnGap: 12,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    marginBottom: 30,
    padding: 16,
  },

  '& .logo-image': {
    width: 100,
    minWidth: 100,
  },

  '& .right': {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  '& .link-info-wrapper': {
    display: 'flex',
    columnGap: 12,
    fontSize: 16,
    lineHeight: 1.5,
  },

  '& .campaign-name': {
    fontWeight: 600,
    color: style.theme.palette.text.primary,
  },

  '& .link': {
    backgroundColor: style.theme.palette.background.default,
    padding: '8px 12px',
    color: style.theme.palette.text.secondary,
  },

  '& button': {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 1.5,
  },

  '& .social-share-title': {
    fontSize: 20,
    lineHeight: 1.2,
    fontWeight: 600,
    color: style.theme.palette.text.primary,
    marginBottom: 16,
  },
  '& .share-buttons-wrapper': {
    display: 'flex',
    columnGap: 10,
  },

  [style.theme.breakpoints.down('md')]: {
    '& .MuiDialog-container': {
      alignItems: 'flex-end',
    },
    '& .MuiPaper-root': {
      margin: 0,
      maxWidth: '100vw',
      width: '100%',
    },
    '& .content-wrapper': {
      padding: 16,
    },
    '& .content': {
      boxShadow: 'none',
      marginBottom: 30,
      padding: 0,
    },
    '& .campaign-name': {
      marginBottom: 12,
    },

    '& .link-info-wrapper': {
      flexDirection: 'column',
      rowGap: 8,
    },

    '& .social-share-title': {
      fontSize: 16,
      lineHeight: '20px',
      marginBottom: 12,
    },
  },
  [style.theme.breakpoints.down('sm')]: {
    '& .logo-image': {
      width: 75,
      minWidth: 75,
    },
  },
}))

export default ShareLinkDialog
