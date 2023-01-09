// @ts-ignore
import Restaurant from '../models/restaurant.model';

exports.createRestaurant = (req, res) => {
    const restaurant = new Restaurant();
    restaurant.restaurant_name = req.body.name;
    restaurant.restaurant_description = req.body.description;
    restaurant.restaurant_address = req.body.address;
    restaurant.food_type = req.body.type;

    restaurant.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message : 'Restaurant created successfully'});
    });
}

exports.deleteRestaurant = (req, res) => {
    Restaurant.remove({_id: req.params.id}, function(err, restaurant){
        if (err){
            res.send(err);
        }
        res.json({message:"Restaurant deleted"});
    });
}

exports.getRestaurant = (req, res) => {
    Restaurant.find(function(err, users){
        if (err){
            res.send(err);
        }
        res.json(users);
    });
}





