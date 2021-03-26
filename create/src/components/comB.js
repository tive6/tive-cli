import { ref, getCurrentInstance } from 'vue'

export default () => {
    let b = ref('b')

    const currentInstance = getCurrentInstance()
    const { $toast } = currentInstance.appContext.config.globalProperties

    const logB = ()=> {
        $toast({
            type: 'success',
            message: 'Toast - 组件B',
        })
    }

    return {
        b,
        logB,
    }
}