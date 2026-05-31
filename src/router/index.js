import AuthView from '../views/AUTH.vue'
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/Dashboard.vue'
import TodoView from '../views/Todo.vue'

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

        path: '/todo',
        name: 'todo',
        component: TodoView

  }
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router