import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home/Home.vue'
import AppLayout from '../layouts/AppLayout.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../pages/about/About.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '../pages/auth/LoginPage.vue')
      }
    ]
  },
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "about" */ '../pages/dashboard/Dashboard.vue')
      },
      {
        path: '/companies',
        name: 'Companies',
        component: () => import(/* webpackChunkName: "about" */ '../pages/company/Index.vue')
      },
      {
        path: '/companies/add',
        name: 'Add Company',
        component: () => import(/* webpackChunkName: "about" */ '../pages/company/Add.vue')
      },
      {
        path: '/companies/:id/edit',
        name: 'Edit Company',
        component: () => import(/* webpackChunkName: "about" */ '../pages/company/Edit.vue')
      }
    ]
  }
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // Protect pages that require auth
  const publicPages = ['/login', '/', '/about']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  if(to.path == '/login' && loggedIn){
    return next('/')
  }

  next()
})

export default router
