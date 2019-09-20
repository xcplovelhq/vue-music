<template>
  <!-- <div id="app">
    <router-view></router-view>
  </div> -->
  <vue-route-transition id="app" :keepAlive="true">
    <van-popup
      v-model="$store.state.playing.isShowPlaying"
      position="right"
      :overlay="false"
      :style="{ width: '100%', height: '100%' }">
      <playing></playing>
    >
    </van-popup>
  </vue-route-transition>

  <!-- <vue-route-transition id="app" :keepAlive="$route.meta.keepAlive">

  </vue-route-transition> -->
</template>

<script>
import { Popup } from 'vant';
import Playing from '@/views/playing/';

export default {
  name: 'app',
  data() {
    return {
    };
  },
  components: {
    [Popup.name]: Popup,
    Playing,
  },
};
</script>

<style>
html,body,#app{
  height: 100%;
}
</style>
