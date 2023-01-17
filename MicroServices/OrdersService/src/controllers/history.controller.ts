// @ts-ignore
import Order from '../models/order.model';
// @ts-ignore
import Menu from "../models/menu.model";
// @ts-ignore
import History from "../models/history.model";


exports.getHistoriesOrders = (req, res) => {
    History.find(function(err, history){
        if (err){
            res.send(err);
        }
        res.json(history);
    });
}

exports.getHistoryOrderById = async (req, res) => {
     History.findById(req.params.idHistory).then ((history) => {
        res.status(200).json(history);
    });
}

exports.getHistoryOrderByUserId = (req, res) => {
     History.findbyId(req.params.idHistory).populate('id_menus').populate('id_items').then ((history) => {
        res.status(200).json(history);
    });
}

exports.getHistoryOrderByRestaurantId = (req, res) => {
    History.find(req.params.restaurantId)(function(err, history){
        if (err){
            res.send(err);
        }
        res.json(history);
    });
}