import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { loadingOn, getDog } from "../actions";
import image from '../imgs/loading.gif'
import { useParams } from "react-router-dom";
import TemperamentDetail from "./TemperamentDetail";

export default function CardDetail(){

    let params = useParams();

    const dispatch = useDispatch();
    const dog = useSelector(state=> state.dogs)
    const loading = useSelector(state=> state.loading)

    useEffect(() => {
        dispatch(loadingOn())
        dispatch(getDog(params.id))
    }, []);

    var temperament;
    if(dog[0].temperament){
         temperament = dog[0].temperament.split(', ');
    }

    if(loading){
        return(
            <img src={image} alt="LOADING"></img>
        )
    }
  return(
     <div>
         <h1>{dog[0].name}</h1>
         <img src={dog[0].image}></img>
         <p>Weight: {dog[0].weight} pounds</p>
         <p>Height: {dog[0].height} inches</p>
         <p>Life span: {dog[0].life_span}</p>
         <p>Temperament:</p>
         {!temperament ? <p>No information</p> : temperament.map(el=>{
             return (
                <TemperamentDetail temperament={el} />
             )
         })}
         <NavLink to='/home'>
             <button>Home</button>
         </NavLink>
     </div>
  )
}