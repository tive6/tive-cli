import echarts from '@/common/echartsConfig.js'
const numToFixed = (num, n) => {
  var symbol = 1
  if (num < 0) {
    // 符号为负
    symbol = -1
    num *= -1
  }
  var num2 = (Math.round(num * Math.pow(10, n)) / Math.pow(10, n) + Math.pow(10, -(n + 1))).toString().slice(0, -1)
  return parseFloat(num2 * symbol).toFixed(n)
}

export default {
  /* 获取 echarts 渐变色 */
  getEChartsLinearColors (params = {}) {
    let ps = params.position || [0, 0, 0, 1]
    return new echarts.graphic.LinearGradient(
      ...ps,
      [
        { offset: 0, color: params.colors[0] },
        { offset: 1, color: params.colors[1] }
      ]
    )
  },
  /* 时间格式化 */
  formatFixedDate (date, fmt) {
    if (typeof date === 'number') {
      date = new Date(date)
    }
    if (!(date instanceof Date)) {
      return ''
    }
    if (typeof date === 'string') {
      date = date.includes('0+0000') ? date.substr(0, 19) : date
    }
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, //小时
      "H+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    }
    var week = {
      "0": "日",
      "1": "一",
      "2": "二",
      "3": "三",
      "4": "四",
      "5": "五",
      "6": "六"
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[date.getDay() + ""])
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
      }
    }
    return fmt
  },
  /* 生成随机颜色 */
  getRandomColors () {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    return `rgba(${r},${g},${b},1)`
  },
  /* 数字格式化 */
  numberFormat (n) {
    return (n + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  },
  numToFixed,
  /* 设置 cookie */
  setCookie (name, value, params = {}) {
    var stringifiedAttributes = '';

    // 过期时间
    if (typeof params.expires === 'number') {
      var date = new Date();
      date.setDate(date.getDate() + params.expires);
      stringifiedAttributes += ';expires=' + date;
    }

    // path
    var path = params.path ? params.path : '/';
    stringifiedAttributes += ';path=' + path;

    // domain
    if (params.domain) {
      stringifiedAttributes += ';domain=' + params.domain;
    }

    document.cookie = name + '=' + value + stringifiedAttributes;
  },
  /* 获取 cookie */
  getCookie (name) {
    var arr = document.cookie.replace(/\s/g, "").split(';');
    for (var i = 0; i < arr.length; i++) {
      var tempArr = arr[i].split('=');
      if (tempArr[0] === name) {
        return decodeURIComponent(tempArr[1]);
      }
    }
    return '';
  },
  /* 删除 cookie */
  removeCookie (name, params = {}) {
    // 设置已过期，系统会立刻删除cookie
    params.expires = -1;
    this.setCookie(name, '', params);
  },
  getDateTime () {
    let oneDayMs = 24 * 60 * 60 * 1000
    let today = new Date().setHours(0, 0, 0, 0)
    let defaultStartDate = today - oneDayMs * 30
    return {
      oneTimes: oneDayMs,
      today,
      defaultStartDate,
      // yesterday: today,
      yesterday: new Date(today).getTime() - oneDayMs,
      defaultSNDate: [
        new Date(defaultStartDate),
        new Date(new Date(today).getTime() - oneDayMs)
      ],
    }
  },
  getUrlParams (key) {
    let search = window.location.search.slice(1)
    let arr = search.split("&")
    let obj = {}
    arr.map(item => {
      let [k, v] = item.split('=')
      obj[k] = v
    })
    return obj[key] || ''
  },
  compareVersion (v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)
    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }
    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i])
      const num2 = parseInt(v2[i])
      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }
    return 0
  },
  numToWan (num) {
    return (+num / 10000).toFixed(1) + '万'
  },
  transform (value) {
    if (!value) {
      return '0'
    }
    let newValue = ['', '', ''];
    let fr = 1000;
    const ad = 1;
    let num = 3;
    const fm = 1;
    while (value / fr >= 1) {
      fr *= 10;
      num += 1;
      // console.log('数字', value / fr, 'num:', num);
    }
    if (num <= 4) { // 千
      newValue[1] = '千';
      newValue[0] = parseFloat(value / 1000) + '';
    } else if (num <= 8) { // 万
      const text1 = parseFloat(num - 4) / 3 > 1 ? '千万' : '万';
      // tslint:disable-next-line:no-shadowed-variable
      const fm = '万' === text1 ? 10000 : 10000000;
      newValue[1] = text1;
      newValue[0] = (value / fm) + '';
    } else if (num <= 16) {// 亿
      let text1 = (num - 8) / 3 > 1 ? '千亿' : '亿';
      text1 = (num - 8) / 4 > 1 ? '万亿' : text1;
      text1 = (num - 8) / 7 > 1 ? '千万亿' : text1;
      // tslint:disable-next-line:no-shadowed-variable
      let fm = 1;
      if ('亿' === text1) {
        fm = 100000000;
      } else if ('千亿' === text1) {
        fm = 100000000000;
      } else if ('万亿' === text1) {
        fm = 1000000000000;
      } else if ('千万亿' === text1) {
        fm = 1000000000000000;
      }
      newValue[1] = text1;

      // newValue[0] = parseInt(value / fm) + '';
      newValue[0] = parseFloat(value / fm) + '';
    }
    if (value < 1000) {
      newValue[1] = '';
      newValue[0] = value + '';
    }
    if (newValue[0] && value > 1000) {
      newValue[0] = parseFloat(newValue[0]).toFixed(1) + ''
    }
    return newValue.join('');
  },
  /**
   * @name: 转键值对
   * @param {type} 
   */
  objectToQueryString (obj) {
    return Object.keys(obj).map(function (key) {
      return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(obj[key]));
    }).join('&');
  },
  /**
   * @name: 防抖函数
   * @param {type} 
   */
  debounce (fn, delay = 300) {   //默认300毫秒
    var timer;
    return function () {
      var args = arguments;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, args);   // this 指向vue
      }, delay);
    };
  },
  getCharLength (str) {
    //先把中文替换成两个字节的英文，在计算长度
    return str.replace(/[\u0391-\uFFE5]/g, "aa").length
  },
  formatNum (num) {
    let formattingNum = 0
    formattingNum = (num * 100).toFixed(1)

    if (formattingNum > 0) {
      return `+${formattingNum}%`
    } else if (formattingNum < 0) {
      return `${formattingNum}%`
    } else {
      return '0'
    }
  },

  /**
   * 强制保留2位小数，不足补 0 
   */
  toDecimal (x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
  },
  //保留一位小数
  toOneDecimal (x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(x * 10) / 10;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 1) {
      s += '0';
    }
    return s;
  },
  /**
   * @name: 千分符
   * @param {type} 
   */
  addThousandthSign (numStr) {
    var regForm = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
    return numStr.toString().replace(regForm, "$1,");
  },
  getRangeDate (day) {
    let { oneTimes, today, yesterday } = this.getDateTime()
    let ms = today - oneTimes * day
    return [
      new Date(ms),
      new Date(yesterday),
    ]
  },
  // 生成一个随机数组
  getRandomArr (len = 10, max = 1000, min = 0) {
    let arr = new Array(len).fill(1)
    return arr.map(n => {
      return n * Math.floor(Math.random() * (max - min)) + min
    })
  },
  // 时分秒格式化
  formatFixedSecond (s) {
    let str = ''
    if (s <= 60) {
      str = `${s.toFixed()}秒`
    } else if (s > 60 && s <= 60 * 60) {
      let m = parseInt(s / 60)
      let ss = (s % 60).toFixed()
      str = `${m}分${ss}秒`
    } else if (s > 60 * 60) {
      let h = parseInt(s / 3600)
      let m = parseInt((s % 3600) / 60)
      let ss = (s % 60).toFixed()
      str = `${h}小时${m}分${ss}秒`
    }
    return str
  },
  // 数字格式化：以万为单位，保留一位小数
  numWanF1Format (num) {
    return numToFixed(num / 10000, 1).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
    // return (num/10000).toFixed(1).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,')
  },
  /**
   * @name: 根据数字返回升降颜色
   * @param {type} 
   */
  numberColor (num) {
    if (typeof num !== 'number') {//不是数字类型直接返回#333
      return '#333'
    }
    if (num > 0) {
      return '#23AB61'
    }
    if (num < 0) {
      return '#FF3A2F'
    }
    return '#333'
  },
}
