export const CAMPAIGN_TYPES = {
  EARN_MONEY: 0,
  CASHBACK: 1,
}

export const KYC_TYPES = {
  CCCD: 1,
  PASSPORT: 2,
}

export const KYC_STATUS = {
  UN_KYC: 0,
  PENDING: 1,
  ACCEPT: 2,
  REJECT: 3,
}

export const LIST_SOCIAL = {
  FACEBOOK: 'FACEBOOK',
  TWITTER: 'TWITTER',
  GOOGLE: 'GOOGLE',
  INSTAGRAM: 'INSTAGRAM',
  PINTEREST: 'PINTEREST',
  LINKEDIN: 'LINKEDIN',
}

export const NEWS_VARIANT = {
  FLASH_NEW: 'FLASH_NEW',
  NEWEST: 'NEWEST',
  MOST_READ: 'MOST_READ',
  TOPIC: 'TOPIC',
  FLASH_NEW_LARGE: 'FLASH_NEW_LARGE',
  ALL_NEW: 'ALL_NEW',
}

export const NEWS_LETTER = {
  SMALL: 'small',
  LARGE: 'large',
}

export enum AUTH_FORMS {
  SIGNUP,
  SIGNIN,
  FORGOT_PASSWORD,
  VERIFY_CODE,
  CHANGE_PASSWORD,
}

export const CAMPAIGN_ATTRIBUTE_TYPES = {
  2: 'hot',
  4: 'new',
  1: 'proposal',
}
