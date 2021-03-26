import { ref, getCurrentInstance } from 'vue'

export default () => {
    let a = ref('a')
    const currentInstance = getCurrentInstance()
    const { $dialog } = currentInstance.appContext.config.globalProperties

    const logA = ()=> {
        $dialog.alert({
            message: 'Dialog - 组件A',
        })
    }

    return {
        a,
        logA,
    }
}