import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CommonState {
  configs: { [key: string]: any }
  banks: Array<any>
}

const initialState: CommonState = {
  configs: {},
  banks: [],
}

const layoutSlice = createSlice({
  initialState,
  name: 'common',
  reducers: {
    getSiteConfigSuccess: (state, action: PayloadAction<any>) => {
      return { ...state, configs: { ...state.configs, ...action.payload } }
    },
    getBankListSuccess: (state, action: PayloadAction<any>) => {
      return { ...state, banks: action.payload }
    },
  },
})
const { actions, reducer } = layoutSlice

export const { getSiteConfigSuccess, getBankListSuccess } = actions
export default reducer
