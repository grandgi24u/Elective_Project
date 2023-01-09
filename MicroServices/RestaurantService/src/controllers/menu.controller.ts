// @ts-ignore
import Menu from '../models/menu.model';

exports.createMenu = (req, res) => {
    const menu = new Menu();
    menu.menu_name = req.body.name;
    menu.menu_description = req.body.description;
    menu.menu_price = req.body.price;
    menu.id_restaurant = req.params.id;
    console.log(req.params.id)

    menu.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message : 'Menu created successfully'});
    });
}

exports.deleteMenu = (req, res) => {
    Menu.remove({_id: req.params.idMenu}, function(err, menu){
        if (err){
            res.send(err);
        }
        res.json({message:"Menu deleted"});
    });
}

exports.getMenus = (req, res) => {
    Menu.find(function(err, users){
        if (err){
            res.send(err);
        }
        res.json(users);
    });
}

exports.getMenu = (req, res) => {
    Menu.find(function(err, users) {
        Menu.findById(req.params.idMenu, function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    })
}





