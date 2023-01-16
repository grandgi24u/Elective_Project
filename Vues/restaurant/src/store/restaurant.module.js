import Menu from '../services/menu.service';

const initialState={menu: []};

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
    }
};