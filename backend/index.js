// backend/index.js (¡Esta es la versión CORREGIDA!)

const express = require("express");
const cors = require("cors"); // <--- 1. ¡OJO! No tenías CORS, lo necesitas
const connectDB = require("./db");

// --- 2. RUTAS (¡Nombres en inglés!) ---
// Asumimos que has renombrado 'rutas/productos.js' a 'routes/products.routes.js'
const productsRouter = require("./routes/products.routes.js"); 

const app = express();
const PORT = 3000;

// --- 3. MIDDLEWARES ---

// Para que Express entienda JSON
app.use(express.json());

// Para que Angular (en :4200) pueda hablar con este servidor (en :3000)
// Esto arregla el error de CORS
app.use(cors({
  origin: 'http://localhost:4200'
}));

// ----------------------

// Conexión a MongoDB
connectDB();

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor (Backend) funcionando 🚀");
});


// La convención es usar '/api/' para todas las rutas de la API
app.use("/api/products", productsRouter); // Antes '/productos'

// Arrancamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});