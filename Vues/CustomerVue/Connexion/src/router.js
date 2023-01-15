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
            component: () => import('./App.vue'),
            props: () => ({
                showLogin: 'false',
                showNavBar : 'true',
                showBanner : 'true',
                showRestaurants : 'true',
                showResearchRestaurant: 'true',
            })
        },
        {
            path: '/order',
            name: 'order',
            component: () => import('./App.vue'),
            props: () => ({
                showOrders: 'true',
                showNavBar : 'true',
                showBanner : 'true',
            })
        },
        {
            path: '/profile',
            name: 'profile',
            // lazy-loaded
            component: () => import('./App.vue'),
            props: () => ({
                showProfile: 'true',
                showNavBar : 'true',
                showBanner : 'true',
                showLabelProfile : 'true',
            })
        }
    ]
});