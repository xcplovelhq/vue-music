import axios from './axios';

//获取歌单详情
export const getPlaylistDetail = async function(id) {
    const res = await axios.get({
        url: `/playlist/detail?id=${id}`
    });
    return res;
};
//获取用户歌单
export const getUserPlaylist = async function(id) {
    const res = await axios.get({
        url: `/user/playlist?uid=${id}`
    });
    return res;
};
// 新增用户歌单
export const setUserPlaylist = async function(data) {
    const res = await axios.get({
        url: `/playlist/create`,
        data: data
    });
    return res;
};
 
 