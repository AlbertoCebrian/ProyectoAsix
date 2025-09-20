// index.js

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Conexión a la base de datos 

const connectDB = require("./db");
connectDB();


const Producto = require("./models/Producto");

app.get("/productos", async (req, res) => {
  try {
    const productos = await Producto.find(); // Trae todos los productos de MongoDB
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
});


app.get("/", (req, res) => {
  res.send("Clinton la chupa🚀");
});

app.get("/productos", (req, res) => {
  res.json(productos);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

