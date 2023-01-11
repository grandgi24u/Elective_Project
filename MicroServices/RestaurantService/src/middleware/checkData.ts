// @ts-ignore
import Restaurant from '../models/restaurant.model';
// @ts-ignore
import Menu from '../models/menu.model';
// @ts-ignore
import Item from '../models/item.model';

const checkIfRestaurantExist = (req, res, next) => {
    const RestaurantId = req.params.id;

    Restaurant.find({_id:RestaurantId}, (err, restaurant) => {
        if (!restaurant || restaurant == ''){
            res.status(400).send({message: "Restaurant not found"});
            return
        }
        next();
    });
}

const checkIfMenuExist = (req, res, next) => {
    const MenuId = req.params.idMenu;
    Menu.find({_id:MenuId},  (err, menu) => {
        if (!menu || menu == ''){
            res.status(400).send({message: "Menu not found"});
            return
        }
        next();
    });
}

const checkIfItemExist = (req, res, next) => {
    const ItemId = req.params.idItem;
    Item.find({_id:ItemId},  (err, item) => {
        if (!item || item == ''){
            res.status(400).send({message: "Item not found"});
            return
        }
        next();
    });
}

const checkIfItemBind = (req, res, next) => {
    const ItemId = req.params.idItem;
    const MenuId = req.params.idMenu;

    Menu.find({$or:[{ id_required_items: ItemId},{id_optional_items:ItemId}],$and:[{ _id:MenuId}]}, function(err, bind_item)
    {
        if (!(bind_item === undefined || bind_item.length == 0) && !(req.path.includes('unbind')))
        {
            res.status(400).send({message: "Item already bind to the restaurant"});
            return
        }

        if ((bind_item === undefined || bind_item.length == 0) && (req.path.includes('unbind')))
        {
            res.status(400).send({message: "Item already unbind from the restaurant"});
            return
        }

        next();

    });
}

// @ts-ignore
const checkData = {
    checkIfRestaurantExist : checkIfRestaurantExist,
    checkIfMenuExist : checkIfMenuExist,
    checkIfItemExist : checkIfItemExist,
    checkIfItemBind : checkIfItemBind,
};

module.exports = checkData;
