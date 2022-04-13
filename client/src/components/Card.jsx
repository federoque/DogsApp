import React from 'react';
import TemperamentDetail from './TemperamentDetail';
import { NavLink } from 'react-router-dom';
import s from '../styles/Card.module.css'


export default function Card({name, image, weight, temperament, id}){
    let tempArray;
    if(temperament) {
            tempArray = temperament.split(', ')
        }
    return (
        <div className={s.card}>
            <NavLink to={'/dogs/' + id} className={s.link}>
                <img className={s.img} src={image} alt="not found" />
                <h3 className={s.h3}>{name}</h3>
                <p className={s.p}>Weight: {weight} pounds</p>
                {!temperament && <p className={s.p}>Temperament: No information</p>}
                {temperament && 
                    <div className={s.temperament}>
                    {
                        tempArray.map(temp=>{
                            return(
                            <TemperamentDetail  temperament={temp} key={temp}/>
                            )
                        })}
                    </div>}
            </NavLink>
        </div>
    )
}