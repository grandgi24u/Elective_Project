// @ts-ignore
import Order from '../models/order.model';
// @ts-ignore
import Menu from '../models/menu.model';
// @ts-ignore
import Item from '../models/item.model';

const checkIfOrderExist = (req, res, next) => {
    const OrderId = req.params.id;

    Order.find({_id:OrderId}, (err, order) => {
        console.log(order);
        if (!order || order == ''){
            res.status(400).send({message: "Order not found"});
            return
        }
        next();
    });
}

const checkIfMenuExist = (req, res, next) => {
    const MenuId = req.params.idMenu;
    Menu.find({_id:MenuId},  (err, menu) => {
        if (!menu || menu == ''){
            res.status(400).send({message: "Menu not found"});
            return
        }
        next();
    });
}

// @ts-ignore
const checkAllData = {
    checkIfOrderExist:checkIfOrderExist,
    checkIfMenuExist:checkIfMenuExist,
};

module.exports = checkAllData;
