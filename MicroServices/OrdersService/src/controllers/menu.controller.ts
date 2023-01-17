// @ts-ignore
import Order from "../models/order.model";

exports.createMenu = async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, {$addToSet : {id_menus:req.body.menu_id}});
    Order.findById(req.params.id).then(order => {
        res.status(200).send(order);
    });
}

//Delete an item
exports.deleteMenu = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).send({message: "order not found"});
    }
    for (let menu_id in order.id_menus) {
        if (order.id_menus.includes(req.params.idMenu)) {
            await Order.findByIdAndUpdate(order._id, {$pull: {id_menus: req.params.idMenu}});
            Order.findById(req.params.id).then(order => {
                res.status(200).send(order);
            });
        }
    }
}
