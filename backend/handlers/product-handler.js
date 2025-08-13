const Product = require("./../db/product");

async function addProduct(model) {
    let product = new Product({
        ...model
    });
    await product.save();
    return product.toObject();
}

async function getProducts() {
    let products = await Product.find();
    return products.map(x=> x.toObject());
}

// async function getProductById(id) {
//     let product = await Product.findById(id);
//     return product.toObject();
// }
async function getProductById(id) {
  const product = await Product.findById(id);
  return product ? product.toObject() : null;
}


async function updateProduct(id, model) {
  await Product.findByIdAndUpdate(id, model, { new: true, runValidators: true });
}


async function deleteProduct(id) {
    await Product.findByIdAndDelete(id);
    return;
}


async function getFeaturedProducts() {
    let featuredProducts = await Product.find({
        isFeatured: true,
    });
    return featuredProducts.map((x) => x.toObject());
}

async function getNewProducts() {
    let newProducts = await Product.find({
        isNewProduct: true,
    });
    return newProducts.map((x) => x.toObject());
}


const mongoose = require('mongoose');

async function getProductForListing(searchTerm, categoryId, page, pageSize, sortBy, sortOrder, brandId) {
    if (!sortBy) sortBy = 'price';
    if (!sortOrder) sortOrder = -1;

    let queryFilter = {};

    if (searchTerm) {
        queryFilter.$or = [
            { name: { $regex: '.*' + searchTerm + '.*', $options: 'i' } },
            { shortDescription: { $regex: '.*' + searchTerm + '.*', $options: 'i' } }
        ];
    }

    // ✅ Check if categoryId is a valid ObjectId
    if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
        queryFilter.categoryId = categoryId;
    }

    // ✅ Check if brandId is a valid ObjectId
    if (brandId && mongoose.Types.ObjectId.isValid(brandId)) {
        queryFilter.brandId = brandId;
    }

    const sortDirection = +sortOrder === 1 ? 1 : -1;
    const products = await Product.find(queryFilter)
    .sort({ [sortBy]: sortDirection })
    .skip((+page - 1) * +pageSize)
    .limit(+pageSize)
    .lean();

    return products;
}



module.exports = { addProduct, getProducts, getProductById, updateProduct, deleteProduct, getFeaturedProducts, getNewProducts, getProductForListing };