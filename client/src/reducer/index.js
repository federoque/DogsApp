
const initialState = {
    dogs: [],
    temperaments: [],
    loading: false,
    filterDogs: [],
    searchDogs: [],
    search: false
}

export default function reducer(state = initialState, action) {

    if(action.type === 'GET_DOGS'){
        return {
            ...state,
            loading: false,
            dogs: action.payload,
            filterDogs: action.payload
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

    if(action.type === 'SEARCH_DOGS'){
        return{
            ...state,
            loading: false,
            searchDogs: action.payload,
            filterDogs: action.payload,
            search: true
        }
    }

    if(action.type === 'FILTERS'){
        const allDogs = state.search ? state.searchDogs : state.dogs
        if(action.payload.temperament === 'All' && action.payload.createOrApi === 'All'){
            state= {
                ...state,
                filterDogs: allDogs
            }
        }
        if(action.payload.temperament !== 'All' && action.payload.createOrApi === 'All'){
            const noNullTemp = [];
            for(let i=0; i<allDogs.length; i++){
            if(allDogs[i].temperament) noNullTemp.push(allDogs[i])
            }
            const dogsByTemperament =  noNullTemp.filter(dog=> dog.temperament.includes(action.payload.temperament))
            state = {
                ...state,
                filterDogs: dogsByTemperament
            }
        }

        if(action.payload.temperament === 'All' && action.payload.createOrApi !== 'All'){
            state = {
                ...state,
                filterDogs: action.payload.createOrApi === 'Created' ? allDogs.filter(dog => dog.generated_by_user) : allDogs.filter(dog => !dog.generated_by_user)
            }
        }

        if(action.payload.temperament !== 'All' && action.payload.createOrApi !== 'All'){
            const noNullTemp = [];
            for(let i=0; i<allDogs.length; i++){
            if(allDogs[i].temperament) noNullTemp.push(allDogs[i])
            }
            const dogsByTemperament =  noNullTemp.filter(dog=> dog.temperament.includes(action.payload.temperament))
            const dogsByTemperamentFiltered = action.payload.createOrApi === 'Created' ? dogsByTemperament.filter(dog => dog.generated_by_user) : dogsByTemperament.filter(dog => !dog.generated_by_user)

            state = {
                ...state,
                filterDogs: dogsByTemperamentFiltered
            }
        }

            function SortArrayAsc(x, y){
                if (x.name < y.name) {return -1;}
                if (x.name > y.name) {return 1;}
                return 0;
            }
            function SortArrayDesc(x, y){
                if (x.name < y.name) {return 1;}
                if (x.name > y.name) {return -1;}
                return 0;
            }
            if(action.payload.alphabeticalOrder === 'A-Z'){
                state = {
                    ...state,
                    filterDogs: state.filterDogs.sort(SortArrayAsc)
                }
            }
            if(action.payload.alphabeticalOrder === 'Z-A'){
                state = {
                    ...state,
                    filterDogs: state.filterDogs.sort(SortArrayDesc)
                } 
            }

            function SortArrayAscW(x, y){
                if (parseInt(x.weight.slice(0,4)) < parseInt(y.weight.slice(0,4))) {return -1;}
                if (parseInt(x.weight.slice(0,4)) > parseInt(y.weight.slice(0,4))) {return 1;}
                return 0;
            }
            function SortArrayDescW(x, y){
                if (parseInt(x.weight.slice(0,4)) < parseInt(y.weight.slice(0,4))) {return 1;}
                if (parseInt(x.weight.slice(0,4)) > parseInt(y.weight.slice(0,4))) {return -1;}
                return 0;
            }
            if(action.payload.weightOrder === 'less'){
                return{
                    ...state,
                    filterDogs: state.filterDogs.sort(SortArrayAscW)
                }
            }
            if(action.payload.weightOrder === "high"){
                return{
                    ...state,
                    filterDogs: state.filterDogs.sort(SortArrayDescW)
                } 
            }
        // }
    }

    if(action.type === 'CREATE_BREED'){
        return{
            ...state
        }
    }

    return state;
}