import { userActionTypes } from "./user.types"

export const setuserToken=(token)=>{
    return {type:userActionTypes.setuserToken,payload:token}
}

export const setStarred=(starred)=>{
    return {type:userActionTypes.setStarred,payload:starred}
}

export const setVisited=(visited)=>{
    return {type:userActionTypes.setSeen,payload:visited}
}

export const setLiked=(liked)=>{
    return {type:userActionTypes.setLiked,payload:liked}
}

export const setUserName=(name)=>{
    return {type:userActionTypes.setName,payload:name}
}