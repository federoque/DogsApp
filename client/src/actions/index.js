import axios from 'axios';

export function getDogs(alphFilter,weightFilter,tempFilter,CreateApiFilter){
    return async function(dispatch){
        let dogs = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: 'GET_DOGS',
            payload: dogs.data
        })
    }
}

export function getTemperaments(){
    return async function(dispatch){
        let temperaments = await axios.get('http://localhost:3001/temperament');
        let allTemperaments = temperaments.data
        allTemperaments.unshift({id:0,name:"All"})
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: allTemperaments
        })
    }
}

export function getDog(id){
    return async function(dispatch){
        let dog = await axios.get('http://localhost:3001/dogs/'+id);
        return dispatch({
            type: 'GET_DOG',
            payload: dog.data
        })
    }
}

export function searchDog(name){
    return async function(dispatch){
    let dogs = await axios.get('http://localhost:3001/dogs?name=' + name)
        return dispatch({
            type: 'SEARCH_DOGS',
            payload: dogs.data
        })    
    }
}

export function loadingOn(){
   return({
       type: 'LOADING_ON'
   })
}

 export function Filters(filters){
    return{
        type: 'FILTERS',
        payload: filters
    }
 }

 export function createBreed(breed){
     return async function(dispatch){
         const newBreed = await axios.post('http://localhost:3001/dog', breed)
         return {
             type: 'CREATE_BREED',
             payload: newBreed
         }
     }
 }


