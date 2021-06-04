import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login';
import Index from "../components/Index";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/ ',
      name: 'Main',
      component: Index,
    },
  ],
});
