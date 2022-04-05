var express = require('express');
var router = express.Router();
// module.exports = router
const {YOUR_API_KEY} = process.env
const axios = require('axios');
const {Dog, Temperament} = require('../db')

const getApi = async() => {
    const apiURL = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    const apiInfo = apiURL.data.map(dog => dog.temperament)
    let tempArray = [];
    for(let i=0; i<apiInfo.length; i++){
        if(apiInfo[i]) tempArray.push(apiInfo[i].split(', '))
    }
    const uniqueTempArray = []
    for(let i=0; i<tempArray.flat().length; i++){
        if(!uniqueTempArray.includes(tempArray.flat()[i])){
            uniqueTempArray.push(tempArray.flat()[i])
        }
    }
    return uniqueTempArray.sort();
};

router.get('/', async (req, res)=>{
    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments)
})

module.exports = {
    getApi: getApi,
    temperamentsRouter: router
}