//补零
const fillZero = (num) => {
  return num < 10 ? '0' + num : num;
};
//带参数
//货币形式
const currency = (value, unit, decimal) => {
  let reg = /^[0-9]+.?[0-9]*$/;
  if (!reg.test(value)) return '';
  value = decimal === undefined ? value : value.toFixed(decimal);
  return `${unit}${value}`;
};
//首字母大写
const capitalize = (value) => {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const numToFixed = (num, n) => {
  var symbol = 1;
  if (num < 0) {
    // 符号为负
    symbol = -1;
    num *= -1;
  }
  var num2 = (Math.round(num * Math.pow(10, n)) / Math.pow(10, n) + Math.pow(10, -(n + 1))).toString().slice(0, -1);
  return parseFloat(num2 * symbol).toFixed(n);
};

export default {
  fillZero,
  currency,
  capitalize,
  numParseInt(num) {
    return parseInt(num);
  },
  numberFormat(n) {
    return (n + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  },
  numParseIntFormat(num) {
    return (+num).toFixed().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  },
  numWanFormat(num) {
    return (num / 10000).toFixed().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  },
  numWanF1Format(num) {
    // if (num!==0 && !Boolean(num)) {
    //   return '-'
    // } else {
    // }
    return numToFixed(num / 10000, 1).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    // return (num/10000).toFixed(1).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,')
  },
  numToIntFormat(num) {
    return numToFixed(num, 0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  },
  numParseFlt1Format(num) {
    return (+num).toFixed(1).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  },
  numParseFlt2Format(num) {
    return (+num).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  },
  formatFixedDate(date, fmt) {
    if (typeof date === 'number') {
      date = new Date(date);
    }
    if (!(date instanceof Date)) {
      return '';
    }
    var o = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, //小时
      'H+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds(), //毫秒
    };
    var week = {
      '0': '日',
      '1': '一',
      '2': '二',
      '3': '三',
      '4': '四',
      '5': '五',
      '6': '六',
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[date.getDay() + '']
      );
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return fmt;
  },
  numToPercent(num) {
    return (Math.abs(+num) * 100).toFixed(1);
  },
  numToWan(num) {
    return (+num / 10000).toFixed(1) + '万';
  },
  getDateStr6(d) {
    return d.slice(2).replace(/\-/g, '.');
  },
  commaStyle(value) {
    return String(value).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  },
};
