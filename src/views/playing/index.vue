<template>
  <div
    class="g-playing"
    style=""
  >
    <van-nav-bar
      title="标题"
      left-arrow
      :z-index="5"
      @click-left="handleBack"
    >
      <div
        slot="title"
        class="m-header-title"
      >
        <h3>{{info.name}}</h3>
        <div class="m-singer">
          <a
            @click="goSinger(item)"
            v-for="(item,idx) in info.singer"
            :key="item.key"
          >
          {{item.name}}{{(idx < info.singer.length - 1)  ? '/' : ''}}
          </a>
          <van-icon name="arrow" />
        </div>
      </div>
    </van-nav-bar>
    <div
      class="m-playing-bg"
      :style="{backgroundImage: `url(${info.picUrl})`}"
      v-lazy:background-image="info.picUrl"
    >
    </div>
    <div class="m-playing-black-bg">
    </div>
    <!-- <div
      class="m-needle"
      :style="{ transform: `rotate(${playing ? 0 : -20}deg)` }">
    </div> -->
    <div class="m-song" >
      <div class="m-song-circle" @click="handleChangeLyric" v-show="!isShowLyric">
        <div
          id="circle"
          :class="`m-black-circle z-rotate ${!playing && 'z-norotate'}`"
        >
          <div class="m-img">
            <img
              :src="info.picUrl"
              v-lazy="info.picUrl"
            >
          </div>
        </div>
      </div>
      <div class="m-song-lyric" @click="handleChangeLyric" v-show="isShowLyric">
        <ul>
          <li v-for="item in getMusicLyric" :key="item.key" v-if="!!item" class="active">{{item}}</li>
        </ul>
      </div>
      {{getMusicLyricTime}}

    </div>
    <div class="m-audio audio-wrapper">
      <div class="m-audio-box">
        <div class="m-text">
          <span>{{format(duration * played)}}</span>
        </div>
        <div class="m-range">
          <input
            v-model="played"
            type="range"
            min="0"
            max="1"
            ref="input"
            step="any"
            value="0"
            @touchstart="handleMousedown"
            @touchend="handleMouseUp"
            @change="handleChange"
            style="width: 100%;"
          >
        </div>
        <div class="m-text m-right">
          <span>{{format(duration)}}</span>
        </div>
      </div>
      <div style="width: 0; height: 0;">
        <audio
          ref="audio"
          :src="getMusicUrl"
          :autoplay="playing"
          preload="auto"
          @canplay="getDuration"
          @timeupdate="getTimeupdate"
          @ended="getEnded"
          style="width: 100%; height: 100%;"
        ></audio>
      </div>
      <div class="m-playing">
        <div class="">
          <i
            class="iconfont"
            @click="handleModel"
            v-html="modelIcon[modelNum].icon"
          ></i>
        </div>
        <div class="">
          <i
            class="iconfont"
            @click="handleChangePlay('current')"
          >&#xe72a;</i>
        </div>
        <div
          class="m-play"
          @click="handlePlay"
        >
          <i
            class="iconfont"
            v-if="playing"
          >&#xe769;</i>
          <i
            class="iconfont"
            v-else
          >&#xe768;</i>
        </div>
        <div
          class=""
          @click="handleChangePlay('next')"
        >
          <i class="iconfont">&#xe72b;</i>
        </div>
        <div
          class=""
          @click="handleShowList"
        >
          <i class="iconfont">&#xe634;</i>
        </div>
      </div>
    </div>
    <van-popup
      v-model="isShowList"
      round
      position="bottom"
      :style="{ height: '60%' }"
    >
      <div class="m-play-title">
        <div class="m-left">
          列表循环（{{getSongList.length}}）
        </div>
      </div>
      <div class="m-play-list" ref="playList">
          <ul>
            <li
              v-for="item in getSongList"
              :key="item.key"
              :class="{active: item.id === info.id}"
              :ref="item.id === info.id ? 'playItem' : null"
              @click="handleSong(item)"
            >
              <div class="m-name">
                {{item.name}}-{{item.ar[0].name}}
              </div>
              <div class="m-close">
                <van-icon name="cross" />
              </div>
            </li>
          </ul>
      </div>
      <van-button
        style="position: absolute; bottom: 0"
        size="large"
        @click="isShowList = false"
      >关闭</van-button>
    </van-popup>
  </div>
