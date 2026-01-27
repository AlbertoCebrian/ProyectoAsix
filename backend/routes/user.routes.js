const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// CLAVE SECRETA (En producción iría en .env)
const JWT_SECRET = "mi_clave_secreta_super_segura_123"; 

// --- LOGIN (POST /api/users/login) ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Buscar usuario
        const user = await User.findOne({ email });

        // 2. Si existe usuario Y la contraseña coincide
        if (user && (await bcrypt.compare(password, user.password))) {
            
            // 3. Generar Token
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                JWT_SECRET,
                { expiresIn: '30d' }
            );

            // 4. Responder al Frontend con los datos
            res.json({
                _id: user._id,
                name: user.name, // <--- Importante que esto viaje
                email: user.email,
                isAdmin: user.isAdmin,
                token: token
            });
            
        } else {
            res.status(400).json({ message: 'Usuario o contraseña inválidos' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- REGISTRO (POST /api/users/register) ---
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        // LOGUEAMOS AUTOMÁTICAMENTE AL REGISTRARSE
        const token = jwt.sign(
            { id: savedUser._id, isAdmin: savedUser.isAdmin },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(201).json({
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            isAdmin: savedUser.isAdmin,
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;