import { articles } from "../../data"

export const setnews=async(country,catagory,apikey,pageSize)=>{
    let res=await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${catagory}&pageSize=100&apiKey=${apikey}`)
    let obj=await res.json()
    console.log("OBJ",obj)
    if(!obj.articles) obj.articles=articles
    return (obj.articles)
}

