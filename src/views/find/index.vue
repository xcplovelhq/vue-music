<template>
  <router-layout>
    <div class="find">
      <m-header title="推荐" slot="header"></m-header>
      <div class="defaultSpacing">
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
      </div>
      <van-cell title="推荐歌单" :border="false">
        <van-button round size="mini">歌单广场</van-button>
      </van-cell>
      <div class="m-list defaultSpacing">
        <template v-for="(item,idx) in songList">
          <div class="m-list-item"
            :key="item.key"
            @click="handleGo(item)">
              <div class="m-img">
                <img :src="item.picUrl" />
                  <play-count :playCount="item.playCount"></play-count>
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
import {
  NavBar, Swipe, SwipeItem, Grid, GridItem, Cell, Button,
} from 'vant';
import { getBanner, getPersonalized } from '@/api/find';
import PlayCount from '@/components/PlayCount';
import MHeader from '@/components/Header'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Cell.name]: Cell,
    [Button.name]: Button,
    PlayCount,
    MHeader
  },
  data() {
    return {
      bannerList: [],
      songList: [],
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
    getPersonalizedData() {
      getPersonalized().then(({ data }) => {
        this.songList = data.result;
        console.log(data);
      });
    },
    handleGo(item) {
      this.$router.push({ name: 'songSheet', query: { id: item.id } });
    },
  },
};
</script>

<style lang="less">
.find {
  padding-top: 46px;
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
  .m-nav{
    padding: 0 16px 10px;
    border-bottom: 1px solid #ebedf0;
    ul{
      display: flex;
      justify-content: space-between;
      li{
        text-align: center;
        .m-nav-item{
            display: block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #f8443a;
            display: flex;
            align-items: center;
            justify-content: center;

            .iconfont{
                position: relative;
                font-size: 22px;
                color: #fff;
                .m-day{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin: -3px 0 0 -7px;
                    line-height: 1;
                    font-size: 10px;
                    color: #fff;
                }
                &:first-child{
                  font-size: 24px;
                }
                &.i-playlist{
                  font-size: 18px;
                }
            }
        }
        p{
          margin-top: 5px;
        }
      }
    }
  }
  .m-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .m-list-item{
      position: relative;
      width: 32%;
      margin-bottom: 10px;
      .m-img{
        border-radius: 6px;
        height: 109px;
        overflow: hidden;
      }
      .m-text{
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        font-size: 12px;
        color: #333;
      }
    }
  }
}
</style>
