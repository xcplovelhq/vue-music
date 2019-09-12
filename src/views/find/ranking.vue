<template>
  <div class="g-ranking">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
    />
    ranking
  </div>
</template>

<script>
import { Tabbar, TabbarItem, NavBar } from 'vant';

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [NavBar.name]: NavBar,
  },
};
</script>

<style>
.g-ranking{
  height: 100%;
  background: #fff;
}
</style>
