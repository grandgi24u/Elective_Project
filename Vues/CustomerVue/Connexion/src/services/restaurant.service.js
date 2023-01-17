import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/';

class RestaurantService {
    getRestaurants() {
        return axios.get(API_URL + 'getrestaurant', { headers: authHeader() });
    }
    getRestaurantById(restaurantId) {
        return axios.get(API_URL + 'getrestaurant/' + restaurantId, { headers: authHeader() });
    }
    getMenus(restaurantId) {
        return axios.get(API_URL + 'getrestaurant/' + restaurantId + '/menu', { headers: authHeader() });
    }
    getItems(restaurantId) {
        return axios.get(API_URL + 'getrestaurant/' + restaurantId + '/item', { headers: authHeader() });
    }
    getDetailsMenu(menuId, restaurantId) {
        return axios.get(API_URL + 'getrestaurant/' + restaurantId + '/menu/' + menuId, { headers: authHeader() }).catch(err => { console.log(err)});
    }
    setItemsToHamper(restaurantId) {
        return axios.get(API_URL + 'getrestaurant/' + restaurantId + '/menu/' , { headers: authHeader() }).catch(err => { console.log(err)});
    }
    getItemsInMenu(menuId, restaurantId) {
        return axios.get(API_URL + 'getrestaurant/' + restaurantId + '/menu/' + menuId, { headers: authHeader() }).catch(err => { console.log(err)});
    }

}
export default new RestaurantService();