<template>
  <div class="scroll" :style="{overflow: `${isHidden ? 'hidden': 'visible'}`}">
    <div ref="bsWrapper" class="pulldown-bswrapper">
      <div class="pulldown-scroller">
        <div class="pulldown-wrapper">
          <div v-show="beforePullDown && pulldown">
            <span v-if="getScrollTop">下拉即可刷新</span>
            <span v-else>释放即可刷新</span>
          </div>
          <div v-show="!beforePullDown">
            <div v-show="isPullingDown">
              <span>Loading...</span>
            </div>
            <div v-show="!isPullingDown"><span>加载成功</span></div>
          </div>
        </div>
        <slot></slot>
        <div class="pullup-wrapper" v-if="pullup">
          <div v-if="!isPullUpLoad && pullup" class="before-trigger">
            <span class="pullup-txt">上拉加載更多</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">{{pullUpText}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import PullDown from '@better-scroll/pull-down';
import Pullup from '@better-scroll/pull-up';

BScroll.use(PullDown);
BScroll.use(Pullup);

export default {

  props: {
    data: [Array],
    isScrollX: {
      type: Boolean,
      default: false,
    },
    pulldown: {
      type: Boolean,
      default: false,
    },
    pullup: {
      type: Boolean,
      default: false,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      beforePullUp: false,
      beforePullDown: true,
      isPullingDown: false,
      isPullUpLoad: true,
      pullUpText: '加载中...',
      y: 0,
    };
  },
  created() {
    this.bscroll = null;
  },
  mounted() {
    this.$nextTick(() => {
      this.initBscroll();
    });
  },
  computed: {
    getScrollTop() {
      if (this.y > 50) {
        return false;
      }
      return true;
    },
  },
  methods: {
    initBscroll() {
      this.bscroll = new BScroll(this.$refs.bsWrapper, {
        probeType: 3,
        scrollY: true,
        scrollX: this.isScrollX,
        bounce: {
          top: true,
          bottom: false,
          left: true,
          right: true
        },
        pullDownRefresh: this.pulldown && {
          threshold: 90,
          stop: 40,
        },
        click: true,
        pullUpLoad: this.pullup,
      });
      
      this.isPullUpText();
      this.pulldown && this.bscroll.on('pullingDown', this.pullingDownHandler);
      this.pullup && this.bscroll.on('pullingUp', this.pullingUpHandler);
      this.bscroll.on('scroll', this.scrollHandler);
    },
    // 滚动时触发
    scrollHandler(pos) {
      this.y = pos.y;
      this.$emit('scroll-handler',pos);
    },
    // 下拉时触发事件
    pullingDownHandler() {
      this.beforePullDown = false;
      this.isPullingDown = true;
      // this.requestData()
      this.$emit('pull-down');
      // this.finishPullDown()
    },
    // 上拉时触发事件
    pullingUpHandler() {
      this.beforePullUp = true;
      this.isPullUpLoad = true;
      // this.requestData()
      this.$emit('pull-up');
      // this.bscroll.finishPullUp()
    },
    isPullUpText(){
      // this.isShowPullUpText = this.scroll.hasVerticalScroll
        if(!this.pullup){
        this.pullUpText = '没有更多的数据了';
      }
    }
  },
  watch: {
    data(val) {
      if(val.length >= 100){
        this.isPullUpText();
      }
      if(this.isPullUpLoad && this.pullup){
        this.isPullUpLoad = false;
        setTimeout(() => {
          this.bscroll.finishPullUp();
          this.bscroll.refresh();
        }, 50)
      }
      if(this.isPullingDown){
        this.isPullingDown = false
        setTimeout(() => {
            this.beforePullDown = true;
            this.bscroll.finishPullDown();
            this.bscroll.refresh();
        }, 600)
      }
      
    },
  },
};
</script>

<style lang="less">

.scroll{
  flex: 1;
  height: 100%;
  //  overflow:auto;
}
.pulldown-bswrapper{
  position: relative;
  height: 100%;
  overflow: visible;
}
.pulldown-list{
  padding: 0;
}
.pulldown-list-item{
  padding: 10px 0;
  list-style: none;
  border-bottom: 1px solid #ccc;
}
.pulldown-wrapper{
  position: absolute;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  transform: translateY(-100%) translateZ(0);
  text-align: center;
  color: #999;
}
.pullup-wrapper{
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>
