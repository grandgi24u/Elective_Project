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

exports.get100LastHistoriesOrders = async (req, res) => {
    await History.find().sort({ order_date: -1 }).limit(100).then ((history) => {
        res.status(200).json(history);
    });
}

exports.getHistoryOrderById = async (req, res) => {
     History.findById(req.params.idHistory).then ((history) => {
        res.status(200).json(history);
    });
}

//Get one specific restaurant by user id
exports.getHistoryOrderByUserId = async (req, res) => {
    await History.find({userid:req.params.idUser}).then ((history) => {
        res.status(200).json(history);
    });
}

exports.getHistoryOrderByRestaurantId = async (req, res) => {
    await History.find({restaurantId:req.params.restaurantId}).then ((history) => {
        res.status(200).json(history);
    });
}