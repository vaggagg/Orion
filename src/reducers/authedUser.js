import { SET_AUTHED_USER, FAILED_SIGN_IN, LOG_OUT } from '../actions/authedUser'

export default function authedUser (state = { isLogged:false , loggedUser : undefined } , action) {
  switch (action.type) {
    case SET_AUTHED_USER :
      return action.autheduser
    case FAILED_SIGN_IN :
      return action.autheduser
    case LOG_OUT :
      return action.autheduser
    default :
      return state
  }
}
