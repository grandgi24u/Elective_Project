import axios from 'axios';
const API_URL = 'http://172.16.44.17:4000/';
import authHeader from './auth-header';
class AuthOrder {
    register(order) {
        return axios
            .post(API_URL + 'order', {
                price: order.price,
                status: 0,
                restaurantId: order.restaurantId,
                date: Date.now(),
            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

    registerMenu(order) {
        return axios
            .post(API_URL + 'order/' + order.id + '/menu', {
                menu_id: order.menuId,
            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    deleteMenu(order) {
        return axios
            .delete(API_URL + 'order/' + order.orderId + '/menu/'+ order.menuId, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
   }

    registerItem(order) {
        return axios
            .post(API_URL + 'order/' + order.id + '/item', {
                itemId: order.itemId,
            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    deleteItem(order) {
        return axios
            .delete(API_URL + 'order/' + order.orderId + '/item/'+ order.itemId, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

    deleteItemOption(order) {
        return axios
            .delete(API_URL + 'order/' + order.orderId + '/item/optional/'+ order.itemId, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

    registerItemOptionnel(order) {
        return axios
            .post(API_URL + 'order/' + order.id + '/item/optional', {
                itemOptionalId: order.itemId,
            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    deleteItemOptionnel(order) {
        return axios
            .delete(API_URL + 'order/' + order.orderId + '/item/optional/'+ order.itemId, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    validationOrder(order) {
        return axios
            .patch(API_URL + 'order/' + order.orderId , {
                order_status: 1,
            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
}

export default new AuthOrder();