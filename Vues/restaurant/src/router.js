import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/profile',
            name: 'profile',
            // lazy-loaded
            component: () => import('./views/Profile.vue')
        },
        {
            path: '/menu',
            name: 'menu',
            // lazy-loaded
            component: () => import('./views/Menu.vue')
        },
        {
            path: '/order',
            name: 'order',
            // lazy-loaded
            component: () => import('./views/Order.vue')
        },
        {
            path: '/log',
            name: 'log',
            // lazy-loaded
            component: () => import('./views/Log.vue')
        }

    ]
});