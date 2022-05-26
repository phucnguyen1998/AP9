import { createSlice } from '@reduxjs/toolkit'

export interface LayoutState {
  showingAuthDigalog: boolean
  showingViewGuideDialog: boolean
  showingMobileMenu: boolean
  showingFormTransferMoney: boolean
}

const initialState: LayoutState = {
  showingAuthDigalog: false,
  showingViewGuideDialog: false,
  showingMobileMenu: false,
  showingFormTransferMoney: false,
}

const layoutSlice = createSlice({
  initialState,
  name: 'layout',
  reducers: {
    openAuthDigalog: (state) => ({
      ...state,
      showingAuthDigalog: true,
    }),
    openFormTransferMoney: (state) => ({ ...state, showingFormTransferMoney: true }),
    closeFormTransferMoney: (state) => ({ ...state, showingFormTransferMoney: false }),
    openViewGuideDialog: (state) => ({ ...state, showingViewGuideDialog: true }),
    closeAuthDialog: (state) => ({ ...state, showingAuthDigalog: false }),
    closeViewGuideDialog: (state) => ({ ...state, showingViewGuideDialog: false }),
    openMobileMenu: (state) => ({ ...state, showingMobileMenu: true }),
    closeMobileMenu: (state) => ({ ...state, showingMobileMenu: false }),
    closeAll: (state) => ({ ...state, ...initialState }),
  },
})
const { actions, reducer } = layoutSlice

export const {
  openAuthDigalog,
  closeAuthDialog,
  openMobileMenu,
  closeMobileMenu,
  openViewGuideDialog,
  closeViewGuideDialog,
  closeAll,
  openFormTransferMoney,
  closeFormTransferMoney,
} = actions
export default reducer
