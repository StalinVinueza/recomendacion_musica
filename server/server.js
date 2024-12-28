const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Para manejar las rutas de archivos

const cancionesRouter = require('./view/cancionesRoutes');

const app = express();
const port = 3000;

// Configurar Express para servir archivos estáticos desde la carpeta 'client'
app.use(express.static(path.join(__dirname, 'client')));

async function connectDB() {
    try {
        console.log('Intentando conectar con la base de datos...');
        await mongoose.connect('mongodb://127.0.0.1:27017/musica', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conexión exitosa con la base de datos mONGO :v');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.message);
        process.exit(1); // Detiene el servidor si no se puede conectar
    }
}

connectDB();

// Rutas y middlewares
app.use(cors());
app.use(express.json());
app.use('/canciones', cancionesRouter);

// Rutas de prueba
app.get('/', (req, res) => {
    res.send('Servidor está corriendo');
});

// Servir el archivo index.html cuando se accede a la raíz
app.get('/client/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto " + port);
});
