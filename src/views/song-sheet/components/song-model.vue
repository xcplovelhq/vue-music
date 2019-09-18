<template>
  <div class="g-song-message" @click="handleClose">
    <div
      class="m-modal-bg"
      :style="{backgroundImage: `url(${detailsInfo.coverImgUrl})`}"
    >
    </div>
    <div class="m-message">
      <div class="m-img">
        <img :src="detailsInfo.coverImgUrl">
      </div>
      <div class="m-title">
        {{detailsInfo.name}}
      </div>
      <div class="m-label">
        标签：<span class="m-label-text" v-for="item in detailsInfo.tags" :key="item.key">{{item}}</span>
      </div>
      <div class="m-text" v-html="formatText">
      </div>
    </div>
  </div>
</template>

<script>
import {formatEnter} from '@/utils/utils'
export default {
	props: {
		detailsInfo: Object
  },
  created(){
    console.log(formatEnter );
    
  },
  computed:{
    formatText(){
      return formatEnter(this.detailsInfo.description)
    }
  },
	methods:{
		handleClose(){
			this.$emit('handle-close')
		}
	}
};
</script>

<style lang="less" scoped>
.g-song-message {
  width: 100%;
  height: 100%;
  .m-modal-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(10px);
    z-index: 1;
  }
  .m-message {
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    height: 600px;
    padding: 0px 20px 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    z-index: 2;
    .m-img {
      width: 200px;
      height: 200px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .m-title {
      text-align: center;
      padding-bottom: 15px;
      margin-top: 40px;
      font-size: 18px;
      color: #fff;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .m-label {
      margin-top: 20px;
      text-align: left;
      color: #fff;
      .m-label-text {
        display: inline-block;
        margin-right: 10px;
        border-radius: 100px;
        padding: 2px 8px;
        font-size: 12px;
        border: 1px solid #fff;
        vertical-align: text-bottom;
      }
    }
    .m-text {
      text-align: left;
      line-height: 25px;
      margin-top: 20px;
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>