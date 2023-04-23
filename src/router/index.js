import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '@/store/index';
import LoginView from '../views/LoginApp.vue';
import CreateColaboradorApp from '../views/colaboradores/CreateColaboradorApp.vue';
import IndexColaboradorApp from '../views/colaboradores/IndexColaboradorApp.vue';
import IndexProductoApp from '../views/productos/IndexProductoApp.vue';
import CreateProductoApp from '../views/productos/CreateProductoApp.vue';
import EditProductoApp from '../views/productos/EditProductoApp.vue';
import jwt_decore from 'jwt-decode'


Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'login', component: LoginView, meta: { requiresAuth: false } },
  { path: '/colaborador', name: 'colaborador-index', component: IndexColaboradorApp, meta: { requiresAuth: true } },
  { path: '/colaborador/create', name: 'colaborador-create', component: CreateColaboradorApp, meta: { requiresAuth: true } },
  { path: '/colaborador/edit/:id', name: 'colaborador-edit', component: () => import('@/views/colaboradores/EditColaboradorApp.vue'), meta: { requiresAuth: true } },
  { path: '/dashboard', name: 'dashboard', component: () => import('@/views/DashboarApp.vue'), meta: { requiresAuth: true } },
  // { path: '/about', name: 'about' }


  // CreateProductoApp
  { path: '/producto', name: 'producto-index', component: IndexProductoApp, meta: { requiresAuth: true } },
  { path: '/producto/create', name: 'producto-create', component: CreateProductoApp, meta: { requiresAuth: true } },
  { path: '/producto/edit/:id', name: 'producto-edit', component: EditProductoApp, meta: { requiresAuth: true } },

  //Ingresos
  { path: '/ingreso/create', name: 'ingreso-create', component: ()=> import('@/views/ingreso/CreateIngresoApp.vue'), meta: { requiresAuth: true } },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(item => item.meta.requiresAuth)) {
    if (!Store.state.token) {
      next({
        name: 'login'
      })
    }
    try {
      jwt_decore(Store.state.token)
    } catch (error) {
      next({
        name: 'login'
      })
    }
      
      if (jwt_decore(Store.state.token).exp*1000<= new Date().getTime()) {
        next({
          name: 'login'
        })
    }
    next();
    // console.log(jwt_decore(Store.state.token));
    console.log('Ruta privada');
  } else {
    console.log('Ruta publica');
    next();
  }

})

export default router
