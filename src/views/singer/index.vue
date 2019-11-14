<template>
 <router-layout>
  <m-header title="发现" slot="header"></m-header>
  <div class="g-singer">
    <div class="m-screen">
      <ul>
        <li :class="{active: item.value === cityId}" v-for="item in cityType" :key="item.key" @click="getType('CITY', item)">
          {{item.name}}
        </li>
      </ul>
      <ul>
        <li :class="{active: item.value === typeId}" v-for="item in singerType" :key="item.key" @click="getType('SINGEr', item)">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="m-title">
      热门歌手
    </div>
    <van-loading color="#d33a31" style="text-align: center;padding-top: 20px" v-if="idLoading" />
    <scroll 
      :data="singerList"
      :pulldown="false"
      :pullup="isPullUp"
      :isHidden="true"
      @pull-up="handlePullUp"
      @scroll-handler="getScroll"
      v-if="singerList.length > 0"
    >
      <router-link :to="{name: 'singerDetails', query: {id: item.id}}" class="m-list-item" v-for="item in singerList" :key="item.key">
        <div class="m-avata">
          <img :src="item.img1v1Url" v-lazy="item.img1v1Url">
        </div>
        <div class="m-name">
          {{item.name}}
        </div>
      </router-link>
    </scroll>
  </div>
 </router-layout>
</template>

<script>
import { getToplistArtist,getArtistList } from '@/api/singer';
import Scroll from '@/components/scroll'
import { Loading,NavBar} from 'vant';
import MHeader from '@/components/Header'

export default {
  components: {
    Scroll,
    [NavBar.name]: NavBar,
    [Loading.name]: Loading,
    MHeader
  },
  data(){
    return {
      info: {},
      singerList: [],
      cityId: '100',
      typeId: '1',
      isPullUp: true,
      cityType: [
        {
          name: '华语',
          value: '100'
        },
        {
          name: '欧美',
          value: '200'
        },
        {
          name: '日本',
          value: '600'
        },
        {
          name: '韩国',
          value: '700'
        },
        {
          name: '其他',
          value: '400'
        }
      ],
      singerType: [
        {
          name: '男',
          value: '1'
        },
        {
          name: '女',
          value: '2'
        },
        {
          name: '乐队/组合',
          value: '3'
        },
      ],
      params: {
        limit: 10,
        offset: 0,
      }
    }
  },
  created(){
    this.idLoading = true;
    this.getData();
  },
  methods:{
    handlePullUp(){
      this.params.offset++;
      this.getData();
    },
    getType(type,row){
      if(type === 'CITY'){
        this.cityId = row.value
        this.typeId = this.typeId || '1'
      }else {
        this.cityId = this.cityId || '100'
        this.typeId = row.value
      }
      this.resetData();
      this.idLoading = true;
      this.getData();
    },
    getScroll(row){
      // console.log(row);
    },
    resetData(){
      this.singerList = [];
      this.isPullUp = true;
      this.params.offset = 0;
    },
    getData(){
      getArtistList({
        cat: this.cityId + this.typeId,
        ...this.params,
        offset: this.params.offset * 10
      }).then(({data}) => {
        if(data.code === 200){
          this.idLoading = false;
          data.artists.forEach((item) => {
            this.singerList.push(item)
          })
          if(this.params.offset >= 9){
            this.isPullUp = false;
          }
        }
      })
    }
  },
};
</script>

<style lang="less">
.g-singer{
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  .m-screen{
    padding: 10px 10px 0;
    ul{
      display: flex;
      margin-bottom: 10px;
      li{
        text-decoration: underline;
        margin-right: 20px;
        &.active{
          color: #d33a31;
        }
      }
    }
  }
  .m-title{
    padding: 5px 5px 5px 10px;
    background: #f1f1f1;
  }
  .m-list-item{
    display: flex;
    padding: 10px 16px;
    align-items: center;
    border-bottom: 1px solid #f7f7f7;
  }
  .m-avata{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
      background: #ccc;
      img{
        width: 100%;
        height: 100%;
      }
    }
}
</style>
