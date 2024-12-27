let express = require('express');
let mongoose = require('mongoose');
let cors = require("cors");
let cancionesRouter = require('./view/cancionesRoutes');

let app = express();
let port = 3000;

// Conexión a la base de datos
async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/musica');
        console.log('Conexión a la base de datos MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Salir en caso de error crítico
    }
}

// Configuración de opciones para CORS
let corsOptions = {
    origin: 'http://127.0.0.1:5500/recomendacion_musica/client/index.html',
    optionSuccessStatus: 200
};

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors(corsOptions)); // Habilitar CORS con las opciones especificadas
app.use(express.json()); // Parseo de JSON en las solicitudes

// Rutas
app.use('/canciones', cancionesRouter);

// Iniciar el servidor
app.listen(port, () => {
    console.log("Servidor corriendo en el puerto " + port);
});
