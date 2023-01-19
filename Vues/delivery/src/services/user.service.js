import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/users/';

class UserService {
    updateUser(data) {
        return axios.patch(API_URL + 'updateUser/' + data.id,
            {"name": data.name, "surname": data.surname, "email": data.email, "address" : data.address},
            { headers: authHeader() }).then(response => {
                return response.data;
            });
    }
    getUser(id_user) {
        return axios.get(API_URL + 'getUser/' + id_user, { headers: authHeader() }).then(response => {
            return response.data;
        });
    }
}
export default new UserService();