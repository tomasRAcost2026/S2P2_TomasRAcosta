//Conexion inicial establece una ruta entre la aplicacion y el cluster MongoDB
//Mongoose facilita las interacciones tre ellas de manera sencilla y segura
const mongoose = require ('mongoose');

mongoose.connect ('mongodb+srv://grupo-01:grupo01@cursadanodejs.ls9ii.mongodb.net/Node-js')
.then( () => console.log('Conexionexitosa a MongoDB'))
.catch(error => console.error('Error al conectar a MOngo DB:' , error));

//Definimos un esquema y un modelo en Mongoose para darle estructura a la coleccion de seperheroes en la DB
const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: {type: String, require: true},
    nombreReal: {type: String, require: true},
    edad: {type: Number, min: 0},
    planetaOrigen: {type: String, default: 'Desconocido'},
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: {type: Date, default: Date.now},
    creador: String
}, {collection: 'Grupo-01'});

const SuperHero = mongoose.model('SuperHero', superheroSchema);


//Metodo CRUD en la coleccion SuperHero
async function insertSuperHero(){
    const hero = new SuperHero({
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: 'Radioactiva',
        poderes: ['Trepar paredes', 'Sentido arácnido', 'Super fuerza', 'Agilidad'],
        aliados: ['Ironman'],
        enemigos: ['Duende Verde'],
        creador: 'Tomás R. Acosta'
    });
    await hero.save(); // aqui validamos el documento antes de guardarlo (Mongoose)
    console.log('Superheroe insertado: ', hero);    
}

insertSuperHero();

//Actualizamos el documento
async function updateSuperHero(nombreSuperHeroe){
    const result = await SuperHero.updateOne( //updateOne es la clave aqui porque permite buscar un campo por el documento y lo actualiza
        {nombreSuperHeroe: nombreSuperHeroe},
        {$set: {edad: 26}}
    );
    console.log('Resultado de la actualizacion: ', result);
}

updateSuperHero('Spiderman');


//Eliminamos un Documento
async function deleteSuperHero(nombreSuperHeroe){
    const result = await SuperHero.deleteOne({nombreSuperHeroe: nombreSuperHeroe});//deleteOne ayuda a gestionar el espacio y eliminar datos
    console.log('Superheroe eliminado: ', result);
}

deleteSuperHero('Spiderman');

//Buscar documentos
async function findSuperHeroes(){
    const heroes = await SuperHero.find({planetaOrigen: 'Tierra'});
    console.log('Superheroes encontrados: ', heroes);
}

findSuperHeroes();