import mongoose from "mongoose";

const salonSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    tipo: {
        type: String,
        required: true,
        enum: ["Aula", "Laboratorio", "Sala de sistemas", "Biblioteca", "Auditorio"]
    },

    capacidad: {
        type: Number,
        required: true,
        min: 1
    }

}, { timestamps: true });

export default mongoose.model("Salon", salonSchema);
