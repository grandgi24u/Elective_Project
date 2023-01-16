import Menu from '../services/menu.service';

import Item from '../services/item.service';

const initialState={menu: [], item:[]};

export const restaurantStore = {
    namespaced: true,
    state: initialState,
    actions: {
        getMenus({ commit }) {
            return Menu.getMenus().then(
                menu => {
                    commit('menu_update', menu);
                    return Promise.resolve(menu);
                },
                error => {
                    commit('get_menu_failed');
                    return Promise.reject(error);
                }
            );
        },

        getItems({ commit }) {
            return Item.getItems().then(
                item => {
                    commit('item_update', item);
                    return Promise.resolve(item);
                },
                error => {
                    commit('get_item_failed');
                    return Promise.reject(error);
                }
            );
        },

        createMenu({ commit }, menu) {
            return Menu.createMenu({name: menu.name, description: menu.description, price: menu.price}).then(
                response => {
                    commit('menu_success', response);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('menu_failed');
                    return Promise.reject(error);
                }
            );
        },

        createItem({ commit }, item) {
            return Item.createItem({name: item.name, description: item.description, price: item.price}).then(
                response => {
                    commit('item_success', response);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('item_failed');
                    return Promise.reject(error);
                }
            );
        },

            editMenu({ commit }, menu) {
                return Menu.editMenu({name: menu.name, description: menu.description, price: menu.price, id:menu.id}).then(
                    response => {
                        commit('menu_update_success', response);
                        return Promise.resolve(response.data);
                    },
                    error => {
                        commit('menu_failed');
                        return Promise.reject(error);
                    }
                )
        },

        editItem({ commit }, item) {
            return Item.editItem({name: item.name, description: item.description, price: item.price, id:item.id}).then(
                response => {
                    commit('item_update_success', response);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('item_failed');
                    return Promise.reject(error);
                }
            )
        },

        deleteMenu({ commit }, menu) {
            return Menu.deleteMenu({id:menu.id}).then(
                response => {
                    commit('menu_delete', response);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('menu_failed');
                    return Promise.reject(error);
                }
            )
        },

        deleteItem({ commit }, item) {
            return Item.deleteItem({id:item.id}).then(
                response => {
                    commit('item_delete', response);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('item_failed');
                    return Promise.reject(error);
                }
            )
        }
    },
    mutations: {
        menu_update(state, menu) {
            state.menu = menu.data;
        },
        get_menu_failed(state) {
            state.menu = null;
        },
        menu_success(state, menu) {
            state.menu.push(menu.data) ;
        },
        menu_update_success(state, menu) {
            //Voir pour enlever l'ancien car sinon doublon ancien/nouveau
            state.menu.push(menu.data) ;
        },

        menu_delete(state) {
            console.log(state);
            //Voir pour remove l'item suppr
        },

        menu_failed(state) {
            state.menu = null;
        },


        item_update(state, item) {
            state.item = item.data;
        },
        get_item_failed(state) {
            state.item = null;
        },
        item_success(state, item) {
            state.item.push(item.data) ;
        },
        item_failed(state) {
            state.item = null;
        },
        item_update_success(state, menu) {
            //Voir pour enlever l'ancien car sinon doublon ancien/nouveau
            state.item.push(menu.data) ;
        },

        item_delete(state) {
            console.log(state);
            //Voir pour remove l'item suppr
        },
    }
};