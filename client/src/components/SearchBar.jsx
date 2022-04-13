import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDog, loadingOn } from "../actions";
import s from '../styles/SearchBar.module.css';

export default function SearchBar(){

const [search, setSearch] = useState('')
const dispatch = useDispatch()

function handleSearch(e){
    e.preventDefault()
    setSearch(prev => e.target.value)
}

function handleSubmit(e){
    dispatch(loadingOn())
    dispatch(searchDog(search))
    setSearch('')
}
    return(
        <div>
            <form>
                <input className={s.input} type='text' placeholder="Search..." onChange={handleSearch}/>
                <button className={s.button} type='button' onClick={handleSubmit}>Search</button>
            </form>
        </div>
    )
}