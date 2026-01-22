const mongoose = require("mongoose");

const almacenSchema = new mongoose.Schema({
  name: { type: String, default: "Almacén Central" },
  addres: { type: String, default: "" },
  stock: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      amount: { type: Number, default: 0, min: 0 }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("warehouse", almacenSchema);
