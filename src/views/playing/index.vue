<template>
  <div
    class="g-playing"
    style="">
		<van-nav-bar
			title="标题"
			left-arrow
			:z-index="5"
			@click-left="handleBack"
		>
			<div slot="title" class="m-header-title">
				<h3>{{info.name}}</h3>
				<div class="m-singer">
					<router-link to="/" v-for="(item,idx) in info.singer" :key="item.key">{{item.name}}{{(idx < info.singer.length - 1)  ? '/' : ''}}</router-link><van-icon name="arrow" />
				</div>
			</div>
		</van-nav-bar>
    <div
      class="m-playing-bg"
      :style="{backgroundImage: `url(${info.picUrl})`}"
			v-lazy:background-image="info.picUrl">
    </div>
    <div class="m-playing-black-bg">
    </div>
    <div
      class="m-needle"
      :style="{ transform: `rotate(${playing ? 0 : -20}deg)` }">
    </div>
    <div class="m-song">
      <div class="m-song-circle">
        <div
          id="circle"
          :class="`m-black-circle z-rotate ${!playing && 'z-norotate'}`">
          <div class="m-img">
            <img :src="info.picUrl" v-lazy="info.picUrl">
          </div>
        </div>
      </div>
    </div>
    <div class="m-audio audio-wrapper">
      <div class="m-audio-box">
        <div class="m-text">
          <span>{{format(duration * played)}}</span>
        </div>
        <div class="m-range">
          <input
            type="range"
            min="0"
            max="1"
            step="any"
            value="0"
						@change="handleChange"
            style="width: 100%;">
        </div>
        <div class="m-text m-right">
          <span>{{format(duration)}}</span>
        </div>
      </div>
      <div
        style="width: 0; height: 0;">
        <audio
					ref="audio"
					@canplay="getDuration"
          :src="getMusicUrl"
          preload="auto"
					@timeupdate="handleTimeupdate"
          style="width: 100%; height: 100%;"
        ></audio>
      </div>
      <div class="m-playing">
        <div class="">
          <i class="iconfont" @click="handlecurrent">&#xe72a;</i>
        </div>
        <div class="" @click="handlePlay">
          <i class="iconfont" v-if="playing">&#xe769;</i>
          <i class="iconfont" v-else>&#xe768;</i>
        </div>
        <div class="" @click="handleNext">
          <i class="iconfont">&#xe72b;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar,Icon } from 'vant';
export default {
	data(){
		return {
			playing: false,
			played: 0,
			duration: 0,
			audio: null
		}
	},
	
	components: {
		[NavBar.name]: NavBar,
    [Icon.name]: Icon,
	},
	computed:{
		getMusicUrl(){
			return this.$store.state.playing.musicUrl
		},
		info(){
			return this.$store.state.playing.info
		}
	},
	mounted(){
		this.$nextTick(() => {
			this.audio = this.$refs.audio;
		})
	},
	methods:{
		handleBack(){
			this.$store.commit('playing/getHidePlaying')
		},
		getDuration(e){
			this.duration = this.audio.duration;
		},
		handleChange(e){
			this.played = parseFloat(e.target.value)
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
        return ('0' + string).slice(-2);
		},
		handleTimeupdate(row){
			console.log(row);
			
		},
		handlecurrent(){
			
		},
		handlePlay(){
			if(this.playing){
				this.playing = false;
				this.audio.pause()
			}else {
				this.playing = true;
				this.audio.play()
			}

		},
		handleNext(){

		},
		
	}
};
</script>

<style lang="less" scoped>
.g-playing{
	.van-nav-bar{
		display: flex;
    align-items: center;
		background: transparent;
		.van-icon{
			color: #fff;
		}
	}
	.m-header-title{
		color: #fff;
		h3{
			font-size: 14px;
			line-height: 1;
		}
		.m-singer{
			line-height: 1;
			a{
				font-size: 12px;
				line-height: 1.2;
				text-decoration: underline;
			}
		}
	}
	.m-playing-bg{
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
	.m-playing-black-bg{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5);
			z-index: 3;
	}
	.m-song{
		padding-top: 100px;
	}
	.m-needle{
			position: absolute;
			left: 50%;
			top: 50px;
			width: 110px;
			height: 157px;
			margin-left: -55px;
			background: url('~@/assets/needle-plus.png') no-repeat;
			background-size: 100% 100%;
			z-index: 100;
			transition: .3s linear;
			
			transform-origin: 0 0;
	}
	.m-song-circle{
			position: relative;
			width: 296px;
			height: 296px;
			margin: 0 auto;
			background: rgba(255,255,255, 0.1);
			border-radius: 50%;
			z-index: 4;
			.m-black-circle{
					width: 298px;
					height: 298px;
					display: flex;
					align-items: center;
					justify-content: center;
					background: url('~@/assets/disc.png') no-repeat;
					background-size: 100% 100%;
					&.z-rotate{
							animation: circleRotate 20s infinite linear;
							animation-play-state:running;
					}
					&.z-norotate{
							animation-play-state: paused;
					}
					.m-img{
							width: 200px;
							height: 200px;
							border-radius: 50%;
							overflow: hidden;
					}
			}
	}
	.m-audio{
			position: absolute;
			left: 0;
			bottom: 0;
			padding: 0 20px 40px;
			width: 100%;
			z-index: 3;
			.m-audio-box{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.m-range{
							flex: 1;
							margin: 0 10px;
					}
					.m-text{
							font-size: 12px;
							color: #fff;
					}
					.m-right{
							color: rgba(255,255,255,0.5)
					}
			}
			.m-playing{
					display: flex;
					justify-content: space-around;
					margin-top: 40px;
					.iconfont{
							font-size: 40px;
							color: #fff;
					}
			}
	}
}
@keyframes circleRotate{
	0%{
			transform: rotate(0)
	}
	100%{
			transform: rotate(1turn)
	}
}
</style>