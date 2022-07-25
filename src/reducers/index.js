import { combineReducers } from 'redux'
import users from './users'
import autheduser from './authedUser'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  users,
  autheduser,
  loadingBar: loadingBarReducer
})
