import Watermark from '@/common/watermark'

export default {
  data () {
    return {
      wmText: '',
      wmNode: null
    }
  },
  mounted () {
    this.setWatermark()
  },
  destroyed () {
    this.wmNode && this.wmNode.removeSvgBg()
  },
  methods: {
    setBgImg (el) {
      let userInfo = this.$store.getters['User/getUserInfo']
      // console.log(userInfo)
      this.wmText = `${userInfo.CnName} ${userInfo.EmployeeNumber}`
      this.wmNode = new Watermark({
        el: el,
        text: this.wmText,
      })
      this.wmNode.setSvgBg()
    },
    setWatermark () {
      let imgEl = this.$refs.wmParent
      this.setBgImg(imgEl)
    },
  }
}

