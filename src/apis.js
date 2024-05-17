const host=`https://newsappbackend-667m.onrender.com`;
export const loginUser=async(form,setuserToken,setVisited,setFav,setLiked,selectAlertMessage,setUserName)=>{
    let respons=await fetch(`${host}/users/login`, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type':'application/json; charset=utf-8'

        },
        body:JSON.stringify(form),
        cache: 'default'
      })
    let json=await respons.json();
    console.log(json);
    if(json.error){
        selectAlertMessage({msg:"Login Failed",type:"error"})
    }else{
        setuserToken(json.token)
        setUserName(json.username)
        await getStarred(json.token,setFav)
        await getVisited(json.token,setVisited)
        await getLiked(json.token,setLiked)
        selectAlertMessage({msg:"Successfully logged in",type:"success"})
        // history('/')
    }
}

export const logoutUser=(setuserToken)=>{
        setuserToken(null)
    }

export const signupUser=async(form,setuserToken,setVisited,setFav,setLiked,setAlertMessage,setUserName)=>{
        let respons=await fetch(`${host}/users/register`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type':'application/json; charset=utf-8'
    
            },
            body:JSON.stringify(form),
            cache: 'default'
          })
        let json=await respons.json();
        console.log(json);
        if(json.error){
            // setalert({message:json.error,type:'danger'})
            setAlertMessage({msg:"SignUp failed",type:"error"})
        }else{
            setuserToken(json.token)
            setUserName(json.username)
            await getStarred(json.token,setFav)
            await getVisited(json.token,setVisited)
            await getLiked(json.token,setLiked)
            // setalert({message:"SignUp successful",type:"success"})
           setAlertMessage({msg:'Signup successful',type:"success"})
        }
    }

export const addToFav=async(news,userToken)=>{
    let respons=await fetch(`${host}/users/addToFav`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type':'application/json; charset=utf-8',
                'userToken': userToken,
    
            },
            body:JSON.stringify({news}),
            cache: 'default'
          })
        let json=await respons.json();
        console.log(json);
        if(json.status=="error"){
            alert("error");
        }
    
}

export const deleteFromFav=async(newsUrl,userToken)=>{
    let respons=await fetch(`${host}/users/delFromFav`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type':'application/json; charset=utf-8',
                'userToken': userToken,
    
            },
            body:JSON.stringify({newsUrl}),
            cache: 'default'
          })
        let json=await respons.json();
        console.log(json);
        if(json.status=="error"){
            alert("error");
        }
    
}

export const addToSeen=async(newsUrl,userToken)=>{
    let respons=await fetch(`${host}/users/addToSeen`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type':'application/json; charset=utf-8',
                'userToken': userToken,
    
            },
            body:JSON.stringify({newsUrl}),
            cache: 'default'
          })
        let json=await respons.json();
        console.log(json);
        if(json.status=="error"){
            alert("error");
        }
    
}

export const getStarred= async(userToken,setStarred)=>{
    let respons=await fetch(`${host}/users/getFav`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type':'application/json; charset=utf-8',
                'userToken': userToken,
    
            },
            // body:JSON.stringify({newsUrl}),
            cache: 'default'
          })
        let json=await respons.json();
        console.log(json);
        setStarred(json.starred);
        if(!json.starred){
            alert("error");
        }
}

export const getVisited= async(userToken,setVisited)=>{
    let respons=await fetch(`${host}/users/getVisited`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type':'application/json; charset=utf-8',
                'userToken': userToken,
    
            },
            // body:JSON.stringify({newsUrl}),
            cache: 'default'
          })
        let json=await respons.json();
        console.log(json);
        setVisited(json.visited);
        if(!json.visited){
            alert("error");
        }
}

export const getLiked= async(userToken,setLiked)=>{
    let respons=await fetch(`${host}/users/getLiked`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type':'application/json; charset=utf-8',
                'userToken': userToken,
    
            },
            // body:JSON.stringify({newsUrl}),
            cache: 'default'
          })
        let json=await respons.json();
        console.log(json);
        setLiked(json.liked);
        if(!json.liked){
            alert("error");
        }
}

export const addToLiked=async(userToken,newsUrl)=>{
    let respons=await fetch(`${host}/likes/addToLiked`, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type':'application/json; charset=utf-8',
            'userToken': userToken,

        },
        body:JSON.stringify({newsUrl}),
        cache: 'default'
      })
    let json=await respons.json();
    console.log(json);
    // setLiked(json.liked);
    if(json.status!="done"){
        alert("error");
    }
}

export const removeLiked=async(userToken,newsUrl)=>{
    let respons=await fetch(`${host}/likes/removeLike`, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type':'application/json; charset=utf-8',
            'userToken': userToken,

        },
        body:JSON.stringify({newsUrl}),
        cache: 'default'
      })
    let json=await respons.json();
    console.log(json);
    // setLiked(json.liked);
    if(json.status!="done"){
        alert("error");
    }
}

export const getLikeCount=async(newsUrl)=>{
    let respons=await fetch(`${host}/likes/getLikeCount`, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type':'application/json; charset=utf-8',

        },
        body:JSON.stringify({newsUrl}),
        cache: 'default'
      })
    let json=await respons.json();
    console.log(newsUrl,json);
    // if(!json.likers){
        // alert("error");
    // }
    return json.likers;
}
