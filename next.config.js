/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
    localeDetection: false,
  },
  images: {
    domains: ['dev-api.ap9.net', 'static.accesstrade.vn', 'content.accesstrade.vn', 'cms.haivan.com'],
  },
}
