import axios from './axios';

// 获取最新音乐
export const getNewsong = async function () {
    const res = await axios.get({
      url: '/personalized/newsong',
    });
    return res;
  };

//获取音乐url
export const getSongUrl = async function(id) {
    const res = await axios.get({
        url: `/song/url?id=${id}`
    });
    return res;
};