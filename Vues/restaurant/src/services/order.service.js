import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = 'http://172.16.44.17:4000/';

class OrderService{
    getOrders(id){
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        return axios.get(API_URL + 'order/getByIdRestaurant/' + restaurant._id + "/getByStatus/" + id,{ headers: authHeader() }).then(response => {
            return response.data;
        });
    }
    updateOrders(id_order,status){
        return axios.patch(API_URL + 'order/' + id_order,{"order_status":status},{ headers: authHeader() }).then(response => {
            return response.data;
        });
    }

}

export default new OrderService();

