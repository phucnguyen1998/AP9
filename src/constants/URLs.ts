const URLs = {
  AUTH_SIGNUP: '/signup',
  AUTH_SIGNIN: '/signin',
  AUTH_CHANGE_PASSWORD_FOR_LOGGED_IN_USER: '/change-password',
  AUTH_GET_PROFILE: '/profile',
  AUTH_KYC: '/kyc',
  AUTH_GET_COUNTRIES: '/countries',
  AUTH_GET_CITIES: '/cities',
  AUTH_GET_STATES: '/states',
  AUTH_GET_TRANSACTIONS: '/transactions',
  AUTH_GET_BANKS: '/banks',
  AUTH_REQUEST_WITHDRAWAL: '/payments',
  AUTH_GET_REQUEST_PAYMENT: '/payments',
  AUTH_FORGET_PASSWORD: '/forget-password',
  AUTH_VERIFY_FORGET_PASSWORD_CODE: '/reset-password/verify-code',
  AUTH_RESET_PASSWORD: '/reset-password/new-password',
  AUTH_CAMPIGN_STATISTIC: '/campaign-transactions',
  SITE_DEFNITIONS: '/definitions',
  HOME_CAMPAIGNS_HOT: '/campaigns/hot',
  HOME_CAMPAIGNS_LIST: '/campaigns/home',
  HOME_BANNERS: '/banners/home',
  CAMPAIGN_LIST: '/campaigns',
  CAMPAIGN_DETAIL: '/campaigns/show/:id',
  CAMPAIGN_RELATED: '/campaigns/related/:id',
  CAMPAIGN_REDIRECT_URL: '/campaigns/redirect-link/:cid/:uid',
  CMS_NEW_POST_HOT: '/post-hot',
  CMS_LIST_CATEGORY: '/categories',
  CMS_GET_ALL_POST: '/post-all',
  CMS_GET_POST_BY_CATEGORY: '/post-by-categorie',
  CMS_POST_MOST_VIEW: '/post-most-view',
  CMS_POST_DETAIL: '/post-detail/:slug',
  CMS_SEARCH: '/search',
}

export const createAbsoluteURL = (pathname: string): string => {
  return `${process.env.NEXT_PUBLIC_APP_API_URL}${pathname}`
}

export const createAbsoluteURLCms = (pathname: string): string => {
  return `${process.env.NEXT_PUBLIC_CMS_API_URL}${pathname}`
}

export default URLs
