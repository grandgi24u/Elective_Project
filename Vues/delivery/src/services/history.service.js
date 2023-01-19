import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://172.16.44.17:4000/gethistories/';

class HistoryService {
    getHistoryByUser() {
        const delivery = JSON.parse(localStorage.getItem('delivery'));
        return axios.get(API_URL + 'getByIdDelivery/' + delivery[0]._id,{ headers: authHeader() }).then(response => {
            return response.data;
        });
    }
}
export default new HistoryService();