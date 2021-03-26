import axios from 'axios';
import store from '@/store';
import { Toast, Dialog } from 'vant';

// axios.default.retry = 3 // 重试次数
// axios.default.retryDelay = 1000
const instance = axios.create({
  timeout: 5000,
});

// 不重定向白名单
const whiteList = ['/api/xx/xx', '/api/xx/xxx'];

// request拦截器
instance.interceptors.request.use(
  async (config) => {
    let token = store.getters['User/getUserToken'];
    config.headers['access-token'] = token;
    //无token拦截处理
    // if (!token) {}
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

function getToken (config) {
  return new Promise((resolve) => {
    store.dispatch('User/getUserToken').then((response) => {
      //原参数二次请求
      if (response) {
        config.config.headers['access-token'] = response;
      }
      axios.request(config.config).then((resetData) => {
        resolve(resetData);
      });
    });
  });
}
//异步处理response请求
async function responseData (response) {
  const res = response.data;
  let code = res.Status !== undefined ? res.Status : res.code;
  if (res == 'SUCCESS') {
    code = 0
  }
  if (code + '' !== '0' && code + '' != '403') {//过滤403
    console.log('啥????', code)
    if (+code === 40101 || +code === 401) {
      // 40101: token过期
      return await getToken(response);
    }
    if (+code === 600001) {
      // 600001: 加解密服务异常
      Dialog.confirm({
        message: `因财务数据敏感，正在加解密处理中，\n请稍后再试。`,
        // message: `因财务数据敏感，正在加解密处理中，请稍后再试。\n联系人：许敬祥，<a style="color:#2F54EB;" href="tel:18310800028">18310800028</a>`,
        showCancelButton: false,
        // showConfirmButton: false,
        cancelButtonText: '关闭',
        // confirmButtonText: '刷新',
        closeOnPopstate: true,
      });
      // throw new Error('600001')
      return Promise.reject('600001');
    }
  }
  return response;
}
instance.interceptors.response.use(responseData, (error) => {
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !whiteList.includes(error.url)) {

    var newHttp = new Promise(function (resolve) {
      resolve();
    });
    // 返回一个promise实例，同时重新发起请求，config请求配置，包扩请求头和请求参数
    return newHttp
      .then(function () {
        return axios(error.config);
      })
      .catch((res) => {
        console.log('超时', res);
        store.dispatch('Brand/setShowRefresh', true);
        store.dispatch('Brand/postErrors', {
          header: JSON.stringify(error.config.url),
          request: JSON.stringify(error.config.params),
          response: '超时不记录返回',
          error: '超时',
        });
      });
  }
  return Promise.reject(new Error(`url=>【${response.config.url}】`));
});

export const ajax = (opts = {}) => {
  return new Promise((resolve, reject) => {
    let url = opts.url;
    let callback = opts.callback;
    instance({
      url: url,
      method: opts.method || 'GET',
      headers: Object.assign(
        {
          'content-type': 'application/json',
          'Cache-Control': 'no-transform',
        },
        opts.headers
      ),
      data: opts.data,
      params: opts.params,
    })
      .then((res) => {
        callback && callback(res);
        let data = null;

        if (res.data.hasOwnProperty('code') && res.data.code !== 0 && !whiteList.includes(res.config.url) && res != 'SUCCESS' && res.data.code !== 403) {
          store.dispatch('Brand/setShowRefresh', true);
          store.dispatch('Brand/postErrors', {
            header: JSON.stringify(res.config.url),
            request: JSON.stringify(res.config.params),
            response: JSON.stringify(res.config.data),
            error: res.data.code,
          });
        }

        if (res === undefined) {
          resolve({
            code: 9999,
            msg: '请求超时',
          });
          return;
        }
        if (res.data.hasOwnProperty('code') && res.data.code === 0) {
          data = res.data.records;
        } else {
          data = res.data.Result;
        }
        resolve(data);
      })
      .catch((e) => {
        // console.log(e)
        reject(e);
      });
  });
};
