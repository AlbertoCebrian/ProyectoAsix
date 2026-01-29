const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        // 1. Buscamos el token en la cabecera (Header)
        const token = req.headers.authorization.split(" ")[1];
        
        // 2. Verificamos si es válido con la clave secreta
        // (Usa la misma palabra secreta que usaste al crear el token en login)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Guardamos los datos del usuario en la petición
        req.userData = decoded;
        
        // 4. ¡Pasa, amigo!
        next();
    } catch (error) {
        // 5. ¡Alto ahí!
        return res.status(401).json({ message: "Auth fallida: No tienes permiso" });
    }
};