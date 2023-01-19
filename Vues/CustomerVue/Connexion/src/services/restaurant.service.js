import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://172.16.44.17:4000/';

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
    getDetailsItem(itemId, restaurantId) {
        return axios.get(API_URL + 'getrestaurant/' + restaurantId + '/item/' + itemId, { headers: authHeader() }).catch(err => { console.log(err)});
    }

    getDetailsOrder(orderId) {
        return axios.get(API_URL + 'order/' + orderId, { headers: authHeader() }).catch(err => { console.log(err)});
    }
    getHistoryOrder(userId) {
        return axios.get(API_URL + 'gethistories/getByIdUser/' + userId , { headers: authHeader() }).catch(err => { console.log(err)});
    }

    getByType(userId) {
        return axios.get(API_URL + 'getrestaurant/getByType/' + userId , { headers: authHeader() }).catch(err => { console.log(err)});
    }

    setItemsToHamper(restaurantId) {
        return axios.get(API_URL + 'getrestaurant/' + restaurantId + '/menu/' , { headers: authHeader() }).catch(err => { console.log(err)});
    }
    getItemsInMenu(menuId, restaurantId) {
        return axios.get(API_URL + 'getrestaurant/' + restaurantId + '/menu/' + menuId, { headers: authHeader() }).catch(err => { console.log(err)});
    }
}
export default new RestaurantService();