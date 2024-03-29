import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home/Home.vue'
import AppLayout from '../layouts/AppLayout.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import authBootstrap from '../helpers/auth-bootstrap'

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
        component: () => import(/* webpackChunkName: "login" */ '../pages/auth/LoginPage.vue')
      },
      {
        path: '/sign-up',
        name: 'Sign up',
        component: () => import(/* webpackChunkName: "signup" */ '../pages/auth/SignUpPage.vue')
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
      },
      {
        path: '/companies/find-by-isin',
        name: 'Find Company by ISIN',
        component: () => import(/* webpackChunkName: "about" */ '../pages/company/ViewByISIN.vue')
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
  const publicPages = ['/login','/sign-up', '/', '/about']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  const loggingOut = localStorage.getItem('loggingOut')

  authBootstrap.init()

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  if((to.path == '/login' || to.path == '/sign-up') && (loggedIn && !loggingOut)){
    return next('/')
  }

  next()
})

export default router
