import { CampaignListProps } from '../components/CampaignList'
import { NavItemProps } from '../components/Navigation'
import { ICampaignTypeInfo } from '../components/pages/home/CampaignTypeInfo'
import { CAMPAIGN_TYPES } from './common'
import { MoneyIcon, ShoppingIcon } from '../components/AP9Icons'
import React from 'react'

export const HeaderMenu: NavItemProps[] = [
  {
    link: '/',
    title: 'header.home_menu',
  },
  {
    link: '/campaigns',
    title: 'header.campaigns_menu',
  },
  {
    link: '/wallet',
    title: 'header.wallet_menu',
  },
  {
    link: '/statistic',
    title: 'header.statistic_menu',
  },
  {
    link: '/news',
    title: 'header.news_menu',
    subMenu: [
      {
        link: '/news/zzzz',
        title: 'header.news_menu',
      },
      {
        link: '/news/ggg',
        title: 'header.news_menu',
      },
    ],
  },
]

export const FooterMenu: NavItemProps[] = [
  {
    link: '/about',
    title: 'footer.about_menu',
  },
  {
    link: '/privacy',
    title: 'footer.privacy_menu',
  },
  {
    link: '/faq',
    title: 'footer.faq_menu',
  },
  {
    link: '/customer-service',
    title: 'footer.customer_service_menu',
  },
]

export const FooterPolicyMenu: NavItemProps[] = [
  {
    link: '/terms-conditions',
    title: 'footer.terms_conditions_menu',
  },
  {
    link: '/privacy-policy',
    title: 'footer.privacy_policy_menu',
  },
  {
    link: '/accessibility',
    title: 'footer.accessibility_menu',
  },
  {
    link: '/legal',
    title: 'footer.legal_menu',
  },
]

export const CampaignTypes: Array<ICampaignTypeInfo> = [
  {
    title: 'campaign_type.earn_money_title',
    icon: '/images/Money.png',
    link: '/campaigns?type=0',
    linkTitle: 'campaign_type.earn_money_link_title',
    description: 'campaign_type.earn_money_description',
  },
  {
    title: 'campaign_type.cashback_title',
    icon: '/images/Shopping.png',
    link: '/campaigns?type=1',
    linkTitle: 'campaign_type.cashback_link_title',
    description: 'campaign_type.cashback_description',
  },
  {
    title: 'campaign_type.gift_change_title',
    icon: '/images/Gift.png',
    link: '/',
    linkTitle: 'campaign_type.gift_change_link_title',
    description: 'campaign_type.gift_change_description',
  },
]

export interface HomePageCampaignListConfig extends Omit<CampaignListProps, 'items'> {
  type: number
}

export const HomePageCampaignLists: Array<HomePageCampaignListConfig> = [
  {
    type: CAMPAIGN_TYPES.EARN_MONEY,
    id: 'earn_money',
    title: 'home_page.earn_money_campaign_list_title',
    allItemsLink: `/campaigns?type=${CAMPAIGN_TYPES.EARN_MONEY}`,
    allItemsLinkTitle: 'home_page.earn_money_campaign_list_view_all_title',
    mobileIcon: <MoneyIcon sx={{ width: 18 }} />,
  },
  {
    type: CAMPAIGN_TYPES.CASHBACK,
    id: 'cashback',
    title: 'home_page.cashback_campaign_list_title',
    allItemsLink: `/campaigns?type=${CAMPAIGN_TYPES.CASHBACK}`,
    allItemsLinkTitle: 'home_page.cashback_campaign_list_view_all_title',
    mobileIcon: <ShoppingIcon sx={{ width: 18 }} />,
  },
]

export const GenderConfig: Array<{ id: number; name: string }> = [
  {
    id: 1,
    name: 'Nam',
  },
  {
    id: 2,
    name: 'Nữ',
  },
]
