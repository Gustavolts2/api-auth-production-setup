const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Hash da senha antes de salvar
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return; //Para o Mongoose não hasha de novo a senha que já está hashada

  this.password = await bcrypt.hash(this.password, 10);
});

// Método para comparar senha
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);