
const initialState = {
    dogs: [],
    temperaments: [],
    loading: false
}

export default function reducer(state = initialState, action) {
    if(action.type === 'GET_DOGS'){
        return {
            ...state,
            loading: false,
            dogs: action.payload
        }
    }
    
    if(action.type === 'GET_DOG'){
        return {
            ...state,
            loading: false,
            dogs: action.payload
        }
    }

    if(action.type === 'GET_TEMPERAMENTS'){
        return {
            ...state,
            temperaments: action.payload
        }
    }
    if(action.type === 'LOADING_ON'){
        return{
            ...state,
            loading: true
        }
    }
  
    return state;
}

