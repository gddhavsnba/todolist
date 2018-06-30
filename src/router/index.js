import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login //原先为index
    },
    {
      path: '/todolist',
      component: index
    }
  ]
})
