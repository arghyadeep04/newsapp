import { createSelector } from "reselect"

const newsSelector=state=>state.news
export const selectNewsNow=createSelector(
    [newsSelector],
    (news)=>{
        return news.newsnow
    }
)

export const selectLoading=createSelector(
    [newsSelector],
    (news)=>{
        return news.loading
    }
)