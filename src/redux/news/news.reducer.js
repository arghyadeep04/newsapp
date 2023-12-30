import { setnews } from "./news.utils";

const defaultState={newsnow:[],loading:false};

export const newsReducer=(currentState=defaultState,action)=>{
    switch (action.type) {
        case 'SetNews':
            return {...currentState,newsnow:action.payload.newsget};
        case 'toggleloading':
            return {...currentState,loading:!currentState.loading}
        default:
            return currentState
    }
}