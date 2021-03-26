export default {
  directives: {
    auth: {
      // 指令的定义
      inserted: function (el,binding, {context}) {
        let id = binding.value
        // console.log(el,binding,context)
        if (!id) return
        if (!context.mdAuthList.includes(id)) {
          el.remove()
        }
      }
    },
  },
  computed: {
    mdAuthList: vm => {
      return vm.$store.getters['Clue/getAuthList']
    },
  },
}

