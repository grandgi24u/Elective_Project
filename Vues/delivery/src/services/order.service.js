import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = 'http://localhost:4000/';

class OrderService{
    getOrders(){
        return axios.get(API_URL + 'order/getByStatus/3',{ headers: authHeader() }).then(response => {
            return response.data;
        });
    }
    getActiveOrder() {
        const delivery = JSON.parse(localStorage.getItem('delivery'));
        return axios.get(API_URL + 'order/getDeliveryOrder/' + delivery[0]._id,{ headers: authHeader() }).then(response => {
            return response.data;
        });
    }
    acceptOrder(order) {
        const delivery = JSON.parse(localStorage.getItem('delivery'));
        return axios.post(API_URL + 'order/' + order.order._id + '/assignDelivery/' + delivery[0]._id, order,{ headers: authHeader() }).then(response => {
            return response.data;
        });
    }
    updateOrders(order,status){
        return axios.patch(API_URL + 'order/' + order.order._id,{"order_status":status},{ headers: authHeader() }).then(response => {
            return response.data;
        });
    }
    getRestaurant(id_Restaurant) {
        return axios.get(API_URL + 'getrestaurant/' + id_Restaurant,{ headers: authHeader() }).then(response => {
            return response.data;
        });
    }
}

export default new OrderService();

