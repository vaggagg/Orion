
import {setAuthedUser, FailedSignIn } from "./authedUser"
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_USERS ='RECEIVE_USERS'
export const ADD_USER = 'ADD_USER'
export const SIGN_IN = 'SIGN_IN'
export const FAILED_SIGN_IN='FAILED_SIGN_IN'
export const ANSWER_QUESTION_USER='ANSWER_QUESTION_USER'
export const ADD_QUESTION_USER='ADD_QUESTION_USER'


export function receiveUsers(users){
    return {
        type: RECEIVE_USERS,
        users,
    }
}
export function addUser(user){
    return {
        type: ADD_USER,
        user
    }
}
export function AnswerQuestionUser(user){
  return {
      type: ANSWER_QUESTION_USER,
      user
  }
}
export function AddQuestionUser(user){
  return {
    type: ADD_QUESTION_USER,
    user
}
}

