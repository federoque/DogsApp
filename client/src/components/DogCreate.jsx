import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createBreed, getDogs, getTemperaments } from "../actions";
import s from '../styles/DogCreate.module.css'

export default function DogCreate(){
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const temperaments = useSelector(state => state.temperaments)
    const allDogs = useSelector(state => state.dogs)
    useEffect(()=>{
        dispatch(getTemperaments())
        dispatch(getDogs())
    }, [dispatch])

    const [input, setInput] = useState({
        name: '',
        min_height: '',
        max_height: '',
        min_weight: '',
        max_weight: '',
        min_life_span: '',
        max_life_span: '',
        image: '',
        temperament: []
    })

    const [error, SetError] = useState({
        name: 'Name is required',
        min_height: 'Minimum height is required',
        max_height: 'Maximum height is required',
        min_weight: 'Minimum weight is required',
        max_weight: 'Maximum weight is required',
        min_life_span: 'Minimum life span is required',
        max_life_span: 'Maximum life span is required',
        image: 'Image URL is required',
        temperament: ''
    })


    function validate(input){
        let errors = {}

        //validate name
        if(!input.name){
            errors.name = "Name is required"
        }

        if(allDogs.filter(el=> el.name.toLowerCase() === input.name.toLowerCase()).length > 0 ){
            errors.name = "Name is already in use"
        }

        //validate height
        if(parseInt(input.min_height)>999 || parseInt(input.min_height)<1 || parseInt(input.min_height).toString() === 'NaN'){
            errors.min_height= "Enter a valid minimum height"
        }
        if(parseInt(input.max_height)>999 || parseInt(input.max_height)<1 || parseInt(input.max_height).toString() === 'NaN'){
            errors.max_height= "Enter a valid maximum height"
        }
        if(!input.min_height){
            errors.min_height = "Minimum height is required"
        }
        if(!input.max_height){
            errors.max_height = "Maximum height is required"
        }
        if(parseInt(input.min_height)>parseInt(input.max_height)){
            errors.max_height = "Maximum height must be greater than minimum"
        }
        
        //validate weight
        if(parseInt(input.min_weight)>999 || parseInt(input.min_weight)<1 || parseInt(input.min_weight).toString() === 'NaN'){
            errors.min_weight= "Enter a valid minimum weight"
        }
        if(parseInt(input.max_weight)>999 || parseInt(input.max_weight)<1 || parseInt(input.max_weight).toString() === 'NaN'){
            errors.max_weight= "Enter a valid maximum weight"
        }
        if(!input.min_weight){
            errors.min_weight = "Minimum weight is required"
        }
        if(!input.max_weight){
            errors.max_weight = "Maximum weight is required"
        }
        if(parseInt(input.min_weight)>parseInt(input.max_weight)){
            errors.max_weight = "Maximum weight must be greater than minimum"
        }

        //validate life_span

        if(parseInt(input.min_life_span)>999 || parseInt(input.min_life_span)<1 || parseInt(input.min_life_span).toString() === 'NaN'){
            errors.min_life_span= "Enter a valid minimum life span"
        }
        if(parseInt(input.max_life_span)>999 || parseInt(input.max_life_span)<1 || parseInt(input.max_life_span).toString() === 'NaN'){
            errors.max_life_span= "Enter a valid maximum life_span"
        }
        if(!input.min_life_span){
            errors.min_life_span = "Minimum life span is required"
        }
        if(!input.max_life_span){
            errors.max_life_span = "Maximum life span is required"
        }
        if(parseInt(input.min_life_span)>parseInt(input.max_life_span)){
            errors.max_life_span = "Maximum life span must be greater than minimum"
        }

         //validate URL image
         if(!input.image){
            errors.image = "Image URL is required"
        }
 
        if((!input.image.includes('https://') && !input.image.includes('http://')) || !input.image.includes('.')){
            errors.image = "Enter a valid Image URL"
        }
    
        return errors
    }

    function handleInputChange(e){
        e.preventDefault()
        setInput(prev=>{
            return{
                ...prev,
                [e.target.name]: e.target.value
            }
        })
        let error = validate({...input, [e.target.name]: e.target.value})
        SetError(prev=> error)
    }


    function handleTemperamentSelect(e){
        e.preventDefault()
        if(input.temperament.includes(e.target.value)) return
        setInput(prev=>{
            return{
                ...prev,
                temperament: prev.temperament.concat(e.target.value)
            }
        })
    }

    function handleDelete(e){
        e.preventDefault()
        setInput(prev=>{
          return{
              ...prev,
              temperament: prev.temperament.filter(el=> el !== e.target.value)
          }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(createBreed({
            name: input.name,
            height: input.min_height + ' - ' + input.max_height,
            weight: input.min_weight + ' - ' + input.max_weight,
            life_span: input.min_life_span + ' - ' + input.max_life_span,
            image: input.image,
            temperament: input.temperament
        }))
        alert('Breed has been created')
        setInput(prev=>{
            return {
                name: '',
                min_height: '',
                max_height: '',
                min_weight: '',
                max_weight: '',
                min_life_span: '',
                max_life_span: '',
                image: '',
                temperament: []
            }
        })
        navigate('/home')
    }

    return(
        <div className={s.all}>
            <div className={s.div}>
            <h1 className={s.h1}>Create new Breed</h1>
            <NavLink to='/home'><button className={s.home}>Home</button></NavLink>
            <form className={s.form} onSubmit={handleSubmit}>
                <div>
                    <h4>Name</h4>
                    <label>Breed name</label>
                    <input type="text" name="name" value={input.name} onChange= {handleInputChange}/>
                    {error.name && <span>{error.name}</span>}
                </div>
                <div>
                    <h4>Height (inches)</h4>
                    <label>Minimum height</label>
                    <input type="text" name="min_height" value={input.min_height} onChange= {handleInputChange}/>
                    {error.min_height && <span>{error.min_height}</span>}
                </div>
                <div>
                    <label>Maximum height</label>
                    <input type="text" name="max_height" value={input.max_height} onChange= {handleInputChange}/>
                    {error.max_height && <span>{error.max_height}</span>}
                </div>
                <div>
                    <h4>Weight (pounds)</h4>
                    <label>Minimum weight</label>
                    <input type="text" name="min_weight" value={input.min_weight} onChange= {handleInputChange}/>
                    {error.min_weight && <span>{error.min_weight}</span>}
                </div>
                <div>
                    <label>Maximum weight</label>
                    <input type="text" name="max_weight" value={input.max_weight} onChange= {handleInputChange}/>
                    {error.max_weight && <span>{error.max_weight}</span>}
                </div>
                <div>
                    <h4>Life Span (years)</h4>
                    <label>Minimum life span</label>
                    <input type="text" name="min_life_span" value={input.min_life_span} onChange= {handleInputChange}/>
                    {error.min_life_span && <span>{error.min_life_span}</span>}
                </div>
                <div>
                    <label>Maximum life span</label>
                    <input type="text" name="max_life_span" value={input.max_life_span} onChange= {handleInputChange}/>
                    {error.max_life_span && <span>{error.max_life_span}</span>}
                </div> 
                <div>
                    <h4>Image</h4>
                    <label>URL Image</label>
                    <input type="text" name="image" value={input.image} onChange= {handleInputChange}/>
                    {error.image && <span>{error.image}</span>}
                </div>            
                <div>
                    <h4>Temperament</h4>
                    <select className={s.temp} onChange={handleTemperamentSelect}>
                        {temperaments.slice(1,temperaments.length).map(temp=>{
                            return(
                                <option className={s.temp} value={temp.name} key={temp.id}>{temp.name}</option>
                            )
                        })}
                    </select>
                    {error.temperament && <span>{error.temperament}</span>}
                    <div className={s.temp} style={{listStyle:'none'}}>
                        {input.temperament.map(el=>{
                            return(
                                <div key={el}>
                                <span >{el}</span>
                                <button className={s.delete} value={el} onClick={handleDelete}>x</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <button className={s.create} type="submit" disabled={(error.name || error.min_height || error.max_height || error.max_height || error.min_weight || error.max_weight || error.min_life_span || error.max_life_span || error.image) && true}>Create</button>
            </form>
            </div>
        </div>
        
        )   
    
}
