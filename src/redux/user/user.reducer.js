// import { setnews } from "./news.utils";

import { userActionTypes } from "./user.types";

const defaultState={userToken:null,visited:[],starred:[],liked:[],username:null};

export const userReducer=(currentState=defaultState,action)=>{
    switch (action.type) {
        case userActionTypes.setuserToken:
            return {...currentState,userToken:action.payload}
        case userActionTypes.setSeen:
            return {...currentState,visited:action.payload}
        case userActionTypes.setStarred:
            return {...currentState,starred:action.payload}
        case userActionTypes.setLiked:
            return {...currentState,liked:action.payload}
        case userActionTypes.setName:
            return {...currentState,username:action.payload}
        default:
            return currentState
    }
}