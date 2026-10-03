import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      required: true,
      trim: true
    },
    precio: {
      type: Number,
      required: true,
      min: 0
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    },
    categoria: {
      type: String,
      required: true,
      trim: true
    },
    imagenes: {
     type: [String], // URLs de las imágenes
     default: []
    },
    destacado: {
     type: Boolean,
     default: false
    },
    enCarrusel: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Product', productSchema);