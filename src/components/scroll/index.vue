<template>
  <div class="scroll">
    <div ref="bsWrapper" class="pulldown-bswrapper">
      <div class="pulldown-scroller">
        <div class="pulldown-wrapper">
          <div v-show="beforePullDown && propsPullDown">
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
        <div class="pullup-wrapper" v-show="beforePullUp && propsPullUp">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">正在加载</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import PullDown from '@better-scroll/pull-down'
  import Pullup from '@better-scroll/pull-up'
  BScroll.use(PullDown)
  BScroll.use(Pullup)

  export default {
    
    props: {
        data: [Array],
        propsPullDown: {
            type: Boolean,
            default: false,
        },
        propsPullUp: {
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
        y: 0,
      }
    },
    created() {
        this.bscroll = null;
    },
    mounted() {
      this.$nextTick(() =>{
        this.initBscroll()
      })
    },
    computed:{
      getScrollTop(){
        if(this.y > 50){
          return false
        }else {
          return true
        }
      }
    },
    methods: {
      initBscroll() {
        this.bscroll = new BScroll(this.$refs.bsWrapper, {
          scrollY: true,
          bounceTime: 800,
          pullDownRefresh: this.propsPullDown && {
            threshold: 90,
            stop: 40
          },
          click: true,
          pullUpLoad: this.propsPullUp
        })
        this.propsPullDown && this.bscroll.on('pullingDown', this.pullingDownHandler)
        this.propsPullUp && this.bscroll.on('pullingUp', this.pullingUpHandler)
        this.bscroll.on('scroll', this.scrollHandler)
      },
      // 滚动时触发
      scrollHandler(pos) {
        this.y = pos.y;
      },
      // 下拉时触发事件
      pullingDownHandler() {
        this.beforePullDown = false
        this.isPullingDown = true
        // this.requestData()
        this.$emit('pull-down')
        // this.finishPullDown()
      },
      // 上拉时触发事件
      pullingUpHandler() {
        this.beforePullUp = true;
        this.isPullUpLoad = true
        // this.requestData()
        this.$emit('pull-up')
        // this.bscroll.finishPullUp()
      },

      // async finishPullDown() {
      //   const stopTime = 600
      //   await new Promise(resolve => {
      //     setTimeout(() => {
      //       this.bscroll.finishPullDown() // 设置回弹
      //       resolve()
      //     }, 2000)
      //   })
      //   setTimeout(() => {
      //     this.beforePullDown = true
      //     this.bscroll.refresh()
      //   }, 1000)
      // },
      // async requestData() {
      //   try {
      //     if(this.isPullUpLoad){
      //       this.dataList.push(Math.random())
      //     }else {
      //       this.dataList =  [1,2,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
      //     }
      //   } catch (err) {
      //     // handle err
      //     // console.log(err)
      //   }
      // },
    },
    watch: {
      data(){
        this.isPullUpLoad = false
        this.isPullingDown = false
        this.beforePullDown = true
        setTimeout(() => {
            this.bscroll.finishPullUp()
            this.bscroll.finishPullDown()
            this.bscroll.refresh()
        }, 50)
      }
    }
  }
</script>

<style lang="less">

.scroll{
  flex: 1;
   overflow:auto;
}
.pulldown-bswrapper{
  position: relative;
  height: 100%;
  overflow: hidden;
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