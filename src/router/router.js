import Vue from 'vue';
import Router from 'vue-router';

const Home = resolve => require(['@/views/home.vue'], resolve);
// 发现
const Find = resolve => require(['@/views/find/index'], resolve);
const Ranking = resolve => require(['@/views/ranking/index'], resolve);
const My = resolve => require(['@/views/my/index'], resolve);
const Singer = resolve => require(['@/views/singer/index'], resolve);
const SongDetails = resolve => require(['@/views/singer/details'], resolve);
const SongSheet = resolve => require(['@/views/song-sheet/index'], resolve);
const Playing = resolve => require(['@/views/playing/index'], resolve);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/find',
      children: [
        {
          path: '/find',
          name: 'find',
          component: Find,
          meta: {
            title: '发现',
            keepAlive: true,
          },
        },

        {
          path: '/my',
          name: 'my',
          component: My,
          meta: {
            title: '我的',
            keepAlive: true,
          },
        },
        {
          path: '/singer',
          name: 'singer',
          component: Singer,
          meta: {
            title: '歌手',
            keepAlive: true,
          },
        },
        {
          path: '/ranking',
          name: 'ranking',
          component: Ranking,
          meta: {
            title: '排行榜',
            keepAlive: true,
          },
        },
      ],
    },
    {
      path: '/singer-details',
      name: 'songDetails',
      component: SongDetails,
      meta: {
        title: '歌手详情',
        keepAlive: false,
      },
    },
    {
      path: '/song-sheet',
      name: 'songSheet',
      component: SongSheet,
      meta: {
        title: '歌单',
        keepAlive: false,
      },
    },
    {
      path: '/playing',
      name: 'playing',
      component: Playing,
      meta: {
        title: '播放',
        keepAlive: false,
      },
    },
  ],
});
