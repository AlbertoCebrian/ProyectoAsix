const express = require("express");
const router = express.Router();
const Producto = require("../modelos/Producto");

// GET todos los productos (con opción de filtrar por categoría)
router.get("/", async (req, res) => {
  try {
    const filtro = req.query.categoria ? { categoria: req.query.categoria } : {};
    const productos = await Producto.find(filtro);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// GET un producto por ID
router.get("/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// POST (crear producto)
router.post("/", async (req, res) => {
  const nuevoProducto = new Producto(req.body);
  try {
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// PUT (actualizar producto)
router.put("/:id", async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!productoActualizado) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// DELETE (borrar producto)
router.delete("/:id", async (req, res) => {
  try {
    const productoBorrado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoBorrado) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;
