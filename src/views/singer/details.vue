<template>
  <div class="g-singer-details">
    <m-header :leftText="info.name" :isOpcity="true"></m-header>
    <div class="m-header" :class="{active: isHidden}" :style="{transform: `scale(${y})`, background: `url(${info.img1v1Url}) 0 0/cover`, }"></div>
    <div class="m-scroll">
       <scroll 
        :data="playlist"
        @scroll-handler="getScroll"
        v-if="playlist.length > 0"
      >
        <play-list :playlist="playlist"></play-list>
      </scroll>
    </div>
     
  </div>
</template>

<script>
import PlayList from '@/components/PlayList'
import { getArtists } from '@/api/singer';
import Scroll from '@/components/scroll'
import MHeader from '@/components/Header'

export default {
   components: {
    MHeader,
    Scroll,
    PlayList
  },
  data(){
    return {
      y: 1,
      top: 0,
      isHidden: false,
      info: {},
      playlist: []
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getScroll(row){
      
      if(row.y > 0){
        this.y = 1 +( row.y / 100);
      }else {
        if(row.y >= -203){
          this.top = row.y;
          this.isHidden = false
        }else {
          this.top = this.top;
          this.isHidden = true
        }
      }
      console.log( this.top);
    },
    getData(){
      getArtists({
        id: this.$route.query.id
      }).then(({data}) => {
        this.info = data.artist
        this.playlist = data.hotSongs;
      })
    }
  },
}
</script>

<style lang="less" scoped>
.g-singer-details{
  position: relative;
  display: flex;
  flex-direction: column;
  .m-header{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding-top: 75%;
    height: 0px;
    transform-origin: center top;
    z-index: 9;
    &.active{
      padding-top: 0%;
      height: 45px;
      z-index: 99;
    }
  }
  .m-scroll{
    position: absolute;
    left: 0;
    top: 250px;
    bottom: 0;
    flex: 1;
    z-index: 11;
  }
}
</style>