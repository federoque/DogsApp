var express = require('express');
var router = express.Router();
module.exports = router;
const {YOUR_API_KEY} = process.env
const axios = require('axios');
const {Dog, Temperament} = require('../db')


const getApi = async() => {
    const apiURL = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    const apiInfo = apiURL.data.map(dog => {
        const weightImperial = dog.weight.imperial.split(" - ").map(el => parseInt(el))
        const weightMetric = dog.weight.metric.split(" - ").map(el => parseInt(el))
        let minWeight, maxWeight;
        if(weightImperial[0]) minWeight = weightImperial[0]
        else{
            if(weightMetric[0]) minWeight = weightMetric[0]*2.2
            else minWeight = ""
        }

        if(weightImperial[1]) maxWeight = weightImperial[1]
        else{
            if(weightMetric[1]) maxWeight = weightMetric[1]*2.2
            else maxWeight = ""
        }
                return{
                    id: dog.id,
                    name: dog.name,
                    temperament: dog.temperament,
                    weight: `${minWeight} ${minWeight!=='' && maxWeight!=='' ? '-' : ''} ${maxWeight } `,
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

const orderDbInfo = async () =>{
    const DBinfo = await getDb();
    const orderArray = DBinfo.map(dog=>{
        return{
            id: dog.id,
            name: dog.name,
            weight: dog.weight,
            image: dog.image,
            height: dog.height,
            life_span: dog.life_span,
            generated_by_user: dog.generated_by_user,
            temperament: dog.temperaments.map(el=>el.name).join(', ')
        }
    })
    return orderArray
}

const getAllData = async () =>{
    const api = await getApi();
    const db = await orderDbInfo();
    return api.concat(db);
}

router.get('/', async (req,res)=>{
    const { name } = req.query
    if(name){
        const dogs = await getAllData();
        const filterDogs = dogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
        if(filterDogs.length>0){
            res.status(200).send(filterDogs);
        }         
        else{
            res.status(200).send([{name: 'Dog not found'}])
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
            res.status(200).send([{name: 'Dog not found'}])
        }
    }
})







