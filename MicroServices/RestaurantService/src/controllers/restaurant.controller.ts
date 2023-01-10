// @ts-ignore
import Restaurant from '../models/restaurant.model';

//Create a restaurant
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

//Delete a restaurant
exports.deleteRestaurant = (req, res) => {
    Restaurant.remove({_id: req.params.id}, function(err, restaurant){
        if (err){
            res.send(err);
        }
        res.json({message:"Restaurant deleted"});
    });
}

//Get all the restaurants
exports.getRestaurants = (req, res) => {
    Restaurant.find(function(err, users){
        if (err){
            res.send(err);
        }
        res.json(users);
    });
}

//Get one specific restaurant
exports.getRestaurant = (req, res) => {
    Restaurant.find(function(err, users) {
        Restaurant.findById(req.params.id, function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    })
}





