import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, styled as MuiStyled, Theme } from '@mui/material'
import { MuiStyledOptions } from '@mui/system'
import { useState } from 'react'
import { ApprovedIcon, PendingIcon, WalletIcon, WithdrawalIcon } from './AP9Icons'

export enum MoneyInfoType {
  WALLET_AVAILABLE_BALANCE,
  WALLET_WITHDRAWAL_PENDING,
  WALLET_PAID_AMOUNT,
  CAMPAIGN_APPROVED_AMOUNT,
  CAMPAIGN_TEMPORARY_APPROVED_AMOUNT,
  CAMPAIGN_PENDING_AMOUNT,
}

export interface MoneyInfoProps extends MuiStyledOptions {
  type: MoneyInfoType
  title: String
  amount?: Number
  enableAmountToggle?: Boolean
}

const MoneyInfo = MuiStyled((props: MoneyInfoProps) => {
  const { amount, type, title, enableAmountToggle, ...other } = props
  const [showingAmount, setShowingAmount] = useState(!enableAmountToggle)

  const renderIcon = () => {
    switch (type) {
      case MoneyInfoType.WALLET_AVAILABLE_BALANCE:
        return <WalletIcon />

      case MoneyInfoType.WALLET_WITHDRAWAL_PENDING:
      case MoneyInfoType.CAMPAIGN_PENDING_AMOUNT:
        return <PendingIcon />

      case MoneyInfoType.CAMPAIGN_TEMPORARY_APPROVED_AMOUNT:
        return <ApprovedIcon />

      case MoneyInfoType.WALLET_PAID_AMOUNT:
      case MoneyInfoType.CAMPAIGN_APPROVED_AMOUNT:
        return <WithdrawalIcon />
    }
  }

  const toggleAmount = () => {
    setShowingAmount(!showingAmount)
  }

  return (
    <div {...other}>
      {renderIcon()}
      <div className="info-wrapper">
        <div className="title">
          <span>{title}</span>
          {enableAmountToggle && (
            <IconButton onClick={toggleAmount}>{showingAmount ? <VisibilityOff /> : <Visibility />}</IconButton>
          )}
        </div>
        <div className="amount-text">{`$${showingAmount ? amount : '*'.repeat(`${amount}`.length)}`}</div>
      </div>
    </div>
  )
})((style: { theme: Theme }) => ({
  flexGrow: 1,
  display: 'flex',
  backgroundColor: '#fff',
  borderRadius: 4,
  padding: '18px 24px',
  columnGap: 12,
  alignItems: 'center',

  '& span.nofill': {
    width: 40,
  },

  '& .info-wrapper': {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 16,
    lineHeight: 1.5,
    color: style.theme.palette.text.primary,
  },

  '& .title': {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    lineHeight: '16px',
  },

  '& .title button': {
    padding: 0,
    color: style.theme.palette.text.secondary,
    fontSize: 10,
    marginLeft: 12,
  },

  '& .amount-text': {
    fontWeight: 700,
    verticalAlign: 'middle',
  },

  [style.theme.breakpoints.up('lg')]: {
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 12,
    flex: 1,

    '& .info-wrapper': {
      alignItems: 'center',
      rowGap: 12,
      fontSize: 16,
      lineHeight: 1.5,
    },

    '& span.nofill': {
      width: 56,
    },

    '& .title': {
      display: 'flex',
      alignItems: 'center',
      fontSize: 16,
      lineHeight: 1.5,
    },
  },
  [style.theme.breakpoints.down('sm')]: {
    padding: 12,
  },
}))

export default MoneyInfo
