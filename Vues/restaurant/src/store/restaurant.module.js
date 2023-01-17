import Menu from '../services/menu.service';

import Item from '../services/item.service';

const initialState = {menu: [], item: []};

export const restaurantStore = {
    namespaced: true,
    state: initialState,
    actions: {
        getMenus({commit}) {
            return Menu.getMenus().then(
                menu => {
                    commit('menu_update', menu);
                    return Promise.resolve(menu);
                },
                error => {
                    commit('menu_failed');
                    return Promise.reject(error);
                }
            );
        },
        getItems({commit}) {
            return Item.getItems().then(
                item => {
                    commit('item_update', item);
                    return Promise.resolve(item);
                },
                error => {
                    commit('item_failed');
                    return Promise.reject(error);
                }
            );
        },
        unbindRequiredItem({commit},to_unbind) {
            return Menu.unbindRequiredItem({idMenu: to_unbind.menu._id, idItem:to_unbind.item_id}).then(
                message => {
                    commit('menu_unbind_required_success',to_unbind);
                    return Promise.resolve(message);
                },
                error => {
                    commit('menu_failed');
                    return Promise.reject(error);
                }
            )
        },

        unbindOptionalItem({commit},to_unbind) {
            return Menu.unbindOptionalItem({idMenu: to_unbind.menu._id, idItem:to_unbind.item_id}).then(
                message => {
                    commit('menu_unbind_optional_success',to_unbind);
                    return Promise.resolve(message);
                },
                error => {
                    commit('menu_failed');
                    return Promise.reject(error);
                }
            )
        },
        menu_bind_item({commit},data) {
            data.requiredItem.forEach(item=>{
                if(data.menu.id_required_items.includes(item._id)){
                    data.requiredItem.splice(data.requiredItem.indexOf(item._id),1)
                }
            })
            data.optionalItem.forEach(item=>{
                if(data.menu.id_optional_items.includes(item._id)){
                    data.optionalItem.splice(data.optionalItem.indexOf(item._id),1)
                }
            })
            Menu.bindItem(data.requiredItem,data.optionalItem,data.menu._id)
            commit('item_bind',data);
            return Promise.resolve("Ok");
        },

        createMenu({commit}, menu) {
            return Menu.createMenu({name: menu.name, description: menu.description, price: menu.price, requiredItem:menu.requiredItem, optionalItem:menu.optionalItem}).then(
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
        createItem({commit}, item) {
            return Item.createItem({name: item.name, description: item.description, price: item.price, choice:item.choice, menu_id:item.menu_id}).then(
                response => {
                    commit('item_success', {response : response, test : item });
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('item_failed');
                    return Promise.reject(error);
                }
            );
        },
        editMenu({commit}, menu) {
            return Menu.editMenu({name: menu.name, description: menu.description, price: menu.price, id: menu.id}).then(
                response => {
                    commit('menu_update_success', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('menu_failed');
                    return Promise.reject(error);
                }
            )
        },
        editItem({commit}, item) {
            return Item.editItem({name: item.name, description: item.description, price: item.price, id: item.id}).then(
                response => {
                    commit('item_update_success', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('item_failed');
                    return Promise.reject(error);
                }
            )
        },
        deleteMenu({commit}, menu) {
            return Menu.deleteMenu({id: menu.id}).then(
                response => {
                    commit('menu_delete', menu.id);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('menu_failed');
                    return Promise.reject(error);
                }
            )
        },
        deleteItem({commit}, item) {
            return Item.deleteItem({id: item.id}).then(
                response => {
                    commit('item_delete', item.id);
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
        menu_success(state, menu) {
            state.menu.push(menu.data);
        },
        menu_update_success(state, menu) {
            const editedMenu = state.menu.find(x => x._id === menu._id);
            const index = state.menu.indexOf(editedMenu);
            if (index !== -1) {
                state.menu[index].menu_name=menu.menu_name;
                state.menu[index].menu_price=menu.menu_price;
                state.menu[index].menu_description=menu.menu_description;
            }
        },
        menu_delete(state, menu) {
            const removeMenu = state.menu.find(x => x._id === menu);
            const index = state.menu.indexOf(removeMenu);
            if (index !== -1) {
                state.menu.splice(index, 1);
            }
        },
        menu_failed(state) {
            state.menu = null;
        },
        menu_unbind_required_success(state,to_unbind) {
            const editedMenu = state.menu.find(x => x._id === to_unbind.menu._id);
            const deletedITem = editedMenu.id_required_items.find(x => x === to_unbind.item_id)
            const index =editedMenu.id_required_items.indexOf(deletedITem);
            if (index !== -1) {
                editedMenu.id_required_items.splice(index, 1);
            }
        },
        menu_unbind_optional_success(state,to_unbind) {
            const editedMenu = state.menu.find(x => x._id === to_unbind.menu._id);
            const deletedITem = editedMenu.id_optional_items.find(x => x === to_unbind.item_id)
            const index =editedMenu.id_optional_items.indexOf(deletedITem);
            if (index !== -1) {
                editedMenu.id_optional_items.splice(index, 1);
            }
        },
        item_update(state, item) {
            state.item = item.data;
        },
        item_success(state, item) {
            state.item.push(item.response.data);
            if(item.test.choice === 2) {
                state.menu.find(x => x._id === item.test.menu_id).id_required_items.push(item.response.data._id)
            } else if (item.test.choice === 3) {
                state.menu.find(x => x._id === item.test.menu_id).id_optional_items.push(item.response.data._id)
            }
        },
        item_failed(state) {
            state.item = null;
        },
        item_update_success(state, item) {
            const editedItem = state.item.find(x => x._id === item._id);
            const index = state.item.indexOf(editedItem);
            if (index !== -1) {
                state.item[index].item_name=item.item_name;
                state.item[index].item_price=item.item_price;
                state.item[index].item_description=item.item_description;
            }
        },
        item_delete(state, item) {
            state.menu.forEach(x => {
                if(x.id_required_items.includes(item)){
                    x.id_required_items.splice(x.id_required_items.indexOf(item),1)
                }
                if(x.id_optional_items.includes(item)){
                    x.id_optional_items.splice(x.id_optional_items.indexOf(item),1)
                }
            })

            const removeItem = state.item.find(x => x._id === item);
            const index = state.item.indexOf(removeItem);
            if (index !== -1) {
                state.item.splice(index, 1);
            }
        },

        item_bind(state,data){

            const menu = state.menu.find(x => x._id === data.menu._id)
            data.requiredItem.forEach(item => {
                console.log("Push requis");
                menu.id_required_items.push(item._id)
            })
            data.optionalItem.forEach(item => {
                menu.id_optional_items.push(item._id)
                console.log("opt");
            })

        }
    }
};