import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/';

class OrderService {
    getOrder() {
        return axios.get(API_URL + 'order', { headers: authHeader() });
    }
}
export default new OrderService();