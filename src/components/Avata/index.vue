
<template>
    <div class="g-avata" :style="{ width: Size + 'px', height: Size + 'px' }">
        <img :src="ImgUrl" alt="" />
    </div>
</template>

<script>
export default {
  props: {
    ImgUrl: String,
    Size: String || Number,
  },
};
</script>

<style lang="less" scoped>
.g-avata{
    border-radius: 100%;
    overflow: hidden;
    border-radius: 50px;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>
