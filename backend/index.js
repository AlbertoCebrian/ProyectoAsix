// index.js

const express = require("express");
const connectDB = require("./db");
const productosRouter = require("./rutas/productos"); // rutas CRUD de productos

const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// Conexión a MongoDB
connectDB();

// Ruta de prueba para verificar que el servidor funciona
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// Usamos las rutas de productos
app.use("/productos", productosRouter);

// Arrancamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
