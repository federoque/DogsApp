import React from 'react'
import { NavLink } from 'react-router-dom'
import s from '../styles/LandingPage.module.css'

export default function LandingPage(){
    return(
        <div className={s.LandingPage}>
            <div className={s.div_title}>
                <h1 className={s.h1}>Welcome to DogApp</h1>
            </div>
                <div className={s.img}></div>
            <NavLink to='/home' >
                <button className={s.button}>Get Started</button>
            </NavLink>
        </div>
    )
}