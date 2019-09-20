import { getUserDetail } from '@/api/user';

const state = {
  id: 397132873,
  baseInfo: {}
};

const mutations = {
  setUserDetail: (state, data) => {
    state.baseInfo = data
  }
};
const actions = {
  async getUserDetailData({state, commit}){
    let res = await getUserDetail({
      uid: state.id
    }).then(({data}) => {
      if(data.code === 200){
        commit('setUserDetail', data)
        return data
      }
    })
    return res
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
