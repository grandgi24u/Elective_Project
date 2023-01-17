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
        registerItem({ commit }, order) {
            return AuthOrder.registerItem(order).then(
                response => {
                    commit('addItemSuccess', response);
                    return Promise.resolve(response);
                },
                error => {
                    commit('addItemSuccess', error);
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
        addItemSuccess(state, order) {
            console.log("state :");
            console.log(state);
            console.log("order :");
            console.log(order);
            //state.order.id_menus = order._id;
        },
    }
};