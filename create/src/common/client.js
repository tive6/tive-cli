// const JSBridge = require('jsbridge').init('jsbridge','localhost');
// import JSBridge from 'jsbridge'
// console.log(JSBridge)
// const JSBridgeObj = JSBridge.init('jsbridge','localhost');
// import JSBridge from 'h5-jsbridge'

export default {
    closeWebView2 (params, cb) {
        // jsBridge.registerHandler('funName', function (data) {
        // 	console.log(data)
        // })
        // JSBridge.callHandler(
        // 	JSON.stringify(params.data),
        // 	(data) => {
        // 		cb && cb(data)
        // 	})
    },
    setupWebViewJavascriptBridge (callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge)
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback)
        }
        window.WVJBCallbacks = [callback]
        var WVJBIframe = document.createElement('iframe')
        WVJBIframe.style.display = 'none'
        WVJBIframe.src = 'https://__bridge_loaded__'
        document.documentElement.appendChild(WVJBIframe)
        let timer = setTimeout(() => {
            document.documentElement.removeChild(WVJBIframe)
            clearTimeout(timer)
        }, 0)
    },
    callHandler (params, cb) {
        this.setupWebViewJavascriptBridge(bridge => {
            bridge.callHandler(
                params.funName,
                params.data,
                (data) => {
                    cb && cb(data)
                })
        })
    },
    registerHandler (params, cb) {
        this.setupWebViewJavascriptBridge(bridge => {
            bridge.registerHandler(
                params.funName,
                params.data,
                (data) => {
                    cb && cb(data)
                })
        })
    },
    // 关闭webview
    closeWebView () {
        this.callHandler({
            funName: 'TTXToNative',
            data: { "type": "CloseView", "params": { "type": "close" } },
        })
    },
    // 客户端埋点事件
    viewLoadReport (data) {
        this.callHandler({
            funName: 'TTXToNative',
            data: { "type": "ViewLoadFinish", "params": data },
        })
    },
}