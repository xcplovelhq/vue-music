<template>
  <router-layout>
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      slot="header"
    />
    <div class="g-song-sheet">
        <div class="g-song-name">
          <div
            class="m-name-bg"
            :style="{backgroundImage: `url(${detailsInfo.coverImgUrl})`}"
          >
          </div>
          <div class="m-name" @click="show = true">
            <div class="m-img">
              <img :src="detailsInfo.coverImgUrl"><span class="m-icon">歌单</span>
              <play-count :playCount="detailsInfo.playCount"></play-count>
            </div>
            <div class="m-text">
              <h3>{{detailsInfo.name}}</h3>
              <div class="m-user">
                <a href="/">
                  <avata :ImgUrl="detailsInfo.creator && detailsInfo.creator.avatarUrl || ''" Size="30" />
                  <span style="margin-left: 5px;">{{detailsInfo.creator && detailsInfo.creator.nickname}}</span>
                </a>
              </div>
              <div class="m-tips">
                {{detailsInfo.description}}
              </div>
            </div>
          </div>
        </div>
        <play-list :playlist="playlist"></play-list>
      <van-popup v-model="show" :style="{ width: '100%', height: '100%' }">
        <song-model :detailsInfo="detailsInfo" @handle-close="show = false"></song-model>
      </van-popup>
    </div>
  </router-layout>
</template>

<script>
import {
  NavBar, Popup, Sticky, Loading,
} from 'vant';
import { getPlaylistDetail } from '@/api/playlist';
import PlayCount from '@/components/PlayCount';
import Avata from '@/components/Avata';
import SongModel from './components/song-model';
import PlayList from '@/components/PlayList';
export default {
  components: {
    [NavBar.name]: NavBar,
    [Popup.name]: Popup,
    [Sticky.name]: Sticky,
    [Loading.name]: Loading,
    PlayCount,
    Avata,
    SongModel,
    PlayList
  },
  data() {
    return {
      detailsInfo: {},
      playlist: [],
      show: false,
      container: null,
    };
  },
  created() {
    this.getPlaylistDetail();
  },
  methods: {
    getPlaylistDetail() {
      getPlaylistDetail(this.$route.query.id).then(({ data }) => {
        this.detailsInfo = data.playlist;
        this.playlist = data.playlist.tracks;
      });
    },
    handleShow(row) {
      const data = Object.assign({}, row.al, { singer: row.ar });
      data.id = row.id;
      data.name = row.name;
      this.$store.commit('playing/setSongInfo', data);
      this.$store.commit('playing/getShowPlaying');
      this.$store.dispatch('playing/getSongUrlData');
    },
  },
};
</script>
<style lang="less" scoped>
.g-song-sheet {
  .g-song-name{
    position: relative;
    padding: 30px 10px 30px 15px;
    .m-name-bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        filter: blur(20px);
        z-index: 0;
    }
    .m-name{
        display: flex;
        position: relative;
        z-index: 2;
        .m-img{
            position: relative;
            width: 145px;
            height: 145px;
            img{
                width: 100%;
                height: 100%;
            }
            .m-icon{
                position: absolute;
                z-index: 3;
                top: 10px;
                left: 0;
                padding: 0 8px;
                height: 17px;
                color: #fff;
                font-size: 9px;
                font-weight: bold;
                text-align: center;
                line-height: 17px;
                background-color: rgba(217,48,48,.8);
                border-top-right-radius: 17px;
                border-bottom-right-radius: 17px;
            }
        }
        .m-text{
            margin-left: 16px;
            flex:1;
            h3{
                margin: 0;
                padding-top: 1px;
                font-size: 17px;
                line-height: 1.3;
                color: #fefefe;
                height: 44px;
                display: -webkit-box;
            }
            .m-user{
                position: relative;
                margin-top: 20px;
                a{
                    display: flex;
                    align-items: center;
                }
                span{
                    font-size: 16px;
                    color: hsla(0,0%,100%,.7);
                    vertical-align: top;
                }
            }
        }
        .m-tips{
          margin-top: 20px;
          overflow:hidden;
          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
          font-size: 12px;
          color: #fff;
          opacity: 0.8;
        }
    }
  }
  .g-song-list{
    position: relative;
    margin-top: -20px;
    .m-title{
        display: flex;
        height: 50px;
        align-items: center;
        font-size: 16px;
        color: #333;
        border-radius: 15px 15px 0 0;
        background: #fff;
        border-bottom: 1px solid rgba(0,0,0,.1);
        .m-text{
            font-size: 12px;
            color: #888;
            h3{
              font-weight: 400;
            }
        }
        .i-icon{
            display: inline-block;
            width: 40px;
            font-size: 20px;
            text-align: center;
        }
    }
    .m-list{
        height: 55px;
        background: #fff;
        .m-num{
            width: 40px;
            text-align: center;
            font-size: 17px;
            color:#999;
        }
        .m-right{
            flex: 1;
            height: 100%;
            padding: 6px 0;
            border-bottom: 1px solid rgba(0,0,0,.1);
            .m-text{
                h3{
                    margin: 0;
                    font-size: 17px;
                    line-height: 25px;
                    color: #555;
                    font-weight: 500;
                    width: 335px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                p{
                    margin: 0;
                    font-size: 12px;
                    color: #888;
                    line-height: 18px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:1;
                }
            }
        }
    }
  }
}
</style>
