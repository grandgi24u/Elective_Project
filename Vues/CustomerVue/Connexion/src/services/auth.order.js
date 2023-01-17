import axios from 'axios';
const API_URL = 'http://localhost:4000/';
import authHeader from './auth-header';
class AuthOrder {
    register(order) {
        return axios
            .post(API_URL + 'order', {
                price: order.price,
                status: 0,
                restaurantId: order.restaurantId,
                menu_id: order.menuId,
            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

   registerItem(order) {
        return axios
            .post(API_URL + 'order/' + order.id + '/menu', {
                id: order.menuId,
            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
}

export default new AuthOrder();