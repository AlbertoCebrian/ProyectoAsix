const express = require("express");
const cors = require("cors");
const connectDB = require("./db"); // <--- USAMOS TU ARCHIVO db.js QUE SÍ FUNCIONA

// --- 1. IMPORTAR RUTAS ---
const productRoutes = require("./routes/products.routes");
const userRoutes = require('./routes/user.routes');
const reviewRoutes = require("./routes/reviews.routes");
const orderRoutes = require('./routes/order.routes');

const app = express();
const PORT = 3000;

// --- 2. MIDDLEWARES ---

// CORS: Permite que Angular entre
app.use(cors({
  origin: 'http://localhost:4200'
}));

// JSON: Permite leer los datos del registro
app.use(express.json());


// --- 3. CONEXIÓN A MONGODB ---
// Llamamos a la función de tu archivo db.js
connectDB(); 


// --- 4. RUTAS ---
app.get("/", (req, res) => {
  res.send("Servidor (Backend) funcionando 🚀");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api/orders', orderRoutes);


// --- 5. ARRANCAR SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});