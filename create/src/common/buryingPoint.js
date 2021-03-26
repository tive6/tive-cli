export default {
    send (type=1, param={}) {
        try {
            if (type===1) {
                // 页面浏览
                $SDK_ALL.sendPage({
                    event_id: '',
                    data: param,
                })
            } else {
                // 点击
                $SDK_ALL.sendPageEvent({
                    event_id: '',
                    data: param,
                })
            }
        } catch (err) {
            console.log(`【SDK】：${err}`)
        }
    },
}