import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, loadingOn, Filters } from '../actions';
import { NavLink } from 'react-router-dom'
import Card from './Card';
import image from '../imgs/loading.gif'
import SearchBar from './SearchBar';
import s from '../styles/Home.module.css'


export default function Home(){
    const dispatch = useDispatch();
    const filterDogs = useSelector(state => state.filterDogs)
    const allTemperaments = useSelector(state=> state.temperaments)
    const loading = useSelector(state=> state.loading)

    const [ filters, SetFilters ] = useState({
            temperament: 'All',
            createOrApi: 'All',
            alphabeticalOrder: 'disordered',
            weightOrder: 'disordered'
        })


    const [ currentPage, setCurrentPage ] = useState(1)
    const dogsPerPage = 8
    const lastDog = dogsPerPage * currentPage 
    const firstDog = lastDog - dogsPerPage
    const dogsToRender = filterDogs.slice(firstDog,lastDog)
    const lastPage = Math.ceil(filterDogs.length/dogsPerPage)

    useEffect(() => {
        dispatch(loadingOn());
        dispatch(getTemperaments())
        dispatch(getDogs());
    }, [ dispatch ]);

    function handlePrevious(e){
        setCurrentPage(prev=>prev-1)
    }

    function handleNext(e){
        setCurrentPage(prev=>prev+1)
    }

    function handleFirstPage(e){
        setCurrentPage(prev=>1)
    }

    function handleLastPage(e){
        setCurrentPage(prev=>lastPage)
    }

    function handleFilterByTemperament(e){
        e.preventDefault()
        SetFilters(prev=>{
            return{
                ...prev,
                temperament: e.target.value
            }
        })
        dispatch(Filters({...filters, temperament: e.target.value}))
        setCurrentPage(prev=> 1)
    }

    function handleFilterByCreatedOrApi(e){
        e.preventDefault()
        SetFilters(prev=>{
            return{
                ...prev,
                createOrApi: e.target.value
            }
        })
        dispatch(Filters({...filters, createOrApi: e.target.value}))
        setCurrentPage(prev=> 1)
    }

    function handleAlphabeticalOrder(e){
        e.preventDefault()
        SetFilters(prev=>{
            return{
                ...prev,
                alphabeticalOrder: e.target.value
            }
        })
        dispatch(Filters({...filters, alphabeticalOrder: e.target.value}))
        setCurrentPage(prev=> 1)
    }

    function handleWeightOrder(e){
        e.preventDefault()
        SetFilters(prev=>{
            return{
                ...prev,
                weightOrder: e.target.value
            }
        })
        dispatch(Filters({...filters, weightOrder: e.target.value}))
        setCurrentPage(prev=> 1)
    }

    function handleRefresh(e){
        window.location.reload()
    }

    if(loading){
        return (
            <div className={s.divLoad}>
                <img className={s.loading} src={image} alt="loading"></img>
            </div>
        )
    }
 
    return (
        <div className={s.all}>
            <div className={s.nav}>
            <h1 className={s.h1}>DogApp!</h1>
            <SearchBar />
            <NavLink to='/dog' className={s.link}>Create New Breed</NavLink>
            </div>
            <div className={s.filters}>
                <div>
                <span>Alphabetical order</span>
                <select onChange={handleAlphabeticalOrder}>
                    <option value="disordered">-</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                </div>
                <div>
                <span>Order by weight</span>
                <select onChange={handleWeightOrder}>
                    <option value="disordered">-</option>
                    <option value="less">Less weight</option>
                    <option value="high">High weight</option>
                </select>
                </div>
                <div>
                <span>Type of breed</span>
                <select onChange={handleFilterByCreatedOrApi}>
                    <option value="All">All breeds</option>
                    <option value="Created">Created breeds</option>
                    <option value="API">Api breeds</option>
                </select>
                </div>
                <div>
                <span>Temperament</span>
                <select onChange={handleFilterByTemperament}>
                    {allTemperaments.map(temp=>{
                        return(
                            <option value = { temp.name } key= { temp.id }>{temp.name}</option>
                        )
                    })}
                </select>
                <button onClick={handleRefresh}>Refresh filters</button>
                </div>
            </div>
            <div className={s.paginate}>
                <button onClick={ handleFirstPage }>First Page</button>
                <button onClick={ handlePrevious } disabled={ currentPage === 1 && true }>Previous</button>
                <span>{filterDogs.length !== 0 ? currentPage+ ' of ' + lastPage : '0 of 0'}</span>
                <button onClick={ handleNext } disabled={ currentPage === lastPage && true }>Next</button>
                <button onClick={ handleLastPage }>Last Page</button>
                
            </div>
            {dogsToRender.length>0 && dogsToRender[0].name === 'Dog not found' && <p className={s.dogNotFound}>Uuups! breed not found! Try Again</p>}
            {filterDogs.length===0 && <div className={s.dogNotFound}>No breeds to show</div>}
            {dogsToRender.length> 0 && dogsToRender[0].name !== 'Dog not found' && 
            <div className={s.main}>
                {dogsToRender.map(dog=>{
                return(
                    <Card id={dog.id} name={dog.name} image={dog.image} weight={dog.weight} temperament={dog.temperament} key={dog.id}/>
                )
            })}
            </div>
            }
        </div>
    )
    

}