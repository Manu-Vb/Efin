import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },

    fecha: {
        type: String,
        required: true
    },

    lugar: {
        type: String,
        required: true,
        trim: true
    },

    descripcion: {
        type: String,
        trim: true,
        default: ""
    }

}, { timestamps: true });

export default mongoose.model("Evento", eventoSchema);
