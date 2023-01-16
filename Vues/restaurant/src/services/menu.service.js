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
        return axios.post(API_URL + 'restaurant/' + restaurant._id + '/menu', {name: menu.name, description:menu.description, price:menu.price}, {headers: authHeader()});
    }

    editMenu(menu){
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));

        return axios.patch(API_URL + 'restaurant/' + restaurant._id + '/menu/' + menu.id, {menu_name: menu.name, menu_description:menu.description, menu_price:menu.price}, {headers: authHeader()});
    }

    deleteMenu(menu){
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));

        return axios.delete(API_URL + 'restaurant/' + restaurant._id + '/menu/' + menu.id, {headers: authHeader()});
    }
}
export default new MenuService();