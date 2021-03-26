<template>
  <div class="com-select" @click.stop="selectShow">
    {{getValue}}
    <span class="com-select-icon" :class="{'up':open}"></span>
<!--    <van-icon name="arrow-down" class="com-select-icon" :class="{'up':open}" />-->
    <transition name="van-fade">
      <div v-show="open" ref="selectBox" class="com-select-box">
        <img class="com-select-horn" src="@/assets/img/finance/fin-icon-jiantou.png"/>
        <div class="com-select-option"
             v-for="(item, index) in selectList"
             :key="index"
             :class="{'com-select-active': item.value===value}"
             @click.stop="itemChange(item)">
          {{item.label}}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    selectList: {
      type: Array,
      required: true,
      default: ()=> []
    },
    value: {
      type: [String, Number],
      default: ()=> '',
    },
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    getValue () {
      return this.selectList.find(item=>item.value===this.value)['label']
    },
  },
  mounted () {
    // this.selectHide('add')
  },
  beforeDestroy () {
    // this.selectHide('remove')
  },
  methods: {
    selectShow () {
      this.open = !this.open
      // if (this.open) {
      //   let timer = setTimeout(()=>{
      //     this.open = false
      //     clearTimeout(timer)
      //   }, 3000)
      // }
    },
    itemChange (item) {
      let { value } = item
      this.open = false
      value!==this.value && this.$emit('change', item)
    },
    selectHide (type) {
      // console.log(this.$refs.navMore)
      let evs = ['click', 'touchstart']
      evs.map(ev => {
        document[`${type}EventListener`](ev, (e) => {
          this.open = false
          console.log(22)
        })
      })
      evs.map(ev => {
        this.$refs.selectBox[`${type}EventListener`](ev, (e) => {
          e.stopPropagation()
          // e.preventDefault()
          console.log(333)
        })
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  .com-select {
    /*width: 200px;*/
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    /*border: 1px solid #dcdfe6;*/
    /*border-radius: 8px;*/
    color: #333;
    font-size: 28px;
    padding-left: 30px;
  }

  .com-select-icon {
    /*margin-left: 20px;*/
    border: 8px solid transparent;
    border-top: 10px solid #666;
    margin-left: 12px;
    position: relative;
    top: 3px;
    /*transition: all ease 0.5s;*/
    &.up {
      top: -4px;
      transform: rotateZ(-180deg);
    }
  }

  .com-select-box {
    /*display: none;*/
    position: absolute;
    top: 60px;
    right: -2px;
    z-index: 22;
    /*width: calc(100% + 4px);*/
    padding: 30px;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.08);
    /*overflow: hidden;*/
    transition: all ease 0.5s;
  }

  .com-select-horn {
    width: 36px;
    height: 28px;
    position: absolute;
    right: 50px;
    top: -28px;
    z-index: 33;
  }

  .com-select-option {
    text-align: center;
    padding: 0 0 30px;
    font-size: 28px;
    color: #333;
    white-space: nowrap;
    &:last-child {
      padding-bottom: 0;
    }
    &.com-select-active {
      color: #3E73F9;
    }
  }
</style>