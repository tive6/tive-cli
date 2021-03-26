export default {
  data () {
    return {
    }
  },
  computed: {
    prodType: vm => vm.productTypeMaps[vm.flowTabsIndex],
    getCodeId: vm => {
      let codeId = ''
      if (vm.$route.name==='finance-index') {
        codeId = vm.$store.getters['Finance/getPageId']
      } else if (vm.$route.name==='flow-index') {
        codeId = vm.$store.getters['Flow/getPageId']
      }
      return codeId
    }
  },
  beforeCreate () {
    window.pageLoadTime = new Date().valueOf()
  },
  mounted () {
    this.setLoadTime()
    // console.log(this.getCodeId)
  },
  methods: {
    setLoadTime () {
      let time = new Date().valueOf() - pageLoadTime
      console.log(`【pageLoadTime】：${time} ms`)
      try {
        $SDK_ALL.sendPage({
          event_id: '',
          data: {
            eventName: 'plTime',
            anchorTime: time,
            codeid: this.getCodeId,
            // appVersion: this.$utils.getCookie('x-app-version')
          }
        })
      } catch (error) { }
    },
  }
}

