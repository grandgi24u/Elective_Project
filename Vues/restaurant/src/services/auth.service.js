import axios from 'axios';
const API_URL = 'http://localhost:4000/';
class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signinforRestaurant', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                console.log(response.data);
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
    register(user) {
        return axios.post(API_URL + 'signup', {
            name: user.name,
            email: user.email,
            address: user.address,
            password: user.password
        });
    }
}

export default new AuthService();