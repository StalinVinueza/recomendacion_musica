let express = require('express');
let mongoose = require('mongoose');
let cors = require("cors")
let cancionesRouter = require('./view/cancionesRoutes');

let app = express();
let port = 3000;

// async function connectDB() {
//     try{
//         await mongoose.connect('mongodb://localhost:27017/musica',{
//             useNewUrlParser:true,
//             useUnifiedTopology:true
//         })
//     }catch(error){
//         console.error(error);
//         process.exit(1);
//     }
    
// }


async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/musica', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos conectada');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

connectDB();


let corsOptions = {
    origin : 'http://127.0.0.1:5500/recomendacion_musica/client/index.html',
    optionSuccessStatus: 200
}

connectDB();

app.use(cors(corsOptions))

app.use(express.json());

app.use('/canciones', cancionesRouter);

app.listen(port,()=>{
    console.log("Servidor corriendo en el puerto "+port);
})