const enKey = require('./src/languages/en.json')
const vKey = require('./src/languages/vi.json')

const vKeys = Object.keys(enKey)

Object.keys(vKey).forEach((key) => {
  if (!vKeys.includes(key)) {
    console.log('zzdasdas', key)
  }
})
