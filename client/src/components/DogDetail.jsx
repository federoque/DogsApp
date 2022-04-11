import React from "react";
import TemperamentDogDetail from "./TemperamentDogDetail";
import { NavLink } from "react-router-dom";
import s from '../styles/DogDetail.module.css'

export default function DogDetail({ name, image, weight, height, life_span, temperament, }) {
  return (
    <div className={s.all}>
      <h1 className={s.h1}>{name}</h1>
      <img className={s.image} src={image} alt="Not found"></img>
      <p>Weight: {weight} pounds</p>
      <p>Height: {height} inches</p>
      <p>Life span: {life_span.includes('years') ? life_span : life_span+ ' years'}</p>
      <p>Temperament:</p>
      {!temperament && <p>No information</p>}
      {temperament && 
      <div className={s.temp} >
        {temperament.map(el=>{
          return(
            <TemperamentDogDetail temperament={el} key={el}/>
          )
        })}
      </div>
      }
      <NavLink to="/home">
        <button className={s.button}>Home!</button>
      </NavLink>
    </div>
  );
}
