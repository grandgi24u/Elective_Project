import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = 'http://172.16.44.17:4000/';

class ItemService {
    getItems() {
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        return axios.get(API_URL + 'getrestaurant/' + restaurant._id + '/item/', {headers: authHeader()});
    }

    getItem(id) {
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        if (id) {
            return axios.get(API_URL + 'getrestaurant/' + restaurant._id + '/item/' + id, {headers: authHeader()}).then(response => {
                return response.data
            });
        }
    }

    createItem(item) {
        //1 = paq de menu
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        if(item.choice===1){
            return axios.post(API_URL + 'restaurant/' + restaurant._id + '/item', {name: item.name, description:item.description, price:item.price}, {headers: authHeader()});
        }
        if(item.choice===2){
            return axios.post(API_URL + 'restaurant/' + restaurant._id + '/menu/' + item.menu_id + '/item_required/', {name: item.name, description:item.description, price:item.price}, {headers: authHeader()});
        }

        if(item.choice===3){
            return axios.post(API_URL + 'restaurant/' + restaurant._id + '/menu/' + item.menu_id + '/item_optional/', {name: item.name, description:item.description, price:item.price}, {headers: authHeader()});

        }

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