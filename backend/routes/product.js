const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Product = require("./../db/product");
const { addProduct, getProducts, updateProduct, deleteProduct, getProductById } = require("../handlers/product-handler");

// Add Category
router.post("", async (req, res) => {
    let model = req.body;
    let result = await addProduct(model);

    res.send(result);
});

// GET Category
router.get("", async (req, res) => {
    let result = await getProducts();
    res.send(result);
});

// GET CategoryBy Id
router.get("/:id", async (req, res) => {
    let id = req.params["id"];

    // Check if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid product ID format" });
    }

    try {
        let result = await getProductById(id);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: "Server error", details: err.message });
    }
});

// Update Category
router.put("/:id", async (req, res) => {
    let model = req.body;

    let id = req.params["id"];
    await updateProduct(id, model);
   
    res.send({ message: "Updated Successfully."});
});

// Delete Category
router.delete("/:id", async (req, res) => {
    let id = req.params["id"];
    await deleteProduct(id);
   
    res.send({ message: "Deleted Successfully."});
});

module.exports = router;