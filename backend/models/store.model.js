const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { // Antes 'addres' con objeto dentro
    street: { type: String, default: "" },  // Antes 'calle'
    city: { type: String, default: "" },    // Antes 'ciudad'
    zipCode: { type: String, default: "" }  // Antes 'codigoPostal'
  },
  phone: { type: String, default: "" },     // Antes 'telefono'
  
  // Referencia a Empleados (ahora Employee)
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }], 
  
  // Stock local de la tienda
  stock: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 0, min: 0 } // Antes 'cantidad'
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Store", storeSchema);