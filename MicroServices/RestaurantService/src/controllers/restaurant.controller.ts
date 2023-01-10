// @ts-ignore
import Restaurant from '../models/restaurant.model';

//Create a restaurant
exports.createRestaurant = (req, res) => {
    const restaurant = new Restaurant();
    restaurant.restaurant_name = req.body.name;
    restaurant.restaurant_description = req.body.description;
    restaurant.restaurant_address = req.body.address;
    restaurant.food_type = req.body.type;

    restaurant.save((err) => {
        if(err){
            res.status(404).send({message: err});
        }
        res.status(200).send({message: "Restaurant created successfully"});
    });
}

//Delete a restaurant
exports.deleteRestaurant = (req, res) => {
    Restaurant.remove({_id: req.params.id}, (err, restaurant) =>{
        if (err){
            res.status(404).send({message: err});
        }
        res.status(200).send({message: "Restaurant deleted"});
    });
}

//Get all the restaurants
exports.getRestaurants = (req, res) => {
    Restaurant.find((err, users) => {
        if (err){
            res.status(404).send({message: err});
        }
        res.json(users);
    });
}

//Get one specific restaurant
exports.getRestaurant = (req, res) => {
    Restaurant.find((err, users) => {
        Restaurant.findById(req.params.id, (err, users) => {
            if (err)
                res.status(404).send({message: err});
            res.json(users);
        });
    })
}

exports.updateAnRestaurant = (req, res) => {
        const RestaurantId = req.params.id;
        const updates = req.body;

        Restaurant.findByIdAndUpdate(RestaurantId, updates,
            (err, restaurant) => {
                if (err) {
                    res.status(404).send({message: err});
                } else {
                    res.status(200).send({message: "Restaurant updated"});
                }
            })
}






