// @ts-ignore
import Delivery from '../models/delivery.model';

const checkIfUserIdExist = async (req, res, next) => {
    const delivery = await Delivery.find({userId: req.query.userId});
    if(delivery.length > 0){
        return res.status(409).send({message: 'User already exist'});
    }
    next();
}

// @ts-ignore
const checkData = {
    checkIfUserIdExist: checkIfUserIdExist
};

module.exports = checkData;
