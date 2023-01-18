// @ts-ignore
import Order from '../models/order.model';
// @ts-ignore
import Menu from '../models/menu.model';
// @ts-ignore
import Item from '../models/item.model';

const checkIfOrderExist = (req, res, next) => {
    const OrderId = req.params.id;
    Order.find({_id:OrderId}, (err, order) => {
        if (!order || order == ''){
            res.status(400).send({message: "Order not found"});
            return
        }
        next();
    });
}

// const checkIfMenuExist = (req, res, next) => {
//     const MenuId = req.params.idMenu;
//     Menu.find({_id:MenuId},  (err, menu) => {
//         if (!menu || menu == ''){
//             res.status(400).send({message: "Menu not found"});
//             return
//         }
//         next();
//     });
// }

const checkIfItemExist = (req, res, next) => {
    const ItemId = req.params.idItem;
    Item.find({_id:ItemId},  (err, item) => {
        if (!item || item == ''){
            res.status(400).send({message: "Item not found"});
            return
        }
        next();
    });
}



const checkOwner = (req, res, next) => {
    const userId = req.query.userId;
    const orderId = req.params.id;

    Order.findOne({_id:orderId}, (err, order) => {
        if(order){
            if (order.userid != userId || userId == undefined || userId == ''){
                res.status(403).send({message: "The user is not the order's owner"});
                return
            }
        } else {
            res.status(404).send({
                message: "Order not found"
            });
            return
        }
        next();
    });
}

const checkStatusOrder = (req, res, next) => {
    const OrderId = req.params.id;

    Order.find({_id:OrderId}, (err, order) => {
        if (!order || order.status == '5'){
            order.history.push(order._id);
            res.status(400).send({message: "Order close"});
            return
        }
        next();
    });
}


// @ts-ignore
const checkAllData = {
    checkIfOrderExist:checkIfOrderExist,
    // checkIfMenuExist:checkIfMenuExist,
    checkIfItemExist:checkIfItemExist,
    checkOwner:checkOwner,
    checkStatusOrder:checkStatusOrder,
};

module.exports = checkAllData;
