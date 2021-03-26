<template>
  <div class="ratio-text" :class="{'up': isUp, 'down': isDown}">
    {{getRatio}}
    <img v-show="iconShow" :src="iconSrc" class="ratio-text-icon">
  </div>
</template>
<script>
export default {
  name: 'ratio-text',
  props: {
    num: {
      // type: [Object, Number, null],
      required: true,
      default: () => '--'
    },
    icon: {
      type: String,
      default: false,
    },
    hasPlus: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isUp: false,
      isDown: false,
      iconMap: {
        up: require('@/assets/img/clue/clue-icon-up.png'),
        down: require('@/assets/img/clue/clue-icon-down.png'),
      },
      iconSrc: '',
      iconShow: false,
    };
  },
  computed: {
    getRatio () {
      // console.log(this.num)
      let str = ''
      this.isUp = false
      this.isDown = false
      if (this.num===null) {
        str = '--'
        this.iconShow = false
      } else {
        // console.log(this.num)
        this.iconShow = true
        if (+this.num===0) {
          str = '0.0%'
          this.iconShow = false
        } else if (+this.num>0) {
          this.isUp = true
          str = (this.hasPlus ? '+' : '') + (+this.num * 100).toFixed(1) + '%'
          // str = '+' + (+this.num * 100).toFixed(1) + '%'
        } else {
          this.isDown = true
          str =  (+this.num * 100).toFixed(1) + '%'
        }
        if (this.icon) {
          if (+this.num===0) {
            this.iconShow = false
          } else {
            this.iconShow = true
            // console.log(+this.num)
            if (+this.num>0) {
              this.iconSrc = require(`@/assets/img/${this.icon}up.png`)
              // this.iconSrc = require('@/assets/img/clue/clue-icon-up.png')
            }
            if (+this.num<0) {
              this.iconSrc = require(`@/assets/img/${this.icon}down.png`)
            }
          }

        }
      }
      return str
    },
  },
}
</script>
<style scoped lang="scss">
  .ratio-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #999;
    &.up {
      color: #23AB61;
    }
    &.down {
      color: #FF3A2F;
    }
  }
  .ratio-text-icon {
    width: 12px;
    margin-left: 6px;
  }
</style>