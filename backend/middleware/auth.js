const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        // --- LOGS DE DEPURACIÓN (Borrar luego) ---
        console.log("--- INTENTO DE ACCESO ---");
        
        // Ver si llega el header
        const authHeader = req.headers.authorization;
        console.log("Header recibido:", authHeader ? "SÍ" : "NO");

        // Ver si tenemos la clave secreta cargada (SIN mostrarla toda por seguridad)
        const secret = process.env.JWT_SECRET;
        console.log("¿Tengo clave secreta?:", secret ? "SÍ, longitud: " + secret.length : "NO, ES UNDEFINED ❌");

        // ----------------------------------------

        const token = authHeader.split(" ")[1];
        
        // Intenta verificar
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        console.log("Token verificado: OK ✅"); // Si llega aquí, es éxito
        
        req.userData = decoded;
        next();
    } catch (error) {
        console.log("Error al verificar:", error.message); // Nos dirá por qué falla
        return res.status(401).json({ message: "Auth fallida" });
    }
};