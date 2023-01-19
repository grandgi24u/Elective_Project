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
        registerItemOption({ commit }, order) {
            return AuthOrder.registerItemOptionnel(order).then(
                response => {
                    commit('addItemOptionSuccess', response);
                    return Promise.resolve(response);
                },
                error => {
                    commit('addItemOptionFailure', error);
                    return Promise.reject(error);
                }
            );
        },
        deleteItemOption({ commit }, order) {
            return AuthOrder.deleteItemOption(order).then(
                response => {
                    commit('deleteItemOptionSuccess', order.itemId);
                    return Promise.resolve(response);
                },
                error => {
                    commit('deleteItemOptionFailure', error);
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
        updatePrice({ commit }, order) {
            return AuthOrder.updatePrice(order).then(
                response => {
                    commit('updatePriceSuccess', order.orderId);
                    return Promise.resolve(response);
                },
                error => {
                    commit('updatePriceFailure', error);
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
        updatePriceSuccess(state, order) {
            state.order.order_price = order.order_price;
            console.log(order);
        },
        updatePriceailure(state) {
            console.log(state);
        },
        deleteItemSuccess(state, order) {
            state.order.id_items.splice(state.order.id_items.indexOf(order),1);
        },
        deleteItemFailure(state) {
            console.log(state);
        },
        addItemOptionSuccess(state, order) {
            state.order.id_items_optional = order.id_items_optional;
            console.log(order);
        },
        addItemOptionFailure(state) {
            console.log(state);
        },
        deleteItemOptionSuccess(state, order) {
            state.order.id_items_optional.splice(state.order.id_items_optional.indexOf(order),1);
        },
        deleteItemOptionFailure(state) {
            console.log(state);
        },
        validationOrderSuccess(state, order) {
            console.log(order);
            state.order = null;
            /*   state.order.id_items = "";
             state.order.id_items_optional = "";
             state.order.id_menus = "";
             state.order.order_price = "";
             state.order.restaurantId = "";
           let count = 0;
             for (const key in state.order)
             {
                 state.order[key] = '';
                 count++;
                 if (count === 9)
                 {
                     break;
                 }
             }*/
            console.log("fin");
            console.log(state.order);
        },
        validationOrderFailure(state) {
            console.log(state);
        },
    }
};