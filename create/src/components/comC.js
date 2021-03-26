import { ref, getCurrentInstance } from 'vue'

export default () => {
    let c = ref('c')

    const currentInstance = getCurrentInstance()
    const { $notify } = currentInstance.appContext.config.globalProperties

    const logC = ()=> {
        $notify({
            type: 'success',
            message: 'Notify - 组件C',
        })
    }

    return {
        c,
        logC,
    }
}