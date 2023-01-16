import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = 'http://localhost:4000/';

class MenuService {
    getMenus() {
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        return axios.get(API_URL + 'getrestaurant/' + restaurant._id + '/menu/', {headers: authHeader()});
    }

    createMenu(menu) {
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        console.log(menu);
        return axios.post(API_URL + 'restaurant/' + restaurant._id + '/menu', {name: menu.name, description:menu.description, price:menu.price}, {headers: authHeader()});
    }
}
export default new MenuService();