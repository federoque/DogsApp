import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        let dogs = await axios.get('http://localhost:3001/dogs');
        dispatch({
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
        dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: allTemperaments
        })
    }
}

export function getDog(id){
    return async function(dispatch){
        let dog = await axios.get('http://localhost:3001/dogs/'+id);
        dispatch({
            type: 'GET_DOG',
            payload: dog.data
        })
    }
}

export function loadingOn(){
   return({
       type: 'LOADING_ON'
   })
}
