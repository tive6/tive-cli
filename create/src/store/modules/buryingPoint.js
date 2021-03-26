const SET_CODE_ID = 'SET_CODE_ID'
const SET_TAB_NAME = 'SET_TAB_NAME'
const SET_BRAND_ID = 'SET_BRAND_ID'

export default {
    namespaced: true,

    state: {
        codeId: '11_4_1',
        tabName: 'pinpai',
        brandId: '',
    },

    getters: {
        getCodeId (state) {
            return state.codeId
        },
        getTabName (state) {
            return state.tabName
        },
        getBrandId (state) {
            return state.brandId
        },
    },

    mutations: {
        [SET_CODE_ID]: (state, codeId)=>{
            state.codeId = codeId
        },
        [SET_TAB_NAME]: (state, tabName)=>{
            state.tabName = tabName
        },
        [SET_BRAND_ID]: (state, brandId)=>{
            state.brandId = brandId
        },
    },

}