import Order from '../services/order.service';
import MenuService from "@/services/menu.service";
import ItemService from "@/services/item.service";

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
        },

       deliveryOrder({commit},order){
            return Order.updateOrders(order.order._id,3).then(
                result => {
                    commit('order_get_to_delivery', order.order._id);
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
            active_order.forEach(element => {
                element.order_menu = [];
                element.id_menus.forEach(elem => {
                    MenuService.getMenu(elem).then(res => {
                        element.order_menu.push(res);
                    })
                });
                element.order_item = [];
                element.id_items_optional.forEach(elem => {
                    ItemService.getItem(elem).then(res => {
                        element.order_item.push(res);
                    })
                });
                element.id_items.forEach(elem => {
                    ItemService.getItem(elem).then(res => {
                        element.order_item.push(res);
                    })
                });
            });
            console.log(active_order);
            state.validateOrder = active_order;
        },
        order_update(state,order){
            const index = state.order.indexOf(state.order.find(x => x._id === order));
            if (index !== -1) {
                state.order.splice(index, 1);
            }
        },
        order_get_to_delivery(state,order){
            const index = state.validateOrder.indexOf(state.validateOrder.find(x => x._id === order));
            if (index !== -1) {
                state.validateOrder.splice(index, 1);
            }
        }
    }
}
