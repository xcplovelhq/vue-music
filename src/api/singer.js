import axios from './axios';

// 获取歌手分类列表
export const getArtistList = async function (data) {
  const res = await axios.get({
    url: '/artist/list',
    data
  });
  return res;
};

// 获取歌手榜
export const getToplistArtist = async function (data) {
  const res = await axios.get({
    url: `/toplist/artist`,
    data
  });
  return res;
};

// 获取歌手单曲
export const getArtists = async function (data) {
  const res = await axios.get({
    url: `/artists`,
    data
  });
  return res;
};
