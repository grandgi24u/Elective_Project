// @ts-ignore
import Order from '../models/order.model';

exports.createOrder = (req, res) => {
    const order = new Order();
    order.order_date = req.body.date;
    order.order_price = req.body.price;
    order.order_status = req.body.status;

    order.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message : 'Order created successfully'});
    });
}

exports.deleteOrder = (req, res) => {
    Order.remove({_id: req.params.id}, function(err, order){
        if (err){
            res.send(err);
        }
        res.json({message:"Order deleted"});
    });
}

exports.getOrder = (req, res) => {
    Order.find(function(err, users) {
        Order.findById(req.params.id, function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    })
}

exports.getOrders = (req, res) => {
    Order.find(function(err, users){
        if (err){
            res.send(err);
        }
        res.json(users);
    });
}

