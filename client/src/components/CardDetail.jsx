import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadingOn, getDog } from "../actions";
import image from '../imgs/loading.gif'
import { useParams } from "react-router-dom";
import DogDetail from "./DogDetail";
import s from '../styles/CardDetail.module.css'

export default function CardDetail(){

    let params = useParams();

    const dispatch = useDispatch();
    const dog = useSelector(state=> state.dogs)
    const loading = useSelector(state=> state.loading)

    useEffect(() => {
        dispatch(loadingOn());
    }, [dispatch]);

    useEffect(()=>{
        dispatch(getDog(params.id))
    }, [dispatch, params.id]);

    if(loading){
        return(
        <div className={s.divLoad}>
            <img className={s.loading} src={image} alt="loading"></img>
        </div>
        )
    }

    if(dog[0] && dog[0].name === 'Dog not found'){
        return(
            <div>Dog Id not Found</div>
        )
    }

    return(
        <div className={s.all}>
            <div className={s.detail}>
            {dog[0]&&<DogDetail name={dog[0].name} image={dog[0].image} weight={dog[0].weight} height={dog[0].height} life_span={dog[0].life_span} temperament={dog[0].temperament && dog[0].temperament.split(', ')}/>}
            </div>
        </div>
    )
}