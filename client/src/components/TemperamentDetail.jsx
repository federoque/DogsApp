import React from "react";
import s from '../styles/TemperamentDetail.module.css'

export default function TemperamentDetail({temperament}){
    return(
        <div className={s.temp}>{temperament}</div>
    )
}