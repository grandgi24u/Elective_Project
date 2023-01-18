import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/gethistories/';

class HistoryService {
    getHistoryByRestaurant() {
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        return axios.get(API_URL + 'getByIdRestaurant/' + restaurant._id,{ headers: authHeader() }).then(response => {
            return response.data;
        });
    }
}
export default new HistoryService();