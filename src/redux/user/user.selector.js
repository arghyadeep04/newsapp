import { createSelector } from "reselect"

const userSelector=state=>state.user
export const selectuserToken=createSelector(
    [userSelector],
    (user)=>{
        return user.userToken
    }
)

export const selectStarred=createSelector(
    [userSelector],
    (user)=>{
        return user.starred
    }
)

export const selectVisited=createSelector(
    [userSelector],
    (user)=>{
        return user.visited
    }
)

export const selectLiked=createSelector(
    [userSelector],
    (user)=>{
        return user.liked
    }
)

export const selectUsername=createSelector(
    [userSelector],
    (user)=>{
        return user.username
    }
)