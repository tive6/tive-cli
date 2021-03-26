import axiosAjax from 'axios';
/* SDK */
const SDK = {
  /* 公共属性 */
  sdkVer: '1.0.0',
  reportUrl: 'https://twl.yccdn.com',
  sdkType: '2',
  businessType: 'mocard',
  sourceInfo: '',
  osType: '',
  deviceModel: '',
  deviceBrand: '',
  containerType: '',
  pageUrl: '',
  prevPage: '',
  userId: '',
  openId: '',
  unionId: '',
  sessionId: '',
  abTest: '',
  userFrom: '0',
  maxReportCount: 100,
  rFailList: [],
  /* 接口区分 */
  reportUrlMap: {
    dev: 'https://twl.yccdn.com',
    prod: 'https://wl.yccdn.com',
  },
  /* 固定key值 */
  keysMap: {
    rFailList: 'report-fail-list',
    rCookieId: 'report-cookie-id',
    rSourceId: 'report-source-id',
    rDeviceId: 'report-device-id',
    rUserinfoId: 'report-userinfo-id',
    rRoutesId: 'report-routes-id',
    rInitId: 'report-init-id',
    rSourceUrlKey: 'source',
    rUserFromId: 'report-user-from-id',
  },
  /* 初始化之前 */
  beforeInit(params={}){
    let key = this.keysMap.rInitId
    window.localStorage.setItem(key, JSON.stringify(params))
    // this.buisType = params.businessType || ''
  },
  /* 初始化方法 */
  init(){
    console.log(`【SDK_ALL版本】 ${this.sdkVer}`)
    // console.log(axios)
    // console.log(this)
    this.setPageRoutes()
    // this.listenPageRoutes()
    this.getLocalCookies()
    this.getSourceByUrlParams()
    this.getUserFrom()
    let filter = {
      domain:window.location.host,
      title:document.title,
      path:window.location.pathname,
      xpath:'',
      url:window.location.href,
    };
    this.sendPage({
      filter:filter
    })
    this.pageUrl = window.location.href
    window.onload = ()=>{
      this.addElementEvent()
    }
    //url变化监听器
    // if( ('onhashchange' in window) && ((typeof document.documentMode==='undefined') || document.documentMode==8)) {
    //     // 浏览器支持onhashchange事件
    //     window.addEventListener("hashchange", this.sendPage);  // TODO，对应新的hash执行的操作函数
    //     // alert(32)
    // } else {
    // 不支持则用定时器检测的办法
    var that = this
    // setInterval(function() {
    // 检测hash值或其中某一段是否更改的函数， 在低版本的iE浏览器中通过window.location.hash取出的指和其它的浏览器不同，要注意
    // var ischanged = that.isHashChanged();
    // that.setPageRoutes();
    // if(ischanged) {
    //     that.sendPage();  // TODO，对应新的hash执行的操作函数
    // }
    // }, 150);
    // }
    // this.onAppUnload()
  },
  isHashChanged(){
    var lasturl = this.getPageRoutes();
    var cururl=window.location.href;
    if(lasturl ==cururl ){
      return false;
    }
    return true;
  },
  //监听触发操作
  //页面上报
  sendPage(params={}){
    this.getAllData(Object.assign({}, params, {
      type: '1',
    }))
  },
  /* 页面事件上报 */
  sendPageEvent(params={}){
    this.getAllData(Object.assign({}, params, {
      type: '2',
    }))
  },
  /* 用户行为上报 */
  // sendCommonEvent(params={}){
  //     this.getAllData(Object.assign({}, params, {
  //         event_type: '2',
  //     }))
  // },
  /* 卡片展现上报 */
  // sendShowEvent(params={}){
  //     this.getAllData(Object.assign({}, params, {
  //         event_type: '3',
  //     }))
  // },
  /* 数据整合处理 */
  getAllData(p){
    this.getInitData()
    this.setPageRoutes()
    this.getUserInfo()
    this.getDeviceInfo()
    let time = this.getTimeMs()+''
    new Promise(((resolve, reject) => {
      let data = JSON.stringify(p.data || {})
      let cookies = this.getLocalCookies()
      this.sourceInfo = this.getSourceByUrlParams()
      this.osType = this.getOsType()
      this.prevPage = this.getPageRoutes()
      let params = {
        filter:p.filter,
        event_id: p.event_id, // 唯一的事件ID
        type:p.type,
        event_type: p.event_type, // 事件类型 1页面 2操作行为
        user_id: this.userId, // 注册并登录过的用户，用户唯一标识（可能为 手机号）
        cookie: cookies, // 用户本地模拟的cookie，不清除一直存在且不变
        sdk_type: this.sdkType, // 使用SDK的端
        create_at: time, // 上报的时间戳
        source_extend_para: this.sourceInfo, // 来源信息 从 url 中获取（一个字符串）
        busi_extend_para: data, // 预留字段，业务参数（json字符串）
        busi_type: this.businessType, // 预留字段，业务类型
        abtest: this.abTest, // 预留字段，A/B测试
        data: JSON.stringify({
          sdk_ver: this.sdkVer, // SDK版本
          platform: this.osType, // 平台系统，Android、 IOS
          page_url: window.location.href, // 页面完整路径
          open_id: this.openId, // 预留字段，针对于能获取到 openId 的微信用户
          unionid: this.unionId, // 预留字段，针对于能获取到 unionid 的微信用户
          model: this.deviceModel, // 预留字段，设备型号
          brand: this.deviceBrand, // 预留字段，设备品牌
          // container_platform: this.containerType, // 预留字段，H5所在的容器
          page_prev: this.prevPage, // 预留字段，上一页面 url
          user_from: this.userFrom, // 用户会员类型
        })
      }
      resolve(params)
    })).then(res=>{
      this.reportData(res);
      if( this.reportUrl == this.reportUrlMap['dev']){
        this.reportInitElm(res);
      }
    }).catch(e=>{
      console.log(e);
    })
  },
  //元素配置列表初始化
  reportInitElm(data){
    let list = data
    list.filter.busi_type  = data.busi_type;
    list.filter.cookie  = data.cookie;
    list.filter.url = window.location.href,
      this.ajax({
        url: `${this.reportUrl}/initializa`,
        // url: '/api/initializa',
        data: list.filter,
      }).then(res=>{
        // console.log(res)
        if (res.status === 200) {
          console.log('元素上传成功');
        } else {
          console.log('元素上传失败1');
          // this.setReportFailData(data)
        }
      }).catch(err=>{
        console.log(err)
        console.log('元素上传失败2')
        // this.setReportFailData(data);
      })
  },
  /* 上报ajax */
  reportData(data){
    let list = Array.isArray(data) ? data: [data];
    this.ajax({
      url: `${this.reportUrl}/treport`,
      // url: '/api/treport',
      data: list,
    }).then(res=>{
      // console.log(res);
      if (res.status === 200) {
        console.log('上报成功');
      } else {
        console.log('上报失败1')
        this.setReportFailData(data)
      }
    }).catch(err=>{
      console.log(err)
      console.log('上报失败2')
      this.setReportFailData(data)
    })
  },
  /* 生成 cookies */
  createCookies(){
    let key = this.keysMap.rCookieId
    let random = Math.floor(Math.random()*900000000)+100000000
    let time = this.getTimeMs()
    let cookies = `${random}_${time}`
    // console.log(cookies);
    window.localStorage.setItem(key, cookies);
    this.setCookie(key, cookies);
    return cookies
  },
  /* 获取本地唯一的 cookies */
  getLocalCookies(){
    let key = this.keysMap.rCookieId
    return window.localStorage.getItem(key) || this.createCookies()
  },
  /* 从 url 中获取来源信息 */
  getSourceByUrlParams(){
    let k1 = this.keysMap.rSourceUrlKey
    let k2 = this.keysMap.rSourceId
    let source = this.getSearchParams(k1) || ''
    if (source.trim()==='') {
      source = window.sessionStorage.getItem(k2) || ''
    }
    window.sessionStorage.setItem(k2, source)
    // console.log('source:',source)
    return source
  },
  /* ajax封装 */
  ajax(opts={}){
    return new Promise((resolve, reject) => {
      // if(axios){
      axiosAjax({
        url: opts.url,
        method: opts.method || 'POST',
        headers: Object.assign({},
          // { 'content-type': 'application/json' },
          opts.headers
        ),
        data: opts.data,
        params: opts.params,
      }).then( res =>{
        // console.log(res)
        resolve(res)
      }).catch(e => {
        console.log(e)
        reject(e)
      })
    })
  },
  /* 上报失败记录本地 */
  setReportFailData(data){
    let key = this.keysMap.rFailList
    let li = window.localStorage.getItem(key)
    let list = li && JSON.parse(li) || []
    list = [data, ...list]
    window.localStorage.setItem(key, JSON.stringify(list))
  },
  /* 时间格式化 */
  formatFixedDate(date, fmt){
    if(typeof date === 'number') {
      date = new Date(date)
    }
    if(!date instanceof Date) {
      return ''
    }
    var o = {
      "M+" : date.getMonth()+1, //月份
      "d+" : date.getDate(), //日
      "h+" : date.getHours()%12 === 0 ? 12 : date.getHours()%12, //小时
      "H+" : date.getHours(), //小时
      "m+" : date.getMinutes(), //分
      "s+" : date.getSeconds(), //秒
      "q+" : Math.floor((date.getMonth()+3)/3), //季度
      "S" : date.getMilliseconds() //毫秒
    }
    var week = {
      "0" : "日",
      "1" : "一",
      "2" : "二",
      "3" : "三",
      "4" : "四",
      "5" : "五",
      "6" : "六"
    }
    if(/(y+)/.test(fmt)){
      fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length))
    }
    if(/(E+)/.test(fmt)){
      fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "")+week[date.getDay()+""])
    }
    for(var k in o){
      if(new RegExp("("+ k +")").test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)))
      }
    }
    return fmt
  },
  /* 获取当前时间ms */
  getTimeMs(){
    return new Date().getTime();
  },
  /* 设置 cookie */
  setCookie(name, value, params={}) {
    var stringifiedAttributes = '';
    // 过期时间
    if (typeof params.expires === 'number') {
      var date = new Date();
      date.setDate(date.getDate() + params.expires);
      stringifiedAttributes +=';expires=' + date;
    }
    // path
    var path = params.path ? params.path : '/';
    stringifiedAttributes +=';path=' + path;
    // domain
    if (params.domain) {
      stringifiedAttributes +=';domain=' + params.domain;
    }
    document.cookie = name + '=' + value + stringifiedAttributes;
  },
  /* 获取 cookie */
  getCookie(name) {
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
  removeCookie(name, params={}) {
    // 设置已过期，系统会立刻删除cookie
    params.expires = -1;
    this.setCookie(name, '', params);
  },
  /* url--search参数解析 */
  getSearchParams(key){
    let search = window.location.search.substr(1)
    if (search.trim()==='') {
      let str = window.location.hash.substr(1)
      search = str.indexOf('?')>-1?str.match(/\?(\S*)/)[1]:''
    }
    // console.log(search)
    let obj = {}
    let pArr = search.split('&')
    pArr.forEach(item=>{
      let kv = item.split('=')
      obj[kv[0]] = kv[1]
    })
    return decodeURIComponent(obj[key] || '')
  },
  /* 获取平台系统 */
  getOsType(){
    let ua = window.navigator.userAgent
    return /(iPhone|iPad)/.test(ua)?'ios':'android'
  },
  /* 设置保存设备相关信息 */
  setDeviceInfo(info={}){
    let key = this.keysMap.rDeviceId
    window.localStorage.setItem(key, JSON.stringify(info))
  },
  getDeviceInfo(){
    let key = this.keysMap.rDeviceId
    let info = window.localStorage.getItem(key) || {}
    this.deviceModel = info.model || ''
    this.deviceBrand = info.brand || ''
    // this.containerType = info.container || ''
  },
  /* 监听页面是否切换 */
  listenPageRoutes(){
    setInterval(()=>{
      this.setPageRoutes();
    }, 100)
  },
  /* 记录设置页面url */
  setPageRoutes(){
    let key = this.keysMap.rRoutesId
    let url = window.location.href
    let localRs = window.sessionStorage.getItem(key) || ''
    let routes = localRs && JSON.parse(localRs) || {}
    if (localRs==='') {
      routes = {
        0: '',
        1: url,
      }
    } else {
      if (routes['1']!==url) {
        let oldRs = Object.assign({}, routes)
        routes = {
          0: oldRs['1'],
          1: url
        }
      }
    }
    window.sessionStorage.setItem(key, JSON.stringify(routes))
  },
  /* 获取页面url */
  getPageRoutes(p='0'){
    let key = this.keysMap.rRoutesId;
    return JSON.parse(window.sessionStorage.getItem(key))[p]
  },
  /* 设置用户信息 */
  setUserInfo(info={}){
    let key = this.keysMap.rUserinfoId
    window.localStorage.setItem(key, JSON.stringify(info))
  },
  /* 获取用户信息 */
  getUserInfo(){
    let key = this.keysMap.rUserinfoId
    let info = JSON.parse(window.localStorage.getItem(key) || '{}')
    // console.log(info)
    this.userId = info.userId || ''
    this.openId = info.openId || ''
    this.unionId = info.unionId || ''
  },
  /* 上报接口区分 */
  setReportUrlForProd(){
    this.reportUrl = this.reportUrlMap['prod']
    console.log('Prod环境接口', this.reportUrl);
  },
  /* 获取服务环境 */
  getInitData(){
    let key = this.keysMap.rInitId
    let params = JSON.parse(window.localStorage.getItem(key) || '{}')
    // console.log(params)
    this.reportUrl = params.envType === 'prod' ? this.reportUrlMap['prod'] : this.reportUrlMap['dev']
    // console.log(this.reportUrl)
  },

  /* 离开H5应用监听 */
  onAppUnload(){
    window.onbeforeunload = (e)=>{
      window.localStorage.setItem('app-leave-time',new Date().toLocaleString());
      this.sendFailList();
    }
  },
  /* 批量上报 failList */
  sendFailList(){
    let key = this.keysMap.rFailList
    this.rFailList = JSON.parse(window.localStorage.getItem(key) || '[]')
    let list = this.rFailList.slice(0, this.maxReportCount)
    if (list && list.length>0) {
      this.ajax({
        url: this.reportUrl,
        data: list,
      }).then(res=>{
        // console.log(res)
        if (res.status === 200) {
          console.log('上报成功')
          let newList = this.rFailList.slice(this.maxReportCount)
          window.localStorage.getItem(key, JSON.stringify(newList))
        } else {
          console.log('上报失败1')
          // this.setReportFailData(data);
        }
      }).catch(err=>{
        console.log(err)
        console.log('上报失败2')
        // this.setReportFailData(data);
      })
    }
  },
  setUserFrom(p='0'){
    p = p+''
    let key = this.keysMap.rUserFromId;
    window.localStorage.setItem(key, p)
    this.userFrom = p
  },
  getUserFrom(){
    let p = window.localStorage.getItem(this.keysMap.rUserFromId);
    this.userFrom = p || '0'
  },
  addElementEvent(){
    document.body.addEventListener('click', (e)=>{
      //判断是否跳转页面
      let url = window.location.href
      if(this.pageUrl != url ){
        this.pageUrl = url
        this.sendPage({
          filter:filter
        })
      }
      console.log(e,1)
      let ev = e || window.event
      let target = ev.target || ev.srcElement
      let index = target.dataset.index || ''
      //拼装过滤参数
      let filter = {};
      console.log(ev,444)
      if(ev){
        filter = this.filterParams(ev);
      }
      console.log(filter);
      this.sendPageEvent({
        filter:filter
      })

    }, false)
  },
  filterParams(element){
    console.log(element)
    let target = element.target;
    let xpath = this.readXPath(element);
    let index = this.getIndex(target);
    return {
      tagName:target.tagName,
      text:target.innerText,
      domain:window.location.host,
      index:index,
      title:document.title,
      path:window.location.pathname,
      xpath:xpath,
    }
  },
  getIndex(target){
    let Rindex = 0;
    if(target.parentNode&&target.parentNode.children!=null){
      [].forEach.call(target.parentNode.children,(item,index)=>{
        if(target == item){
          return Rindex = index
        }
      })
    }
    return Rindex
  },
  //xpath路径拼接
  readXPath(element) {
    let paths = element.path || (element.composedPath && element.composedPath());
    let htmlStr = ''
    paths.forEach((item, index)=>{
      if(item!=window&&item.nodeName!='#document'&&item.nodeName!='HTML'&&item.nodeName!='BODY'){
        htmlStr+=`/${item.nodeName.toLowerCase()}${item.id?'#'+item.id:item.className?'.'+item.className:''}`
      }
    })
    return htmlStr;

  },
};
SDK.init();
export const $SDK_ALL = SDK;
