<template>
  <div v-show="isShow"
       class="head-nav-bar">
    <div class="head-nav-bar-wrap">
      <div class="head-nav-bar-left"
           @click="backward">
        <van-icon size="24"
                  name="arrow-left" />
      </div>
      <div class="head-nav-bar-middle">{{ title }}</div>
      <div class="head-nav-bar-right">
        <!-- <div ref="navMore"
             class="head-nav-bar-more"></div> -->
        <div v-show="informationShow"
             class="head-nav-bar-right-ellipsis"
             @click="navLinkTo">
          <van-icon size="24"
                    name="ellipsis" />
        </div>
      </div>
    </div>

    <div v-show="menuShow"
         ref="navMenu"
         class="head-nav-menu">
      <div class="head-nav-menu-horn" />
      <div class="head-nav-menu-content">
        <div class="head-nav-menu-li"
             @click="linkTo('/clue/index')">
          首页
        </div>
        <div class="head-nav-menu-li"
             @click="linkTo('/clue/clue')">
          线索
        </div>
        <div class="head-nav-menu-li"
             @click="linkTo('/clue/flow')">
          流量
        </div>
        <div class="head-nav-menu-li"
             @click="linkTo('/clue/mocard')">
          会员
        </div>
      </div>
    </div>

    <!-- 下拉菜单 -->
    <popup v-model="navShow"
           position="top"
           :close-on-popstate="true"
           class="nav-content">
      <div class="nav-content-close"
           @click="navShow=false">
        关闭
      </div>
      <div class="nav-outer">
        <div class="nav-header">
          <div class="nav-tabs nav-tabs-active">总概览</div>
          <!--                    <div class="nav-tabs">易车APP</div>-->
        </div>
        <div v-if="isMocard"
             class="nav-body">
          <!--                    <router-link v-for="(item, i) in routesAuth" tag="a" :to="{ path: item.url }" class="nav-list" :key="i">{{item.name}}</router-link>-->
          <router-link tag="a"
                       :to="{ path: '/clue/mocard' }"
                       class="nav-list">
            实时总览
          </router-link>
          <!--                    <router-link tag="a" :to="{ path: '/clue/flow' }" class="nav-list">流量总览</router-link>-->
          <!--                    <router-link tag="a" :to="{ path: '/clue/mocard' }" class="nav-list">Mo卡北极星</router-link>-->
        </div>
        <div v-else
             class="nav-body">
          <router-link v-for="(item, i) in routesAuth"
                       :key="i"
                       tag="a"
                       :to="{ path: item.url }"
                       class="nav-list">
            {{ item.name }}
          </router-link>
          <!--                    <router-link tag="a" :to="{ path: '/clue/clue' }" class="nav-list">流量总览</router-link>-->
          <!--                    <router-link tag="a" :to="{ path: '/clue/flow' }" class="nav-list">流量总览</router-link>-->
          <!--                    <router-link tag="a" :to="{ path: '/clue/mocard' }" class="nav-list">Mo卡北极星</router-link>-->
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import { Popup } from 'vant';
import ClientUtils from '@/common/client';
import { mapGetters } from 'vuex';

export default {
  components: {
    Popup,
  },
  data() {
    return {
      menuShow: false,
      isShow: this.$store.getters['User/getUserShowNavBar'],
      navShow: false,
      routeName: '',
      routesAuth: [],
      mocTabsIndex: 0,
      isMocard: false,
      informationShow: false,
      iconList: {
        'clue-overview': '#fff',
      },
      title: '',
    };
  },
  computed: {
  },
  watch: {
    $route(to, from) {
      // 当前路由
      const { name, meta } = to;
      this.title = this.$route.meta.title
      this.routeName = name;
    },
  },
  async created() {
  },
  mounted() {
    // this.setMoreMenu()
  },
  methods: {
    backward() {
      if (this.routeName === 'home') {
        this.closeView();
      } else {
        this.$router.go(-1);
      }
    },
    closeView() {
      ClientUtils.closeWebView();
    },
    setMoreMenu() {
      const evs = ['click', 'touchstart'];
      evs.forEach((ev) => {
        this.$refs.navMore.addEventListener(ev, (e) => {
          this.menuShow = !this.menuShow;
          e.stopPropagation();
          e.preventDefault();
        });
      });
      evs.forEach((ev) => {
        this.$refs.navMenu.addEventListener(ev, (e) => {
          e.stopPropagation();
        });
      });
      evs.forEach((ev) => {
        document.addEventListener(ev, () => {
          this.menuShow = false;
        });
      });
    },
    linkTo(url) {
      this.$router.push({
        path: url,
      });
      this.menuShow = false;
    },
    navLinkTo() {
      this.$router.push({
        path: '/common/information',
        query: {
          name: this.routeName,
        },
      });
    },
  },
};
</script>
