import Order from '../services/order.service';

const initialState = {order: [], validateOrder:[] };

export const orderStore = {
    namespaced: true,
    state: initialState,
    actions:{
        getOrder({commit}){
            return Order.getOrders(1).then(
                order => {
                    commit('order_get', order);
                    return Promise.resolve(order);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        getActiveOrder({commit}){
            return Order.getOrders(2).then(
                order => {
                    commit('order_get_active', order);
                    return Promise.resolve(order);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },

        acceptOrder({commit},order){
            return Order.updateOrders(order.order._id,2).then(
                result => {
                    commit('order_update', order.order._id);
                    return Promise.resolve(result);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        }
    },

    mutations:{
        order_get(state, order) {
            state.order = order;
        },
        order_get_active(state, active_order) {
            state.validateOrder = active_order;
        },
        order_update(state,order){
            const index = state.order.indexOf(state.order.find(x => x._id === order));
            if (index !== -1) {
                state.order.splice(index, 1);
            }
        }


    }
}
