import AuthOrder from '../services/auth.order';

const initialState = {order:null}

export const orderModule = {
    namespaced: true,
    state: initialState,
    actions: {
        register({ commit }, order) {
            return AuthOrder.register(order).then(
                response => {
                    commit('registerSuccess', response);
                    return Promise.resolve(response);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        },
        registerMenu({ commit }, order) {
            return AuthOrder.registerMenu(order).then(
                response => {
                    commit('addMenuSuccess', response);
                    return Promise.resolve(response);
                },
                error => {
                    commit('addMenuFailure', error);
                    return Promise.reject(error);
                }
            );
        },
        deleteMenu({ commit }, order) {
            return AuthOrder.deleteMenu(order).then(
                response => {
                    commit('deleteMenuSuccess', order.menuId);
                    return Promise.resolve(response);
                },
                error => {
                    commit('deleteMenuFailure', error);
                    return Promise.reject(error);
                }
            );
        },
        registerItem({ commit }, order) {
            return AuthOrder.registerItem(order).then(
                response => {
                    commit('addItemSuccess', response);
                    return Promise.resolve(response);
                },
                error => {
                    commit('addItemFailure', error);
                    return Promise.reject(error);
                }
            );
        },
        deleteItem({ commit }, order) {
            return AuthOrder.deleteItem(order).then(
                response => {
                    commit('deleteItemSuccess', order.menuId);
                    return Promise.resolve(response);
                },
                error => {
                    commit('deleteItemFailure', error);
                    return Promise.reject(error);
                }
            );
        },
        registerItemOptionnel({ commit }, order) {
            return AuthOrder.registerItemOptionnel(order).then(
                response => {
                    commit('addItemOptionnelSuccess', response);
                    return Promise.resolve(response);
                },
                error => {
                    commit('addItemOptionnelFailure', error);
                    return Promise.reject(error);
                }
            );
        },
        deleteItemOptionnel({ commit }, order) {
            return AuthOrder.deleteItemOptionnel(order).then(
                response => {
                    commit('deleteItemOptionnelSuccess', order.menuId);
                    return Promise.resolve(response);
                },
                error => {
                    commit('deleteItemOptionnelFailure', error);
                    return Promise.reject(error);
                }
            );
        },
        validationOrder({ commit }, order) {
            return AuthOrder.validationOrder(order).then(
                response => {
                    commit('validationOrderSuccess', order.orderId);
                    return Promise.resolve(response);
                },
                error => {
                    commit('validationOrderFailure', error);
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        registerSuccess(state, order) {
           state.order = order;
        },
        registerFailure(state) {
            state.order = null;
        },
        addMenuSuccess(state, order) {
            state.order.id_menus = order.id_menus;
        },
        addMenuFailure(state) {
            console.log(state);
        },
        deleteMenuSuccess(state, order) {
            state.order.id_menus.splice(state.order.id_menus.indexOf(order),1);
        },
        deleteMenuFailure(state) {
            console.log(state);
        },
        addItemSuccess(state, order) {
            state.order.id_items = order.id_items;
            console.log(order);
        },
        addItemFailure(state) {
            console.log(state);
        },
        deleteItemSuccess(state, order) {
            state.order.id_items.splice(state.order.id_items.indexOf(order),1);
        },
        deleteItemFailure(state) {
            console.log(state);
        },
        addItemOptionnelSuccess(state, order) {
            state.order.id_items = order.id_items;
            console.log(order);
        },
        addItemOptionnelFailure(state) {
            console.log(state);
        },
        deleteItemOptionnelSuccess(state, order) {
            state.order.id_items.splice(state.order.id_items.indexOf(order),1);
        },
        deleteItemOptionnelFailure(state) {
            console.log(state);
        },
        validationOrderSuccess(state, order) {
            console.log(order);
            console.log(state.order);
            state.order = [];
            console.log(state.order);
        },
        validationOrderFailure(state) {
            console.log(state);
        },
    }
};