</template>

<script>
import { NavBar, Icon, Popup, Button } from "vant";
import Scroll from "@/components/scroll";

export default {
  data() {
    return {
      seeking: false,
      played: 0,
      duration: 0,
      audio: null,
      input: null,
      currentTime: 0,
      isShowList: false,
      modelNum: 2,
      randomList: [],
      isRandom: true,
      isShowLyric: false,
      pattern: /\[\d{2}:\d{2}\.\d{3}\]/g,
      modelIcon: [
        {
          icon: '&#xe66c;',
          text: '列表循环'
        },
        {
          icon: '&#xe66d;',
          text: '单曲循环'
        },
        {
          icon: '&#xe66b;',
          text: '随机播放'
        }]
    };
  },

  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Button.name]: Button,
    Scroll
  },
  computed: {
    getMusicUrl() {
      return this.$store.state.playing.musicUrl;
    },
    getMusicLyric() {
      let lyric = this.$store.state.playing.musicLyric;
      let arr = lyric.replace(this.pattern,',')
      return arr.split(',');
    },
    getMusicLyricTime() {
      let lyric = this.$store.state.playing.musicLyric;
      let arr = lyric.match(this.pattern)
      
      return arr;
    },
    info() {
      return this.$store.state.playing.info;
    },
    getSongList() {
      return this.$store.state.playing.songList;
    },
    playing(){
      if (this.$store.state.playing.isPlay) {
        this.audio && this.audio.play();
      } else {
        this.audio && this.audio.pause();
      }
      return this.$store.state.playing.isPlay
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.audio = this.$refs.audio;
      this.input = this.$refs.input;
      this.input.onMouseDown = function() {
        console.log("4141312");
      };
      this.getRandomList();
    });

  },
  methods: {
    goSinger(item){
      this.$store.commit('playing/getHidePlaying')
      this.$router.push({name: 'singerDetails', query:{id: item.id}})
    },
    handleMousedown(e) {
      this.seeking = true;
    },
    handleMouseUp(e) {
      this.seeking = false;
      this.player = parseFloat(e.target.value);
    },
    getEnded(e) {
      this.handleChangePlay('next')
    },
    handleBack() {
      this.$store.commit("playing/getHidePlaying");
    },
    getDuration(e) {
      this.duration = this.audio.duration;
    },
    // 滑动播放位置触发
    handleChange(e) {
      this.audio.currentTime = this.duration * +e.target.value;
      this.played = parseFloat(e.target.value);
    },
    handleChangeLyric(){
      this.isShowLyric = !this.isShowLyric;
    },
    format(seconds) {
      const date = new Date(seconds * 1000);
      const hh = date.getUTCHours();
      const mm = date.getUTCMinutes();
      const ss = this.pad(date.getUTCSeconds());
      if (hh) {
        return `${hh}:${this.pad(mm)}:${ss}`;
      }
      return `${mm}:${ss}`;
    },
    pad(string) {
      return `0${string}`.slice(-2);
    },
    getTimeupdate(row) {
      if (!this.seeking) {
        this.played = row.target.currentTime
          ? row.target.currentTime / this.duration
          : 0;
      }
    },
    //切换播放模式
    handleModel(){
      this.modelNum++;
      if(this.modelNum > 2){
        this.modelNum = 0;
      }
      this.getRandomList();
      this.$toast(this.modelIcon[this.modelNum].text);
    },
    // 获取随机播放的列表
    getRandomList(){
      if(this.modelNum === 2){
        this.getSongList.forEach((item,idx) => {
          this.randomList.push(idx)
        })
      }
      this.randomList.sort((a,b) => {
        return Math.random()>.5 ? -1 : 1;
      })
    },
    // 展示歌单列表
    handleShowList(){
      this.isShowList = true;
      this.$nextTick(() => {
        this.$refs.playList && this.$refs.playItem &&  (this.$refs.playList.scrollTop = (this.$refs.playItem[0].offsetTop - 150));
      })
    },
    // 选中歌曲
    handleSong(row, isPlay){
      const data = Object.assign({}, row.al, { singer: row.ar });
      data.id = row.id;
      data.name = row.name;
      this.isShowList = false;
      this.$store.commit('playing/setSongInfo', data);
      this.$store.dispatch('playing/getSongUrlData');
      this.$store.dispatch('playing/getSongLyricData');
      this.$store.commit('playing/setIsPlay', true)
    },
    // 播放切换
    handleChangePlay(type) {
      let index = 0;
      this.getSongList.forEach((item,idx) => {
        if(item.id === this.info.id){
          switch (type) {
            case 'next':
              if(this.modelNum != 2){
                if(idx === this.getSongList.length -1){
                  index = 0
                }else {
                  index = idx + 1
                }
              }else {
                if(this.randomList.indexOf(idx) === this.randomList.length - 1){
                  index = this.randomList[0];
                }else {
                  index = this.randomList[this.randomList.indexOf(idx) + 1]
                }
              }
              break;
            case 'current':
              if(this.modelNum != 2){
                if(idx === 0){
                  index = this.getSongList.length - 1
                }else {
                  index = idx - 1
                }
              }else {
                if(this.randomList.indexOf(idx) === 0){
                  index = this.randomList[this.randomList.length - 1];
                }else {
                  index = this.randomList[this.randomList.indexOf(idx) - 1];
                }
              }
              break;
          }
        }
      })
      this.handleSong(this.getSongList[index])
    },
    // 播放暂停
    handlePlay() {
      if (this.playing) {
        this.$store.commit('playing/setIsPlay', false)
      } else {
        this.$store.commit('playing/setIsPlay', true)
      }
    },
  }
};
</script>

