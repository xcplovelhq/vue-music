import { getSongUrl,getSongLyric } from '@/api/song.js';

const state = {
  isShowPlaying: false, // 是否弹出播放界面
  isPlay: false, // 是否正在播放界面
  musicUrl: '',
  info: {},
  songList: [],
  musicLyric: ''
};

const mutations = {
  getShowPlaying: (state) => {
    state.isShowPlaying = true;
  },
  getHidePlaying: (state) => {
    state.isShowPlaying = false;
  },
  setMusicUrl: (state, url) => {
    state.musicUrl = url;
  },
  setSongInfo: (state, data) => {
    state.info = data;
  },
  setSongList: (state, data) => {
    state.songList = data;
  },
  setIsPlay: (state, data) => {
    state.isPlay = data
  },
  setMusicLyric: (state, data) => {
    state.musicLyric = data
  }
};
const actions = {
  getSongUrlData: ({ state, commit }, id) => {
    getSongUrl(id || state.info.id).then(({ data }) => {
      commit('setMusicUrl', data.data[0].url);
    });
  },
  getSongLyricData: ({ state, commit }, id) => {
    getSongLyric(id || state.info.id).then(({ data }) => {
      commit('setMusicLyric', data.lrc.lyric);
    });
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
