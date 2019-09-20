<template>
  <router-layout id="__index">
    <router-view></router-view>
    <van-tabbar slot="footer" :fixed="false" v-model="active">
      <van-tabbar-item to="/find" icon="shop">发现</van-tabbar-item>
      <van-tabbar-item to="/my" icon="chat">我的</van-tabbar-item>
      <van-tabbar-item to="/account" icon="records">账号</van-tabbar-item>
    </van-tabbar>

  </router-layout>
</template>

<script>
// @ is an alias to /src
import { Tabbar, TabbarItem, Popup } from 'vant';
import Playing from '@/views/playing/';

export default {
  name: 'home',
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    isShowPlaying() {
      console.log(this.$store.state.playing.isShowPlaying);
      return this.$store.state.isShowPlaying;
    },
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Popup.name]: Popup,
    Playing,
  },
};
</script>
