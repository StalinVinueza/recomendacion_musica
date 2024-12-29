let Cancion = require('../model/canciones');

exports.prueba = async(req, res) => {
    res.status(200).send(`HOLA SERVER`);
};

exports.guardarCancion = async(req, res) => {
    let {nombre, artista, url_video} = req.body; //Desestructuración
    let cancion = new Cancion({nombre, artista, url_video});
    try{
        await cancion.save();
        res.status(201).json(cancion);
    }catch(error){
        console.error(error);
        res.status(400).json("ERROR AL GUARDAR LA CANCIÓN");
    }
}

