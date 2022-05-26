import { createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface SignedInUser {
  address?: string | null
  avatar?: string | null
  created_at?: string | null
  email: string
  id: number
  last_login?: string | null
  name: string | null
  phone?: string | null
  updated_at?: string | null
  kycStatus?: number
  uid?: string
  wallet: {
    balance: Number
    temp_approve_amount: Number
    approve_amount: Number
    total_amount: Number
    pending_amount: Number
    temporary_amount: Number
    withdraw_pending_amount: Number
    withdrawn_amount: Number
    created_at: string
    updated_at: string
  }
}

export interface SignInSuccessPayload {
  access_token: string
  expires_in: number
  refresh_token: string
  token_type: string
}

export interface AuthState {
  user: SignedInUser | null
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType: string
  hasAccount: boolean
}

const initialState: AuthState = {
  user: null,
  accessToken: '',
  refreshToken: '',
  expiresIn: -1,
  tokenType: '',
  hasAccount: false,
}

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    signinSuccess: (state, action: PayloadAction<SignInSuccessPayload>) => {
      return {
        ...state,
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
        expiresIn: action.payload.expires_in,
        tokenType: action.payload.token_type,
        hasAccount: true,
      }
    },
    getProfileSuccess: (state, action: PayloadAction<SignedInUser>) => {
      return { ...state, user: action.payload }
    },
    signout: (state) => {
      return { ...state, accessToken: '', user: null }
    },
  },
})
const { actions, reducer } = authSlice
export const getAuthStore = (state: RootState): AuthState => state.auth
export const { signinSuccess, getProfileSuccess, signout } = actions
export default reducer
