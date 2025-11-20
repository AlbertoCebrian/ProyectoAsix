const express = require("express");
const router = express.Router();
// FIX: Importar a variable en inglés 'Product'
const Product = require("../models/product.model");

// GET all products (with optional category filter)
router.get("/", async (req, res) => {
  try {
    // FIX: Query por 'category' (inglés)
    const filter = req.query.category ? { category: req.query.category } : {};
    // FIX: Usar 'Product.find()' y variable 'products'
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET one product by ID
router.get("/:id", async (req, res) => {
  try {
    // FIX: Usar 'Product.findById()' y variable 'product'
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST (create product)
router.post("/", async (req, res) => {
  // FIX: Usar 'new Product()' y variables en inglés
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update product)
router.put("/:id", async (req, res) => {
  try {
    // FIX: Usar 'Product.findByIdAndUpdate()' y variable 'updatedProduct'
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE (borrar producto)
router.delete("/:id", async (req, res) => {
  try {
    // FIX: Usar 'Product.findByIdAndDelete()' y variable 'deletedProduct'
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;