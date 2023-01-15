import axios from 'axios';
const API_URL = 'http://localhost:4000/';
class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                email: user.email,
                password: user.password
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
        return axios.post(API_URL + 'signup', {
            name: user.name,
            surname: user.surname,
            email: user.email,
            address: user.address,
            password: user.password,
            roleId: 3
        }).then(response => {
            return response.data;
        });
    }
}

export default new AuthService();