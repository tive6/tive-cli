<template>
  <div id="app">
    <head-nav />
    <template>
      <router-view :key="this.$route.path" />
    </template>
  </div>
</template>

<script>
import HeadNav from '@/components/headNav.vue'

export default {
  name: 'App',
  components: {
    HeadNav,
  },
  provide() {
    return {
    };
  },
  data() {
    return {
    };
  },
  created() {
    this.keepStoreData()
  },
  methods: {
    keepStoreData () {
      // 查看sessionStorage里面是否有存储信息，有就恢复
      if (sessionStorage.getItem('app-store')) {
        this.$store.replaceState({ ...this.$store.state, ...JSON.parse(sessionStorage.getItem('app-store')) });
      }
      // 刷新前保留store中存储的信息
      window.addEventListener('unload', () => {
        sessionStorage.setItem('app-store', JSON.stringify(this.$store.state));
      });
    },
  },
};
</script>