<style lang="less" scoped>
.g-playing {
  .van-nav-bar {
    display: flex;
    align-items: center;
    background: transparent;
    .van-icon {
      color: #fff;
    }
  }
  .m-header-title {
    color: #fff;
    h3 {
      font-size: 14px;
      line-height: 1;
    }
    .m-singer {
      line-height: 1;
      a {
        font-size: 12px;
        line-height: 1.2;
        text-decoration: underline;
      }
    }
  }
  .m-playing-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(20px);
    z-index: 1;
  }
  .m-playing-black-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3;
  }
  .m-song {
    position: absolute;
    left: 0;
    top: 70px;
    width: 100%;
    height: 400px;
    z-index: 4;
  }
  .m-needle {
    position: absolute;
    left: 50%;
    top: 50px;
    width: 110px;
    height: 157px;
    margin-left: -55px;
    background: url("~@/assets/needle-plus.png") no-repeat;
    background-size: 100% 100%;
    z-index: 100;
    transition: 0.3s linear;

    transform-origin: 0 0;
  }
  .m-song-circle {
    position: relative;
    width: 296px;
    height: 296px;
    margin: 60px auto 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    z-index: 4;
    .m-black-circle {
      width: 298px;
      height: 298px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url("~@/assets/disc.png") no-repeat;
      background-size: 100% 100%;
      &.z-rotate {
        animation: circleRotate 20s infinite linear;
        animation-play-state: running;
      }
      &.z-norotate {
        animation-play-state: paused;
      }
      .m-img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
  }
  .m-song-lyric{
    display: flex;
    height: 400px;
    width: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    ul{
      width: 100%;
    }
    li{
      width: 100%;
      font-size: 14px;
      color: #ccc;
      padding: 10px 0;
      text-align: center;
      transition: .3s all linear;
      &.active{
        color: #fff;
      }
    }
  }
  .m-audio {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 20px 40px;
    width: 100%;
    z-index: 3;
    .m-audio-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .m-range {
        flex: 1;
        margin: 0 10px;
      }
      .m-text {
        font-size: 12px;
        color: #fff;
      }
      .m-right {
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .m-playing {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 40px;
      .m-play{
        .iconfont {
          font-size: 50px;
        }
      }
      .iconfont {
        font-size: 26px;
        color: #fff;
      }
    }
  }
  .m-play-title{
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 16px;
    border-bottom: 1px solid #f1f1f1;

  }
  .m-play-list {
    display: flex;
    width: 100%;
    height: 320px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    ul{
      width: 100%;
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid #f7f7f7;
      padding: 0 16px 0 0;
      margin-left: 16px;
      font-size: 14px;
      color: #333;
      &.active{
        color: #d33a31;
      }
    }
  }
}
@keyframes circleRotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
</style>
