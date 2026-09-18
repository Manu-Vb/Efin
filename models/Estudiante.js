import mongoose from "mongoose";

const estudianteSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },

    documento: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    grupo: {
        type: String,
        required: true,
        enum: [
            "6A", "6B", "7A", "7B", "8A", "8B",
            "9A", "9B", "10A", "10B", "11A", "11B"
        ]
    },

    contacto: {
        type: String,
        trim: true,
        default: ""
    }

}, { timestamps: true });

export default mongoose.model("Estudiante", estudianteSchema);
