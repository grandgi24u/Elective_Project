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
            component: Login,
        },
        {
            path: '/restaurants',
            name: 'restaurants',
            component: () => import('./views/Restaurants.vue'),
        },
        {
            path: '/order',
            name: 'order',
            component: () => import('./views/Orders.vue'),
            props: () => ({
                showOrders: 'true',
                showNavBar : 'true',
                showBanner : 'true',
            })
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('./views/Profile.vue'),
            props: () => ({
                showLabelProfile : 'true',
            })
        },
        {
            path: '/menu',
            name: 'menu',
            component: () => import('./views/Details-restaurants.vue'),
            props: () => ({
                showResearchItems: 'true',
            })
        },
        {
            path: '/details',
            name: 'details',
            component: () => import('./views/Details-items.vue'),
        },
        {
            path: '/validcommande',
            name: 'validcommande',
            component: () => import('./views/Details-hamper.vue'),
        },
        {
            path: '/ordernow',
            name: 'ordernow',
            component: () => import('./views/Order-now.vue'),
        }
    ]
});