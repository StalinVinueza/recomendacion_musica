// server.js
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let cancionesRouter = require('./view/cancionesRoutes');  // Asegúrate de que el path sea correcto

let app = express();
let port = 3000;

// Conectar a la base de datos
async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/musica');  // Asegúrate de que esta URL esté correcta
        console.log("Conectado a la base de datos MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error.message);
        process.exit(1);
    }
}

let corsOptions = {
    origin: 'http://127.0.0.1:5500',  // Asegúrate de que esta URL sea correcta
    optionSuccessStatus: 200
};

connectDB();
app.use(cors(corsOptions));
app.use(express.json());

app.use('/canciones', cancionesRouter);  // Asegúrate de que la ruta esté bien configurada

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto " + port);
});


