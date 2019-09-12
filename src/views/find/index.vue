<template>
  <router-layout>
    <div class="find">

      <div class="defaultSpacing">
        <van-nav-bar
          title="标题"
          left-text="返回"
          right-text="按钮"
          slot="header"
        />
        <div class="m-banner">
          <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item height="130" class="m-item" v-for="item in bannerList" :key="item.key">
              <img :src="item.imageUrl" />
              <div class="m-tips" :class="item.titleColor">
                {{item.typeTitle}}
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="m-nav">
          <van-grid :column-num="5" :border="false" :square="true">
            <van-grid-item
              v-for="item in navList"
              :key="item.key"
              icon="play-circle-o"
              :text="item.title"
              to="/ranking"
            />
          </van-grid>
        </div>
      </div>
      <van-cell title="推荐歌单" :border="false">
        <van-button round size="mini">歌单广场</van-button>
      </van-cell>
      <div class="m-list defaultSpacing">
        <template v-for="(item,idx) in songList">
            <div class="m-list-item"
            :key="item.key"
            v-if="idx < 6">
              <div class="m-img">
                <img :src="item.picUrl" />
                <div class="m-tips">
                  
                </div>
              </div>
              <div class="m-text">
                {{item.name}}
              </div>
            </div>
        </template>
      </div>
    </div>
  </router-layout>
</template>

<script>
import { NavBar, Swipe, SwipeItem, Grid, GridItem,Cell,Button } from 'vant';
import { getBanner,getPersonalized } from '@/api/find';

export default {
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Cell.name]: Cell,
    [Button.name]: Button,
  },
  data() {
    return {
      bannerList: [],
      songList: [],
      navList: [
        {
          title: '每日推荐',
        },
        {
          title: '歌单',
        },
        {
          title: '排行榜',
        },
        {
          title: '电台',
        },
        {
          title: '直播',
        }
      ]
    };
  },
  created() {
    this.getBannerData();
    this.getPersonalizedData();
  },
  methods: {
    getBannerData() {
      getBanner().then(({ data }) => {
        console.log(data);
        this.bannerList = data.banners;
      });
    },
    getPersonalizedData(){
      getPersonalized().then(({data}) => {
        this.songList = data.result
        console.log(data);
      })
    }
  },
};
</script>

<style lang="less" scoped>
.find {
  .m-banner{
    padding: 10px 0;
    overflow: hidden;
    .m-item{
      position: relative;
      border-radius: 12px;
      img{
        width: 100%;
        border-radius: 6px;
        overflow: hidden;
      }
    }
    .m-tips{
      position: absolute;
      right: 0;
      bottom: 4px;
      padding: 2px 6px;
      font-size: 10px;
      line-height: 1;
      color: #fff;
      border-radius: 6px 0 6px 0;
    }
  }
  .van-button--mini{
    padding: 0 10px;
  }
  .m-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .m-list-item{
      width: 32%;
      margin-bottom: 10px;
      .m-img{
        border-radius: 6px;
        overflow: hidden;
      }
      .m-text{
        overflow:hidden; 
        text-overflow:ellipsis;
        display:-webkit-box; 
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2; 
        font-size: 12px;
      }
    }
  }
}
</style>
