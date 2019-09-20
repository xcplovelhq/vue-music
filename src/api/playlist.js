import axios from './axios';

// 获取歌单详情
export const getPlaylistDetail = async function (id) {
  const res = await axios.get({
    url: `/playlist/detail?id=${id}`,
  });
  return res;
};
// 获取用户歌单
export const getUserPlaylist = async function (id) {
  const res = await axios.get({
    url: `/user/playlist?uid=${id}`,
  });
  return res;
};
// 新增用户歌单
export const setUserPlaylist = async function (data) {
  const res = await axios.get({
    url: '/playlist/create',
    data,
  });
  return res;
};
// 获取所有榜单
export const getToplist = async function (data) {
  const res = await axios.get({
    url: '/toplist',
    data,
  });
  return res;
};
// 获取所有榜单摘要
export const getToplistDetail = async function (data) {
  const res = await axios.get({
    url: '/toplist/detail',
    data,
  });
  return res;
};
// 获取对应排行榜
export const getToplistIdx = async function (data) {
  const res = await axios.get({
    url: '/top/list',
    data,
  });
  return res;
};
