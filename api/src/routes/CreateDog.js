var express = require('express');
var router = express.Router();
module.exports = router;
const {Dog, Temperament} = require('../db')
const {YOUR_API_KEY} = process.env
const axios = require('axios');

const getApi = async () => {
    const apiURL = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    const apiName = apiURL.data.map(dog => dog.name)
    return apiName;
}
const getDb = async () => {
    const DBInfo = await Dog.findAll()
    const DBname = DBInfo.map(dog => dog.name)
    return DBname;
}

const getAllData = async () =>{
    const api = await getApi();
    const db = await getDb();
    return api.concat(db);
}

// getAllData().then(data=> console.log(data))

router.post('/', async (req, res)=>{
    const { name, height, weight, life_span, image, temperament, generated_by_user } = req.body
    const dogNames = await getAllData();
    const filterDog = dogNames.find(dog=> dog.toLowerCase() === name.toLowerCase())
    if(filterDog){
        res.status(404).send('Dog breed name already in use')
        return
    }
    const newDog = await Dog.create({
        name,
        height,
        weight,
        life_span,
        image,
        generated_by_user
    });

    const DBtemperament = await Temperament.findAll({
        where: {
            name : temperament
        }
    });

    newDog.addTemperament(DBtemperament);

    res.send('Dog created successfully')
    
})