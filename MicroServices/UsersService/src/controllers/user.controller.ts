exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.customerBoard = (req, res) => {
    res.status(200).send("Customer Content.");
};
exports.restaurantBoard = (req, res) => {
    res.status(200).send("Restaurant Content.");
};
exports.deliveryBoard = (req, res) => {
    res.status(200).send("Delivery Content.");
};