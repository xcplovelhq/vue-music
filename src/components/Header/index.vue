<template>
  <div class="g-header" :class="{active: !isOpcity}">
    <div class="just-between" >
        <div class="m-left" @click="handleBack">
            <i class="iconfont">&#xe72a;</i>{{leftText}}
        </div>
        <div class="m-title">
            {{title}}
        </div>
        <div class="m-right">
            <div >
                <play-gif :class="{active: !isOpcity}"></play-gif>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import PlayGif from '@/components/PlayGif';

export default {
    components:{
        PlayGif
    },
    props: {
        leftText: {
            type: String,
            default: ''
        },
        rightText: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        isOpcity: {
            type: Boolean,
            default: false
        },
    },
    methods:{
        handleBack(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less" scoped>
.g-header{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 46px;
    z-index: 1000;
    transition: all .3s linear;
    .just-between{
        height: 100%;
    }
    .m-left{
        padding: 0 16px;
        font-size: 16px;
        color: #fff;
        .iconfont{
            font-size: 20px;
            color: #fff;
        }
    }
    .m-right{
        padding: 0 16px;
    }
    .m-title{
        flex: 1;
        font-size: 16px;
        color: #fff;
        text-align: center;
    }
    &.active{
        background: #fff;
        .m-left{
            .iconfont{
                color: #333;
            }
        }
        .m-title{
            color: #333;
        }
        .m-right{
            span{
                color: #333;    
            }
        }
    }
}
</style>