<template>
    <div class="g-playcount">
        <i class="iconfont">&#xe607;</i>{{getPlayCount()}}
    </div>
</template>

<script>
export default {
  props: {
    playCount: Number,
  },
  methods: {
    getPlayCount() {
      if (this.playCount > 100000000) {
        return `${(this.playCount / 100000000).toFixed(1)}亿`;
      } if (this.playCount > 100000) {
        return `${(this.playCount / 10000).toFixed(1)}万`;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.g-playcount{
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 12px;
    color: #fff;
    i{
        font-size: 12px;
        vertical-align: text-bottom;
        margin-right: 2px;
    }
}
</style>
