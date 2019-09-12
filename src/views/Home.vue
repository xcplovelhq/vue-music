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
import { Tabbar, TabbarItem } from 'vant';

export default {
  name: 'home',
  data() {
    return {
      active: 0,
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
};
</script>
