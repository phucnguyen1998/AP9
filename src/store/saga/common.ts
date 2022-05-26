import { REHYDRATE } from 'redux-persist'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import URLs from '../../constants/URLs'
import { APIRequestOptions, createAppAPIRequest } from '../../hooks/useApiRequest'
import { AuthState, getAuthStore } from '../slices/authSlice'
import { getBankListSuccess, getSiteConfigSuccess } from '../slices/commonSlice'

function* getSiteConfigs(): Generator<any> {
  try {
    const authStore = (yield select(getAuthStore)) as AuthState
    const { accessToken } = authStore
    const requestOpt: APIRequestOptions = {
      url: URLs.SITE_DEFNITIONS,
      method: 'GET',
      accessToken,
    }
    const response: any = yield call(createAppAPIRequest, requestOpt)
    yield put(getSiteConfigSuccess(response))
  } catch (error) {}
}

function* getBankList(): Generator<any> {
  try {
    const authStore = (yield select(getAuthStore)) as AuthState
    const { accessToken } = authStore
    const requestOpt: APIRequestOptions = {
      url: URLs.AUTH_GET_BANKS,
      method: 'GET',
      accessToken,
    }
    const response: any = yield call(createAppAPIRequest, requestOpt)
    yield put(getBankListSuccess(response?.data || []))
  } catch (error) {}
}

function* worker() {
  yield takeEvery(REHYDRATE, getSiteConfigs)
  yield takeEvery(REHYDRATE, getBankList)
}

export default function* authSaga() {
  yield all([worker()])
}
