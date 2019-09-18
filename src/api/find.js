import axios from './axios';

// 获取banner
export const getBanner = async function () {
  const res = await axios.get({
    url: '/banner',
  });
  return res;
};
// 获取推荐歌单
export const getPersonalized = async function () {
  const res = await axios.get({
    url: '/personalized',
  });
  return res;
};
// 获取每日推荐歌单
export const getRecommendResource = async function () {
  const res = await axios.get({
    url: '/recommend/resource',
  });
  return res;
};
// 获取主播电台
export const getDjprogram = async function () {
  const res = await axios.get({
    url: '/personalized/djprogram',
  });
  return res;
};
// 获取所有榜单内容摘要
export const getToplistDetail = async function () {
  const res = await axios.get({
    url: '/toplist/detail',
  });
  return res;
};

