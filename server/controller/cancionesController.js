let Cancion = require('../model/canciones');

exports.prueba = async (req, res) => {
    try {
        res.status(200).send('HOLA SERVER');
    } catch (error) {
        console.error(error);
        res.status(500).json("Error en el servidor");
    }
};

exports.guardarCancion = async (req, res) => {
    let { nombre, artista, url_video } = req.body; // Desestructuración

    // Validación de entrada
    if (!nombre || !artista || !url_video) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    let cancion = new Cancion({ nombre, artista, url_video });

    try {
        await cancion.save();
        res.status(201).json(cancion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "ERROR AL GUARDAR LA CANCIÓN", error: error.message });
    }
};
