import axios from 'axios';
import authHeader from "@/services/auth-header";
const API_URL = 'http://localhost:4000/';
class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                email: user.email,
                password: user.password,
                roleId: user.roleId
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
    register(user) {
        return axios
            .post(API_URL + 'signup', {
                name: user.name,
                surname: user.surname,
                email: user.email,
                address: user.address,
                roleId: 1,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    updateUser(user) {
        return axios
            .patch(API_URL + 'users/updateUser/' + user.id , {
                name: user.name,
                surname: user.surname,
                address: user.address,
                email: user.email,
            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
}

export default new AuthService();