import {getSongUrl} from '@/api/song.js'

const state = {
    isShowPlaying: false,
    musicUrl: '',
    info: {}
}

const mutations = {
    getShowPlaying: state =>{
        state.isShowPlaying = true;
    },
    getHidePlaying: state =>{
        state.isShowPlaying = false;
    },
    setMusicUrl: (state,url) => {
        state.musicUrl = url
    },
    setSongInfo: (state, data) => {
        state.info = data
    }
}
const actions = {
    getSongUrlData: ({state,commit},id) => {
        getSongUrl(id || state.info.id).then(({data}) => {
            console.log(data.data[0].url);
            
            commit('setMusicUrl',data.data[0].url)
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}