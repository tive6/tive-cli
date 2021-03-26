<template>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">1</div>
        <div class="swiper-slide">2</div>
        <div class="swiper-slide">3</div>
        <div class="swiper-slide">4</div>
      </div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/css/swiper.min.css'
    console.log(Swiper)
    export default {
        components: {},
        data () {
            return {}
        },
        mounted () {
          this.init()
        },
        methods: {
          init () {
            var mySwiper = new Swiper('.swiper-container', {
              loop: true, // 循环模式选项
              autoplay: true,
              initialSlide: 2,
              allowTouchMove: false, // 禁止滑动
            })
          },
        },
    }
</script>

<style scoped>

  .swiper-container {
    height: 100vh;
    background-color: #4390EE;
  }
  .swiper-slide {
    /*width: 200px;*/
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
