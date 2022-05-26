import { Button, styled as MuiStyled, Theme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import MoneyInfo, { MoneyInfoType } from '../components/MoneyInfo'
import TabsComponent from '../components/pages/wallet/TabsComponent'
import requireAuth from '../components/requireAuth'
import { AP9_THEME } from '../constants/theme'
import { openFormTransferMoney } from '../store/slices/layoutSlice'
import { RootState } from '../store/store'

const HeadWrapper = MuiStyled('div')((style: { theme: Theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  rowGap: 12,

  [style.theme.breakpoints.up('lg')]: {
    columnGap: 24,
    flexDirection: 'row',
  },
}))

const WrapperButton = MuiStyled('div')((style: { theme: Theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  padding: '0px',
  [style.theme.breakpoints.up('lg')]: {
    display: 'none',
  },
  marginTop: '12px',
}))

const TabsWrapper = MuiStyled('div')((style: { theme: Theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  rowGap: 12,
  background: AP9_THEME.palette.background.paper,
  marginTop: '12px',
}))

const StyledButton = MuiStyled(Button)(({ theme }) => ({
  display: 'block',
  margin: 'auto',
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
  borderRadius: '4px',
  fontSize: '16px',
  fontWeight: 700,
  textTransform: 'initial',
  padding: '8px 32px',
  lineHeight: '24px',
  boxShadow: 'none',
}))

const WalletPage = MuiStyled((props: any) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const user = useSelector((store: RootState) => store.auth.user, shallowEqual)

  return (
    <div {...props}>
      <HeadWrapper>
        <MoneyInfo
          type={MoneyInfoType.WALLET_AVAILABLE_BALANCE}
          title={t('wallet_page.available_balance')}
          amount={user?.wallet?.balance}
          enableAmountToggle
        />
        <MoneyInfo
          type={MoneyInfoType.CAMPAIGN_PENDING_AMOUNT}
          title={t('wallet_page.pending_amount')}
          amount={user?.wallet?.pending_amount}
        />
        <MoneyInfo
          type={MoneyInfoType.CAMPAIGN_APPROVED_AMOUNT}
          title={t('wallet_page.withdrawn')}
          amount={user?.wallet?.withdrawn_amount}
        />
      </HeadWrapper>
      <WrapperButton>
        <StyledButton
          variant="contained"
          onClick={() => {
            dispatch(openFormTransferMoney())
          }}
        >
          {t('wallet_page.tab_button_withdrawal_request')}
        </StyledButton>
      </WrapperButton>

      <TabsWrapper>
        <TabsComponent />
      </TabsWrapper>
    </div>
  )
})((style: { theme: Theme }) => ({
  minHeight: '100%',
  width: '100%',
  padding: '12px 0',

  [style.theme.breakpoints.up('lg')]: {
    padding: '24px',
  },
}))

export default requireAuth(WalletPage)
