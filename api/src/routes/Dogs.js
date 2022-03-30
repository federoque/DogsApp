var express = require('express');
var router = express.Router();
module.exports = router;
const {YOUR_API_KEY} = process.env
const axios = require('axios');
const {Dog, Temperament} = require('../db')

// Imagen
// Nombre
// Temperamento
// Peso

// const getApi = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
//     .then(response=> response.data)
//     .then(data=> data.map(dog => {
//         return{
//             name: dog.name,
//             temperament: dog.temperament,
//             weight: dog.weight.metric,
//             image: dog.image.url
//         }
//     }));

//     getApi.then(r=>console.log(r))

const getApi = async() => {
    const apiURL = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    const apiInfo = apiURL.data.map(dog => {
                return{
                    id: dog.id,
                    name: dog.name,
                    temperament: dog.temperament,
                    weight: dog.weight.imperial,
                    image: dog.image.url,
                    height: dog.height.imperial,
                    life_span: dog.life_span
                }
            })
        return apiInfo;
}

const getDb = async () => {
    const DBInfo = await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through:{
                attributes:[]
            }
        }
    })
    return DBInfo;
}

const getAllData = async () =>{
    const api = await getApi();
    const db = await getDb();
    return api.concat(db);
}

router.get('/', async (req,res)=>{
    const { name } = req.query;
    if(name){
        const dogs = await getAllData();
        const filterDogs = dogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
        if(filterDogs.length>0){
            res.status(200).send(filterDogs);
        }
        else{
            res.status(404).send('Dog not found')
        }
    }
    else{
        const allDogs = await getAllData();
        res.status(200).send(allDogs)
    }
})

router.get('/:idRaza', async (req,res)=>{
    let { idRaza } = req.params; 
    if(idRaza){
        const dogs = await getAllData ();
        const filterDog = dogs.filter(dog => dog.id == idRaza)
        if(filterDog.length>0){
            res.status(200).send(filterDog)
        }
        else{
            res.status(404).send('Dog ID not found')
        }
    }
})






