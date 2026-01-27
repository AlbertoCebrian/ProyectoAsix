const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // CAMBIO IMPORTANTE: Usamos 'name' en vez de 'firstName'
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // CAMBIO IMPORTANTE: Usamos 'password' en vez de 'passwordHash'
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Esto añade createdAt y updatedAt automáticamente
});

const User = mongoose.model('User', userSchema);

module.exports = User;