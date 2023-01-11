// @ts-ignore
import Delivery from '../models/delivery.model';

exports.createDelivery = (req, res) => {
    const delivery = new Delivery();
    delivery.delivery_id = req.body.id;
    delivery.transport_type = req.body.transport_type;
    delivery.id_order = req.params.id_order;

    delivery.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message : 'Delivery created successfully'});
    });
}

exports.deleteDelivery = (req, res) => {
    Delivery.remove({_id: req.params.id}, function(err, delivery){
        if (err){
            res.send(err);
        }
        res.json({message:"Delivery deleted"});
    });
}

exports.getDelivery = (req, res) => {
    Delivery.find(function(err, delivery) {
        Delivery.findById(req.params.id, function (err, delivery) {
            if (err)
                res.send(err);
            res.json(delivery);
        });
    })
}

exports.getDeliverys = (req, res) => {
    Delivery.find(function(err, delivery){
        if (err){
            res.send(err);
        }
        res.json(delivery);
    });
}

