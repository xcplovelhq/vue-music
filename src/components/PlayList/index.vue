<template>
  <div class="g-song-list" ref="container">
    <!-- <van-sticky :container="container" :offset-top="46"> -->
    	<div class="m-title"><i class="iconfont i-icon"></i>播放全部<span class="m-text">(共{{playlist && playlist.length}}首)</span></div>
    <!-- </van-sticky> -->
    <van-loading color="#d33a31" style="text-align: center;padding-top: 20px" v-if="playlist && playlist.length <= 0" />
    <div class="m-list" v-else v-for="(item,idx) in playlist" :key="item.key">
    <div class="just-between" @click="handleShow(item)">
        <div class="m-num">{{ idx+1 }}</div>
        <div class="m-right just-between">
        <div class="m-text">
            <h3>{{item.name}}</h3>
            <p>{{item.ar[0].name}}-{{item.al.name}}</p>
        </div>
        <div class="m-handle"></div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import {
   Sticky, Loading,
} from 'vant';
export default {
  props:{
    playlist: Array
  },
  components: {
    [Sticky.name]: Sticky,
    [Loading.name]: Loading,
  },
	data(){
		return {
			container: null,
		}
	},
	methods: {
		 handleShow(row) {
      const data = Object.assign({}, row.al, { singer: row.ar });
      data.id = row.id;
      data.name = row.name;
      this.$store.commit('playing/setSongInfo', data);
      this.$store.commit('playing/getShowPlaying');
      this.$store.dispatch('playing/getSongUrlData');
    },
	}
}
</script>

<style lang="less" scoped>
.g-song-list{
    position: relative;
    // margin-top: -20px;
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
</style>