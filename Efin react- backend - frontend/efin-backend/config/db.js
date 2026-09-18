import mongoose from "mongoose";
import dns from "node:dns";

// Fuerza a Node a resolver los registros DNS (incluyendo los SRV que
// usa mongodb+srv://) usando Google DNS, sin depender de la
// configuración de red del sistema operativo.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

export async function conectarDB() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("Conectado a MongoDB Atlas");

    } catch (error) {

        console.error(" Error al conectar a MongoDB:", error.message);
        process.exit(1);

    }

}