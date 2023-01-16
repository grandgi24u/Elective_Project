export default class Menu {
    constructor(name, description, price, id) {
        this._id = id;
        this.menu_name = name;
        this.menu_description = description;
        this.menu_price = price;
    }
}