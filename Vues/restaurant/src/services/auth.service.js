import axios from 'axios';
import authHeader from "@/services/auth-header";
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
                    console.log("USER "+response.data);
                    console.log("USER ID "+response.data.id);

                axios.get(API_URL + "getrestaurant/getById/" + response.data.id, { headers: authHeader() }).then( response => {
                        localStorage.setItem('restaurant', JSON.stringify(response.data));
                        console.log(localStorage.getItem('restaurant'));
                })
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('restaurant');
    }
    async register (user) {
        const userid = await axios.post(API_URL + 'signup', {
            name: user.name,
            surname : user.surname,
            email: user.email,
            address: user.address,
            password: user.password,
            roleId: 2
        }).then(response => {
            return response.data;});
        console.log(user);
        return await axios.post(API_URL + 'createRestaurant', {
            name:user.restaurant_name,
            description:user.restaurant_description,
            address:user.address,
            food_type:user.restaurant_food_type,
            userid:userid.utilisateur.id
        }).then(response=>{
            localStorage.setItem('restaurant', JSON.stringify(response.data));
            return response;
        });
    }
}

export default new AuthService();