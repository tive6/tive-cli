import { ajax } from './ajax'

export default {
  getUserInfo () {
    return ajax({
      url: '/api/xxx',
    })
  },
}