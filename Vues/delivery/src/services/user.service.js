import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/users/';

class UserService {
    getUsers() {
        return axios.get(API_URL + 'getUsers', { headers: authHeader() });
    }
}
export default new UserService();