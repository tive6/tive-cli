import Utils from '@/common/utils'

// const devToken = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ4dWppbmd4aWFuZzEiLCJ1bmlxdWVWYWx1ZSI6Inh1amluZ3hpYW5nMSIsImV4cCI6MTY5MDcwMDE3NH0.DyppUeXN5lUWYHnuHYdJj72ulYU3GAgjWgeu41yn0B22J7cARYFzvTDFxEE_gj5SYXJ29Kh90Qg55gKAv3qKvGlIP4nyXhvVOA0ZEEzojYe-kzxXnmovY36oqb3WS30NzwCzXWS-7caXknLWuGhQWCwBqoQqZPsWeLJ_hGz4YIQ'
// const isDev = process.env.NODE_ENV === 'development'

const USER_TOKEN = 'bi-user-token'
const SET_TITLE = 'SET_TITLE'

const User = {
  namespaced: true,

  state: {
    token: Utils.getCookie(USER_TOKEN),
    userInfo: {
      CnName: '测试文字',
      EmployeeNumber: '12345'
    },
    userShowNavBar: true,
    title: document.title,
  },
  getters: {
    getUserToken (state) {
      return state.token
    },
    getUserInfo (state) {
      return state.userInfo
    },
    getTitle (state) {
      return state.title
    },
    getUserShowNavBar (state) {
      return state.userShowNavBar
    },
  },
  mutations: {
    GET_USER_TOKEN: (state, token) => {
      state.token = token
    },
    GET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    [SET_TITLE]: (state, title) => {
      state.title = title
    }
  },
  actions: {
  }
}

export default User

