import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = 'http://172.16.44.17:4000/';

class MenuService {
    getMenus() {
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        return axios.get(API_URL + 'getrestaurant/' + restaurant._id + '/menu/', {headers: authHeader()});
    }
    getMenu(id) {
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        if(id){
            return axios.get(API_URL + 'getrestaurant/' + restaurant._id + '/menu/'+ id, {headers: authHeader()}).then(response => {
                return response.data
            });
        }
    }
    createMenu(menu) {
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));

        let requiredItem = menu.requiredItem.map(({ _id }) => _id);

        let optionalItem = menu.optionalItem.map(({ _id }) => _id);


        return axios.post(API_URL + 'restaurant/' + restaurant._id + '/menu', {name: menu.name, description:menu.description, price:menu.price, required_items:requiredItem, optional_items:optionalItem}, {headers: authHeader()});
    }

    editMenu(menu){
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));

        return axios.patch(API_URL + 'restaurant/' + restaurant._id + '/menu/' + menu.id, {menu_name: menu.name, menu_description:menu.description, menu_price:menu.price}, {headers: authHeader()});
    }

    deleteMenu(menu){
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));

        return axios.delete(API_URL + 'restaurant/' + restaurant._id + '/menu/' + menu.id, {headers: authHeader()});
    }

    unbindRequiredItem(to_unbind){
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        return axios.post(API_URL + 'restaurant/' + restaurant._id + '/menu/' + to_unbind.idMenu + "/unbind_required_item/" + to_unbind.idItem, {}, {headers: authHeader()});
    }

    unbindOptionalItem(to_unbind){
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        return axios.post(API_URL + 'restaurant/' + restaurant._id + '/menu/' + to_unbind.idMenu + "/unbind_optional_item/" + to_unbind.idItem, {}, {headers: authHeader()});
    }
    bindItem(arrayRequired,arrayOptional,id_menu){
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));
        arrayRequired.forEach(item=>{
            axios.post(API_URL + 'restaurant/' + restaurant._id + '/menu/' + id_menu + '/bind_required_item/' + item._id, {}, {headers: authHeader()});
        });
        arrayOptional.forEach(item=>{
            axios.post(API_URL + 'restaurant/' + restaurant._id + '/menu/' + id_menu + '/bind_optional_item/' + item._id, {}, {headers: authHeader()});
        });
        return true;
    }
}
export default new MenuService();