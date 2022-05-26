import { CancelOutlined, HelpOutlineOutlined, InfoOutlined, RedeemOutlined } from '@mui/icons-material'
import { styled as MuiStyled, Tab, Tabs, Theme } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { removeInlineStyles } from '../../../utils/common'

const tabsConfig: Array<{ title: string; icon?: JSX.Element; contentKey: string }> = [
  { title: 'campaign_detail.campaign_info_tab_title', icon: <InfoOutlined />, contentKey: 'introduction' },
  {
    title: 'campaign_detail.campaign_success_condition_tab_title',
    icon: <RedeemOutlined />,
    contentKey: 'action_point',
  },
  {
    title: 'campaign_detail.campaign_violation_rules_tab_title',
    icon: <CancelOutlined />,
    contentKey: 'rejected_reason',
  },
  {
    title: 'campaign_detail.campaign_task_detail_tab_title',
    icon: <HelpOutlineOutlined />,
    contentKey: 'other_notices',
  },
]

const CampaignContent = MuiStyled((props: any) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(0)
  const { className, data } = props
  const activeTabConfig = tabsConfig[activeTab]
  const activeTabContent = removeInlineStyles(data?.[activeTabConfig.contentKey] || '')

  const handleTabChange = (event: SyntheticEvent, value: any) => {
    setActiveTab(value)
  }

  return (
    <div className={className}>
      <Tabs variant="scrollable" scrollButtons={false} onChange={handleTabChange} value={activeTab}>
        {tabsConfig.map((tabConf: { title: string; icon?: JSX.Element }) => (
          <Tab
            label={t(tabConf.title)}
            icon={tabConf.icon}
            iconPosition="start"
            key={`campaign-content-tab-${tabConf.title}`}
          />
        ))}
      </Tabs>
      <div className="active-tab-content" dangerouslySetInnerHTML={{ __html: activeTabContent }}></div>
    </div>
  )
})((style: { theme: Theme }) => ({
  backgroundColor: '#fff',
  marginTop: 16,
  [style.theme.breakpoints.up('lg')]: {
    marginTop: 0,
  },

  '& .MuiTab-root': {
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 700,
    color: style.theme.palette.text.secondary,
    textTransform: 'none',
    padding: '12px 16px',
    minHeight: 0,
  },

  '& .MuiTabs-scroller button': {
    borderBottom: '2px solid #ECECEE',
  },

  '& .MuiTab-root.Mui-selected': {
    color: style.theme.palette.text.primary,
  },

  '& .active-tab-content': {
    padding: 16,
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  },

  '& .active-tab-content img': {
    maxWidth: '100% !important',
    marginRight: 8,
  },

  [style.theme.breakpoints.up('md')]: {
    '& .MuiTabs-scroller': {
      borderBottom: '2px solid #ECECEE',
    },

    '& .MuiTabs-scroller button': {
      borderBottom: 'none !important',
    },
  },

  [style.theme.breakpoints.up('lg')]: {
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    marginTop: 0,
  },
}))

export default CampaignContent
