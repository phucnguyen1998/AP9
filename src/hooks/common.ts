import { useMediaQuery, useTheme } from '@mui/material'
import { shallowEqual, useSelector } from 'react-redux'
import { AuthState } from '../store/slices/authSlice'
import { RootState } from '../store/store'

export const useMobileCheck = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('lg'))
}

export const useLoggedInCheck = () => {
  const authStore: AuthState = useSelector((store: RootState) => store, shallowEqual).auth

  return authStore?.user?.id !== undefined
}

export const useCampaignLinkGeneration = (campaignId: string) => {
  const authStore: AuthState = useSelector((store: RootState) => store, shallowEqual).auth
  const { user } = authStore

  if (user) {
    let prefix = process.env.NEXT_PUBLIC_CAMPAIGN_REDIRECT_URL
    prefix = prefix?.split('/')[0]
    prefix = `${prefix}//...`
    return {
      shortLink: `${prefix}/${campaignId}/${user.uid}`,
      fullLink: `${process.env.NEXT_PUBLIC_CAMPAIGN_REDIRECT_URL}/${campaignId}/${user.uid}`,
    }
  }

  return {
    shortLink: '',
    fullLink: '',
  }
}
