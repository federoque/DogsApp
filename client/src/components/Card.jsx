import React from 'react';
import TemperamentDetail from './TemperamentDetail';
import { NavLink } from 'react-router-dom';


export default function Card({name, image, weight, temperament, id}){
    let tempArray;
    if(temperament) {
            tempArray = temperament.split(', ')
        }
    return (
        <div style={{width:"300px",border:"black solid 1px", position:"relative", textDecoration:'none'}}>
            <NavLink to={'/dogs/' + id}>
                <img style={{width:"100%", height:"50%", overflow:"hidden"}} src={image} alt="not found" />
                <h3>{name}</h3>
                <p>Weight: {weight} pounds</p>
                {temperament && <p>Temperaments</p>}
                {temperament && tempArray.map(temp=>{
                    return(
                    <TemperamentDetail temperament={temp} key={temp}/>
                    )
                })}
            </NavLink>
        </div>
    )
}