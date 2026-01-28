const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");

// 1. GET: Obtener productos (con filtros por categoría Y/O por nombre)
router.get("/", async (req, res) => {
  try {
    const { category, searchTerm } = req.query;
    let filter = {};

    // Si hay categoría, filtramos por ella
    if (category) {
      filter.category = category;
    }

    // Si hay término de búsqueda, buscamos en el nombre (ignorando mayúsculas)
    if (searchTerm) {
      filter.name = { $regex: searchTerm, $options: 'i' };
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. GET: Obtener UN solo producto por ID (¡Esta faltaba y es vital para el detalle!)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. POST: Crear producto
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});




router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Devuelve el producto ya cambiado
        );
        res.send(updatedProduct);
    } catch (error) {
        res.status(500).send("Error al actualizar");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).send("Error al borrar");
    }
});

module.exports = router;
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send(newProduct);
  } catch (error) {
    console.error("Error al guardar producto:", error);
    res.status(500).send("Error al guardar el producto");
  }
});
module.exports = router;