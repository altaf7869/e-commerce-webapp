const express = require("express");
const { addBrand, updateBrand, deleteBrand, getBrandById, getBrands } = require("../handlers/brand-handler");
const router = express.Router();
const mongoose = require('mongoose');


router.post("", async (req, res) => {
    let model = req.body;
    let result = await addBrand(model);

    res.send(result);
});

router.get("", async (req, res) => {
    let result = await getBrands();
    res.send(result);
});


router.get("/:id", async (req, res) => {
    let id = req.params["id"];

    // Check if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid brand ID format" });
    }

    try {
        let result = await getBrandById(id);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: "Server error", details: err.message });
    }
});

router.put("/:id", async (req, res) => {
    let model = req.body;

    let id = req.params["id"];
    await updateBrand(id, model);
   
    res.send({ message: "Updated Successfully."});
});

router.delete("/:id", async (req, res) => {
    let id = req.params["id"];
    await deleteBrand(id);
   
    res.send({ message: "Deleted Successfully."});
});


module.exports = router;