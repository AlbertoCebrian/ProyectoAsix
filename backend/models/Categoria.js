const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
    nombre : {type: String, rquired : true, unique: true, trim:true},
    slug : {type: String, trim:true},
    desripcion : {type: String, default: " "},
}, {timestamp:true });

module.exports = mongoose.model("Categoria", categoriaSchema);
// Este modelo define la estructura de los documentos de categoría en la colección "categorias" de MongoDB.