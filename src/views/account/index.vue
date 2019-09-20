<template>
  <div class="g-account">
    <div class="m-header">
      <div class="m-avata">
        <img :src="info.profile && info.profile.avatarUrl">
      </div>
      <div class="m-name">
        <h3>{{info.profile && info.profile.nickname}}</h3>
        <p><span>Lv. 8</span></p>
      </div>
    </div>
    <div class="m-nav">
      <div class="m-item" v-for="item in navList" :key="item.key">
        <h3 v-if="item.value">{{item.value}}</h3>
        <h3 v-else><i class='iconfont' v-html="item.icon"></i></h3>
        <p>{{item.title}}</p>
      </div>
    </div>
    <van-cell-group style="margin-top: 30px;">
      <van-cell title="关于" is-link />
    </van-cell-group>
    <van-button style="margin-top: 20px; color: #d33a31" type="default" size="large">退出登录</van-button>
  </div>
</template>

<script>
import { getUserDetail } from '@/api/user';
import { Grid, GridItem,Cell,CellGroup,Button   } from 'vant';
import { mapActions } from 'vuex'
export default {
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Popup.name]: Popup
  },
  data(){
    return {
      info: {},
      navList: [
        {
          title: '动态',
          value: '0',
          index: 'eventCount',
        },
        {
          title: '关注',
          value: '0',
          index: 'follows',
        },
        {
          title: '粉丝',
          value: '0',
          index: 'followeds',
        },
        {
          title: '编辑资料',
          icon: '&#xe63c'
        }
      ]
    }
  },
  created(){
    this.getData();
  },
  methods:{
    ...mapActions({
      getUserDetail: 'user/getUserDetailData'
    }),
    getData(){
      this.getUserDetail().then((data) => {
        if(data.code === 200){
          this.info = data;
          this.navList.forEach((item) => {
            item.value = data.profile[item.index]
          })
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.g-account{
  height: 100%;
  padding-top: 20px;
  background: #f7f7f7;
  .m-header{
    display: flex;
    align-items: center;
    padding: 0 20px;
    .m-avata{
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 50%;
    }
    .m-name{
      margin-left: 10px;
      h3{
        font-size: 14px;
        color: #333;
        margin-bottom: 5px;
      }
      span{
        line-height: 1;
        padding: 1px 5px;
        border-radius: 50px;
        background: #ccc;
      }
    }
  }
  .m-nav{
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    .m-item{
      width: 25%;
      text-align: center;
      border-right: 1px solid #f5f5f5;
      &:last-child{
        border-right: 0;
      }
      h3{
        font-size: 14px;
        color: #333;
      }
      p{
        color: #999;
      }
    }
  }
}
</style>
