import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, loadingOn } from '../actions';
import { NavLink } from 'react-router-dom'
import Card from './Card';
import image from '../imgs/loading.gif'


export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector(state=> state.dogs)
    const allTemperaments = useSelector(state=> state.temperaments)
    const loading = useSelector(state=> state.loading)

    useEffect(() => {
        dispatch(loadingOn());
        dispatch(getTemperaments())
        dispatch(getDogs());
    }, [dispatch]);

    if(loading){
        return (
            <img src={image} alt="loading"></img>
        )
    }
    return (
        <div>
            <NavLink to='/dog'>Create New Breed</NavLink>
            <h1>DogApp</h1>
            <select>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
            <select>
                <option value="All">All breeds</option>
                <option value="Created">Created breeds</option>
                <option value="API">Api breeds</option>
            </select>
            <select>
                {allTemperaments.map(temp=>{
                    return(
                        <option value = { temp.name } key= { temp.id }>{temp.name}</option>
                    )
                })}
            </select>
            {allDogs && allDogs.map(dog=>{
                return(
                    <Card id={dog.id} name={dog.name} image={dog.image} weight={dog.weight} temperament={dog.temperament} key={dog.id}/>
                )
            })}
        </div>
    )
    

}