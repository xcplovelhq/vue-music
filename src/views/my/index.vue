<template>
  <router-layout>
    <m-header title="我的" slot="header"></m-header>
    <div class="g-my">
      <van-cell-group class="my-list">
          <van-cell
          :title="item.title"
          is-link
          v-for="item in list"
          :key="item.key"
          >
          <i
              slot="icon"
              class="iconfont"
              v-html="item.icon"
          ></i>
          </van-cell>
      </van-cell-group>
      <van-collapse v-model="activeName" class="m-playlist" >
          <van-collapse-item title="我创建的歌单" name="1">
              <div slot="value" @click.stop="handleAdd" class="m-add">+</div>
              <template v-for="item in myPlayList">
                  <van-swipe-cell
                      :key="item.key"
                      v-if="item.subscribedCount == 0">
                      <van-cell
                          :title="item.name"
                          :label="`${item.trackCount}首`"
                          center
                          :to="{name: 'songSheet', query:{id: item.id}}"
                          >
                          <div slot="icon" class="m-img">
                              <img :src="item.coverImgUrl">
                          </div>
                      </van-cell>
                      <template slot="right">
                          <van-button square type="danger" text="删除" />
                      </template>
                  </van-swipe-cell>
              </template>
          </van-collapse-item>
            <van-collapse-item title="我收藏的歌单" name="2">

              <template v-for="item in myPlayList">
                  <van-swipe-cell
                      :key="item.key"
                      v-if="item.subscribedCount > 0">
                      <van-cell
                          :title="item.name"
                          :label="`${item.trackCount}首${item.subscribed ? '，by ' + item.creator.nickname: ''}`"
                          center
                          :to="{name: 'songSheet',query:{id: item.id}}"
                          >
                          <div slot="icon" class="m-img">
                              <img :src="item.coverImgUrl">
                          </div>
                      </van-cell>
                      <template slot="right">
                          <van-button square type="danger" text="删除" />
                      </template>
                  </van-swipe-cell>
              </template>
          </van-collapse-item>
      </van-collapse>
    </div>
    <van-popup
      v-model="isAddShow"
      round
      position="bottom"
      :style="{ height: '20%' }"
    >
      <div class="dialog-add">
          <div class="dialog-title just-between">
              <div class="dialog-title-left" @click="isAddShow = false">取消</div>
              <div class="dialog-title-middle">新建歌单</div>
              <div class="dialog-title-right" :class="{active: playlistName.length > 0}" :disabled="isAddShow" @click="handleAddComplete">完成</div>
          </div>
          <van-cell-group>
              <van-field v-model="playlistName" placeholder="歌单标题" />
          </van-cell-group>
          <van-checkbox style="margin-top: 10px" checked-color="#d33a31" v-model="privacy" icon-size="10px">设置为隐私歌单</van-checkbox>
      </div>
    </van-popup>
  </router-layout>
</template>

<script>
import {
  SwipeCell, NavBar, Cell, CellGroup, Button, Collapse, CollapseItem, Popup, Field, Checkbox,
} from 'vant';
import { getUserPlaylist, setUserPlaylist } from '@/api/playlist';
import MHeader from '@/components/Header'

export default {

  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Checkbox.name]: Checkbox,
    MHeader
  },
  data() {
    return {
      isAddShow: false, // 弹出新增歌单窗口
      privacy: false, // 设置隐私歌单
      playlistName: '',
      activeName: ['1'],
      list: [
        {
          title: '本地音乐',
          icon: '&#xe605',
        },
        {
          title: '最近播放',
          icon: '&#xe61c',
        },
        {
          title: '我的电台',
          icon: '&#xe606',
        },
        {
          title: '我的收藏',
          icon: '&#xe604',
        },
      ],
      myPlayList: [],
    };
  },
  created() {
    this.getUserPlaylist();
  },
  methods: {
    handleAdd() {
      this.isAddShow = true;
    },
    getUserPlaylist() {
      getUserPlaylist(this.$store.state.user.id).then(({ data }) => {
        this.myPlayList = data.playlist;
      });
    },
    handleAddComplete() {
      setUserPlaylist({
        name: this.playlistName,
        privacy: this.privacy ? '10' : null,
      }).then(({ data }) => {
        if (data.code === 200) {
          this.$toast.success('新建歌单成功');
          this.isAddShow = false;
          this.getUserPlaylist();
        }
      });
    },
  },
};
</script>

<style lang="less">
.g-my{
    .my-list {
        border-bottom: 5px solid #f7f7f7;
    }
    .iconfont {
        margin-right: 16px;
        font-size: 30px;
    }
    .van-collapse-item__content{
        padding: 0
    }
    .m-add{
        display: inline-block;
        font-size: 25px;
        color: #333;
    }

    .m-playlist{
        .van-cell{
            padding: 5px 16px;
        }
        .m-img{
            width: 40px;
            height: 40px;
            margin-right: 10px;
            border-radius: 6px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
.dialog-add{
    padding: 0 16px;
    .dialog-title{
        height: 46px;
        font-size: 16px;
        .dialog-title-left{
            color: #333;
            text-decoration: underline;
        }
        .dialog-title-middle{
            color: #333;
        }
        .dialog-title-right{
            color: #ccc;
            text-decoration: underline;
            &.active{
                color: #333;
            }
        }
    }
}
</style>
