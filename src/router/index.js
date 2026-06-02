import AuthView from '../views/AUTH.vue'
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/Dashboard.vue'
import SignupView from '../views/Signup.vue'
import LoginView from '../views/Login.vue'

const routes = [
    {
        path: '/auth',
        name: 'auth',
        component: AuthView
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView
    },
    {
        path: '/signup',
        component: SignupView
    },
    { path: '/login',
    component: LoginView },
  
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router