import axios from './axios';

// 获取用户详情
export const getUserDetail = async function (data) {
  const res = await axios.get({
    url: '/user/detail',
    data
  });
  return res;
};


