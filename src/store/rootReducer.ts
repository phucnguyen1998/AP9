import { combineReducers, Reducer } from 'redux'
import commonReducer from './slices/commonSlice'
import authReducer from './slices/authSlice'
import layoutReducer from './slices/layoutSlice'

const reducers: Reducer<any, any> = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  common: commonReducer,
})

export default reducers
