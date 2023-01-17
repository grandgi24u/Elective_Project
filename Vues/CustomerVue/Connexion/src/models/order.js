export default class Order {
    constructor(price, status, restaurantId, date, customerId) {
        this.price = price;
        this.status = status;
        this.restaurantId = restaurantId;
        this.date = date;
        this.customerId = customerId;
    }
}