import React from "react";
import s from '../styles/TemperamentDogDetail.module.css'

export default function TemperamentDogDetail({temperament}){
    return(
        <div className={s.temp}>{temperament}</div>
    )
}