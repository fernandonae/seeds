import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    telefono: {
      type: String,
      trim: true,
      default: ''
    },
    rol: {
      type: String,
    enum: ['cliente', 'admin', 'proveedor'],
      default: 'cliente'
    }
  },
  {
    timestamps: true // Crea automáticamente los campos createdAt y updatedAt
  }
);

export default mongoose.model('User', userSchema);