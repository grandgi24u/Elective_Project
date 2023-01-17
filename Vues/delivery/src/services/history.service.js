import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/gethistories/';

class HistoryService {
    getHistoryByUser(data) {
        return axios.get(API_URL + 'getByIdDelivery/' + data.id,{ headers: authHeader() }).then(response => {
            return response.data;
        });
    }
}
export default new HistoryService();