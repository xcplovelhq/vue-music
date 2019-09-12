import Vue from 'vue';
import Router from 'vue-router';

const Home = resolve => require(['@/views/home.vue'], resolve);
// 发现
const Find = resolve => require(['@/views/find/index'], resolve);
const Ranking = resolve => require(['@/views/find/ranking'], resolve);
const My = resolve => require(['@/views/my/index'], resolve);
const Account = resolve => require(['@/views/account/index'], resolve);

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
            title: '发现',
            keepAlive: true,
          },
        },
        {
          path: '/account',
          name: 'account',
          component: Account,
          meta: {
            title: '发现',
            keepAlive: true,
          },
        },
      ],
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
});
