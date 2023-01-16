// @ts-ignore
import Delivery from '../models/delivery.model';

exports.createDelivery = async (req, res) => {
    const delivery = new Delivery({
        transport_type: req.body.transport_type,
        userId: req.body.userId
    });
    await delivery.save((err, delivery) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(200).json(delivery);
    });
}

exports.deleteDelivery = async (req, res) => {
    await Delivery.remove({_id: req.params.id}, (err, delivery) => {
        if (err){
            res.status(500).send(err);
        }
        res.status(200).json({message:"Delivery deleted"});
    });
}

exports.getDelivery = async (req, res) => {
    await Delivery.findById(req.params.id, (err, delivery) => {
        if (err)
            res.status(404).send(err);
        res.status(200).json(delivery);
    });
}

exports.getDeliveryByUserId = async (req, res) => {
    await Delivery.find({userId: req.params.id}, (err, delivery) => {
        if (err)
            res.status(404).send(err);
        res.status(200).json(delivery);
    });
}

exports.getDeliveries = async (req, res) => {
    await Delivery.find((err, delivery) =>{
        if (err)
            res.status(404).send(err);
        res.status(200).json(delivery);
    });
}

exports.updateDelivery = async (req, res) => {
    await Delivery.findOneAndUpdate({_id: req.params.id}, {
        transport_type: req.body.transport_type
    }, (err, delivery) => {
        if(err)
            res.status(500).send(err);
        res.status(200).json(delivery);
    });
}

exports.addOrder = (req, res) => {
    Delivery.findByIdAndUpdate(req.params.id, {$push: {id_order: req.body.orderId}}, (err, delivery) => {
       if(err)
              res.status(500).send(err);
       res.status(200).json({message: "Order added"});
    });
}

exports.deleteOrder = (req, res) => {
    Delivery.findByIdAndUpdate(req.params.id, {$pull: {id_order: req.body.orderId}}, (err, delivery) => {
        if(err)
            res.status(500).send(err);
        res.status(200).json({message: "Order deleted"});
    });
}

exports.addOrderFinished = (req, res) => {
    Delivery.findByIdAndUpdate(req.params.id, {$push: {id_order_finished: req.body.orderId}}, (err, delivery) => {
        if(err)
            res.status(500).send(err);
        res.status(200).json({message: "Order added"});
    });
}

exports.deleteOrderFinished = (req, res) => {
    Delivery.findByIdAndUpdate(req.params.id, {$pull: {id_order_finished: req.body.orderId}}, (err, delivery) => {
        if(err)
            res.status(500).send(err);
        res.status(200).json({message: "Order deleted"});
    });
}

