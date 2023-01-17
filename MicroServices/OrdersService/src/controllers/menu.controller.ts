// @ts-ignore
import Order from "../models/order.model";

exports.createMenu = (req, res) => {
    bindMenu(req.params.id, req.body.menu_id)
}

//Delete an item
exports.deleteMenu = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).send({message: "order not found"});
    }
    for (let menu_id in order.id_menus) {
        if (order.id_menus.includes(req.params.idMenu)) {
            await Order.findByIdAndUpdate(order._id, {$pull: {id_menus: req.params.idMenu}}).catch((err) => {
                res.status(500).send({message: err});
            });
        }
    }
}

const bindMenu = (idOrder, idMenu) => {
    Order.findByIdAndUpdate(idOrder, {$push : {id_menus:idMenu}},(err) => {
        return !err;
    });
}
