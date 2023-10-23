export const SERVER_NAME = 'http://localhost:3000'

export const USER_API = {ROOT: `${SERVER_NAME}/api/users`}


export const API = {
    USERS: SERVER_NAME + '/v1/users',
    GROUPS: SERVER_NAME + '/v1/groups',
}


export const MULTIPAR_FORMDATA_HEADER = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }