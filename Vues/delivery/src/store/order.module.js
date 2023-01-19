import Order from '../services/order.service';
import UserService from "@/services/user.service";

const initialState = {order: [], validateOrder:null };

export const orderStore = {
    namespaced: true,
    state: initialState,
    actions:{
        getOrder({commit}){
            return Order.getOrders().then(
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
            return Order.getActiveOrder().then(
                order => {
                    commit('order_get_active', order);
                    return Promise.resolve(order);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        acceptOrder({commit}, order){
            return Order.acceptOrder(order).then(
                () => {
                    Order.updateOrders(order,4).then(() => {})
                    commit('order_accept', order);
                    return Promise.resolve("Ok");
                }
            );
        },
        valideDelivery({commit},order){
            return Order.updateOrders(order, 5).then(
                () => {
                    commit('valid_Order');
                    return Promise.resolve("Ok");
                });
        }
    },
    mutations:{
        order_get(state, order) {
            state.order = order;
        },
        order_get_active(state, active_order) {
            if(active_order.length > 0){
                UserService.getUser(active_order[0].userid).then(res => {
                     active_order[0].user = res;
                    state.validateOrder = active_order[0];
                });
            }
        },
        order_accept(state, order) {
            console.log(order.order);
            state.valideOrder = order.order;
            state.order.splice(state.order.indexOf(order), 1);
        },
        valid_Order(state) {
            state.validateOrder = null;
        }
    }
}
