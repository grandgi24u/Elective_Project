import axios from 'axios';
const API_URL = 'http://localhost:4000/';
class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                email: user.email,
                password: user.password,
                roleId: 3
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
    async register(user) {
        const data = await axios.post(API_URL + 'signup', {
            name: user.name,
            surname: user.surname,
            email: user.email,
            address: user.address,
            password: user.password,
            roleId: 3
        }).then(response => {
            return response;
        });
        return await axios.post(API_URL + 'createDelivery',
            {transport_type: user.transport_type, userId: data.data.utilisateur.id}).then(response=>{
            localStorage.setItem('delivery', JSON.stringify(response.data));
            return response;
        });
    }
}

export default new AuthService();