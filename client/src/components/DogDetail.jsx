import React from "react";
import TemperamentDogDetail from "./TemperamentDogDetail";
import { NavLink, useNavigate } from "react-router-dom";
import s from '../styles/DogDetail.module.css'
import Swal from 'sweetalert2'
import { deleteBreed } from "../actions";
import { useDispatch } from "react-redux";

export default function DogDetail({ name, image, weight, height, life_span, temperament, generated, id }) {

const navigate = useNavigate()
const dispatch = useDispatch()

const handleDelete = (e) =>{
  Swal.fire({
    title: 'Do you want to delete bread?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      dispatch(deleteBreed(id))
      Swal.fire('Deleted!', '', 'success')
      setTimeout(() => {
        navigate('/home')
      }, 1000);
    } else if (result.isDenied) {
      Swal.fire('', '', 'info')
    }
  })
}  

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
      {generated && <button onClick={handleDelete} className={s.buttonDelete}>Delete bread</button>}
    </div>
  );
}
