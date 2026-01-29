const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");

// IMPORTANTE: Importamos al "portero"
const auth = require("../middleware/auth"); 

// 1. GET: Obtener productos (PÚBLICO - Todo el mundo puede verlos)
router.get("/", async (req, res) => {
  try {
    const { category, searchTerm } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (searchTerm) {
      filter.name = { $regex: searchTerm, $options: 'i' };
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. GET: Obtener UN solo producto (PÚBLICO)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
//    ZONA PROTEGIDA (SOLO ADMINS) 
// ==========================================

// 3. POST: Crear producto (AQUÍ PONEMOS EL 'auth')
router.post("/", auth, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 4. PUT: Editar producto (PROTEGIDO)
router.put('/:id', auth, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } 
        );
        res.send(updatedProduct);
    } catch (error) {
        res.status(500).send("Error al actualizar");
    }
});

// 5. DELETE: Borrar producto (PROTEGIDO)
router.delete('/:id', auth, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).send("Error al borrar");
    }
});

module.exports = router;