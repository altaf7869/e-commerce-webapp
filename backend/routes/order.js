const express = require("express");
const router = express.Router();
const { getOrders, updateOrderStatus } = require("./../handlers/order-hadler");

router.get("", async (req, res) => {
    const orders = await getOrders();
    res.send(orders);
});



router.post("/:id", async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;

   await updateOrderStatus(id, status);
    res.send({ message: "Updated Successfully"});
});

module.exports = router;