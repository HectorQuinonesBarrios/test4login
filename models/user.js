const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
  nombre: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    require: true
  }
});

module.exports = exports = mongoose.model('Usuario', UsuarioSchema);
