import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = 'http://localhost:4000/';

class ItemService {
    getItems() {
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        return axios.get(API_URL + 'getrestaurant/' + restaurant._id + '/item/', {headers: authHeader()});
    }

    createItem(item) {
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        return axios.post(API_URL + 'restaurant/' + restaurant._id + '/item', {name: item.name, description:item.description, price:item.price}, {headers: authHeader()});
    }

    editItem(item){
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));

        return axios.patch(API_URL + 'restaurant/' + restaurant._id + '/item/' + item.id, {item_name: item.name, item_description:item.description, item_price:item.price}, {headers: authHeader()});
    }

    deleteItem(item){
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));

        return axios.delete(API_URL + 'restaurant/' + restaurant._id + '/item/' + item.id, {headers: authHeader()});
    }
}
export default new ItemService();