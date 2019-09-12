<template>
  <!-- <div id="app">
    <router-view></router-view>
  </div> -->
  <vue-route-transition id="app" :keepAlive="true"></vue-route-transition>
  <!-- <vue-route-transition id="app" :keepAlive="$route.meta.keepAlive">

  </vue-route-transition> -->
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
    };
  },
  components: {

  },
};
</script>

<style>
html,body,#app{
  height: 100%;
}
</style>
