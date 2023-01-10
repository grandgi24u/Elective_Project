// @ts-ignore
import Restaurant from '../models/restaurant.model';
// @ts-ignore
import Menu from '../models/menu.model';

const checkIfRestaurantExist = (req, res, next) => {
    const RestaurantId = req.params.id;
    Restaurant.find({_id:RestaurantId}, (err, restaurant) => {
        if (!restaurant){
            res.status(400).send({message: "Restaurant not found"});
            return
        }

        next();
    });
}

const checkIfMenuExist = (req, res, next) => {
    const MenuId = req.params.idMenu;
    Restaurant.find({_id:MenuId},  (err, menu) => {
        if (!menu){
            res.status(400).send({message: "Menu not found"});
            return
        }
        next();
    });

}

// @ts-ignore
const checkData = {
    checkIfRestaurantExist : checkIfRestaurantExist,
    checkIfMenuExist : checkIfMenuExist,
};

module.exports = checkData;
