const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

// RUTA: CREAR UN NUEVO PEDIDO (POST /api/orders/create)
router.post('/create', async (req, res) => {
    try {
        const requestOrder = req.body;

        if(requestOrder.items.length <= 0){
            return res.status(400).send('El carrito está vacío');
        }

        // Borramos el pedido si existiera uno "nuevo" anterior para este usuario
        await Order.deleteOne({
            user: requestOrder.user,
            status: 'NEW'
        });

        const newOrder = new Order({ ...requestOrder });
        await newOrder.save();
        res.send(newOrder);

    } catch (error) {
        console.error("Error al crear pedido:", error);
        res.status(500).send('Error al crear el pedido');
    }
});

// RUTA: VER MIS PEDIDOS
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.send(orders);
    } catch (error) {
        res.status(500).send('Error al obtener pedidos');
    }
});

module.exports = router;