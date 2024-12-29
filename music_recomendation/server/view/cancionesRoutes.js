// cancionesRoutes.js
let express = require('express');
let Cancion = require('../model/canciones');  // Asegúrate de que el modelo Cancion esté importado
let router = express.Router();

router.post('/', async (req, res) => {
    try {
        let nuevaCancion = new Cancion({
            nombre: req.body.nombre,
            artista: req.body.artista,
            url_video: req.body.url_video
        });

        await nuevaCancion.save();
        res.status(201).json(nuevaCancion); // Envía la canción recién creada como respuesta
    } catch (error) {
        console.error("Error al guardar la canción:", error);
        res.status(500).json({ error: "Error al guardar la canción" });
    }
});

// Ruta para obtener todas las canciones
router.get('/', async (req, res) => {
    try {
        let canciones = await Cancion.find();
        res.status(200).json(canciones); // Envía las canciones como respuesta
    } catch (error) {
        console.error("Error al obtener las canciones:", error);
        res.status(500).json({ error: "Error al obtener las canciones" });
    }
});

// Ruta para obtener una canción aleatoria
// cancionesRoutes.js
router.get('/cancion_aleatoria', async (req, res) => {
    try {
        let canciones = await Cancion.find();
        let randomIndex = Math.floor(Math.random() * canciones.length);
        let cancionAleatoria = canciones[randomIndex];
        res.status(200).json(cancionAleatoria); // Responder con la canción aleatoria
    } catch (error) {
        console.error("Error al obtener la canción aleatoria:", error);
        res.status(500).json({ error: "Error al obtener la canción aleatoria" });
    }
});


module.exports = router;
