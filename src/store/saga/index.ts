import { all } from 'redux-saga/effects'
import authSaga from './auth'
import commonSaga from './common'

export default function* rootSaga() {
  yield all([commonSaga(), authSaga()])
}
