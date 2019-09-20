<template>
  <router-layout>
    <van-nav-bar
    title="标题"
    left-text="返回"
    right-text="按钮"
  />
  <div class="g-ranking defaultSpacing">
   
    <div class="m-title">
      官方榜
    </div>
    <div class="m-ranking">
      <template v-if="rankingList.length <= 0">
        <van-skeleton title avatar :row="3"  v-for="item in 4" :key="item.key" />
      </template>
      <template v-else v-for="(item,idx) in rankingList" >
        <div class="m-ranking-items" :key="item.key" v-if="idx < 4">
          <router-link :to="{name: 'songSheet',query: {id: item.id}}">
            <div class="m-img">
              <img :src="item.coverImgUrl">
            </div>
            <div class="m-name">
              <div>
                <p v-for="(i,idx) in item.tracks" :key="i.key">{{idx+1}}.{{i.first}}-{{i.second}}</p>
              </div>
            </div>
          </router-link>
        </div>
      </template>
      
    </div>
    <div class="m-title">
      更多榜单
    </div>
    <div class="m-ranking-more">
      <van-skeleton title avatar :row="3"  v-if="rankingList.length <= 0" />
      <template v-else v-for="(item,idx) in rankingList">
        <div class="m-ranking-more-item" :key="item.key" v-if="idx > 4">
          <router-link :to="{name: 'songSheet',query: {id: item.id}}">
            <div class="m-img">
              <img :src="item.coverImgUrl">
            </div>
            <div class="m-name">
              <p>
                {{item.name}}
              </p>
            </div>
          </router-link>
        </div>
      </template>
    </div>
  </div>
  </router-layout>
</template>

<script>
import { Tabbar, TabbarItem, NavBar,Skeleton  } from 'vant';
import { getToplistDetail } from '@/api/playlist';

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [NavBar.name]: NavBar,
    [Skeleton.name]: Skeleton,
  },
  data(){
    return {
      rankingList: [],
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      getToplistDetail().then(({data}) => {
        if(data.code === 200){
          this.rankingList = data.list;
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
  .g-ranking{
  background: #fff;
  .m-title{
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
  }
  .m-ranking{
    .m-ranking-items{
        a{
            display: flex;
        }
        margin-bottom: 5px;
        .m-img{
            width: 123px;
            height: 123px;
            margin-right: 10px;
            border-radius: 3px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .m-name{
            display: flex;
            flex:1;
            border-bottom: 1px solid #F4F5F7;
            align-items: center;
            p{
                margin-bottom: 10px;
                color: #555;
                overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:1;
            }
        }
    }
  }
  .m-ranking-more{
      display: flex;
      flex-wrap: wrap;
      padding-right: 6px;
      justify-content: space-between;
      .m-ranking-more-item{
          width: 32%;
          margin-bottom: 10px;
          .m-img{
              width: 100%;
              margin-right: 10px;
              border-radius: 3px;
              overflow: hidden;
              img{
                  width: 100%;
                  height: 100%;
              }
          }
          .m-name{
              padding-left: 4px;
              margin-top: 5px;
              p{
                  margin: 0;
                  color: #888
              }
          }
      }
  }
}
</style>
