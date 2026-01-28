const path = require('path');
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

// --- 1. IMPORTAR RUTAS ---
const productRoutes = require("./routes/products.routes");
const userRoutes = require('./routes/user.routes');
const reviewRoutes = require("./routes/reviews.routes");
const orderRoutes = require('./routes/order.routes');

const app = express();

// --- 2. MIDDLEWARES ---

// CORS: Lo dejamos abierto para que funcione en Render sin problemas de dominio
app.use(cors());

// JSON: Permite leer los datos del registro
app.use(express.json());

// --- 3. CONEXIÓN A MONGODB ---
connectDB(); 

// --- 4. RUTAS API ---
// (IMPORTANTE: Quitamos el app.get('/') antiguo para que no bloquee la web)

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api/orders', orderRoutes);

// --- 5. SERVIR EL FRONTEND (ANGULAR) ---
// Esto sirve los archivos estáticos (JS, CSS, imágenes) de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Cualquier ruta que no sea API, la enviamos al index.html de Angular
// Esto es vital para que al recargar la página no te dé error 404
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- 6. ARRANCAR SERVIDOR ---
// Usamos process.env.PORT (Render lo necesita) o 3000 si estamos en local
const port = process.env.PORT || 3000; 

app.listen(port, () => { 
    console.log(' Servidor corriendo en el puerto: ' + port);
});