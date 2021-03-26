<template>
    <div>
        <van-image
                round
                lazy-load
                width="200"
                height="200"
                :src="img">
            <template #loading>
                <van-loading type="spinner" size="30" />
            </template>
        </van-image>

        <br>
        <br>

        <van-button type="primary"
                    icon="search"
                    zise="mini"
                    text="随机"
                    :loading="loading"
                    @click="getImg"
                    color="linear-gradient(to right, #ff6034, #ee0a24)"
                    loading-text="loading..." />
    </div>
</template>

<script>
    import { ref, getCurrentInstance, computed } from 'vue'
    import { useStore } from 'vuex'

    export default {
        mounted () {
        },
        methods: {},
        setup () {
            const { getters, dispatch } = useStore()
            let img = computed(()=>getters['User/getRandomImg'])
            let loading = ref(false)

            const getImg = async () => {
                loading.value = true
                let res = await dispatch('User/setRandomImg')
                loading.value = false
            }

            return {
                img,
                loading,
                getImg,
            }
        },
    }
</script>
