export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const FAILED_SIGN_IN= 'FAILED_SIGN_IN'
export const LOG_OUT = 'LOG_OUT'

export function setAuthedUser (users) {
  return {
    type: SET_AUTHED_USER,
    autheduser:{
      isLogged: true,
      loggedUser:users
    }
  }
}
export function FailedSignIn () {
  return {
    type: FAILED_SIGN_IN,
    autheduser:{
      isLogged: false,
      loggedUser: undefined
    }
  }
}

export function Logout () {
  return {
    type: LOG_OUT,
    autheduser:{
      isLogged: false,
      loggedUser: undefined
    }
  }
}
