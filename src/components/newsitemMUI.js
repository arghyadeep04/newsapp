import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLiked, selectStarred, selectVisited, selectuserToken } from '../redux/user/user.selector';
import { addToFav, addToLiked, addToSeen, deleteFromFav, getLikeCount, getLiked, getStarred, getVisited, removeLiked } from '../apis';
import { setLiked, setStarred, setVisited } from '../redux/user/user.action';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LikeButton from './likeButton';
import { setMessage, setVisible } from '../redux/alert/alert.action';

const NewsItemMUI=({news,usertoken,setSeen,visited,setFav,starred,liked,setLiked,setAlertVis,setMessage})=> {
  const [likes,setLikes]=React.useState([])
  useEffect(()=>{
    getLikeCount(news.url).then(val=>{

      setLikes(val)
    })
  },[])
  const navigate=useNavigate();
    const handleView=()=>{
      if(usertoken){

        addToSeen(news.url,usertoken).then(()=>{
          getVisited(usertoken,setSeen)
        })
      }
    }
    const handleFav=()=>{
      if(usertoken){
        addToFav(news,usertoken).then(()=>{
          getStarred(usertoken,setFav)
          setMessage({msg:"Added to favourites",type:"success"})
          setAlertVis(true);
        })}
        else{
          navigate('/users/login')
        }
    }
    
    const handleLike=()=>{
      if(usertoken){
        if(liked && !liked.find((e)=>e==news.url)){

          addToLiked(usertoken,news.url).then(()=>{
            getLiked(usertoken,setLiked)
            getLikeCount(news.url).then(val=>{
              setLikes(val)
    
            })
          })
        }else{
          removeLiked(usertoken,news.url).then(()=>{
            getLiked(usertoken,setLiked)
            getLikeCount(news.url).then(val=>{
              setLikes(val)
    
            })
          })
        }
        

      } else{
        navigate("/users/login")
      }
    }


    const handleDelFav=()=>{
      deleteFromFav(news.url,usertoken).then(()=>{
        getStarred(usertoken,setFav)
        setMessage({msg:"Deleted from favourites",type:"success"})
        setAlertVis(true);
      })
    }

    useEffect(()=>{
        console.log("VIS",(visited && visited.find((element) => element==news.url)))
    },[])
  return (
    <>
    <Card sx={{ maxWidth: 545, height:730,border:"1px solid black",position:"relative", backgroundColor:`${visited && visited.find((element) => element==news.url)?"rgb(211, 211, 211)":"white"}` }} >
      <CardActionArea>
        <div className="p-2 flex justify-around">
        {/* <CardMedia
          component="img"
          height={20}
          image={news.urlToImage||"https://cdn.studentzone.in/productfiles/BMP-S1382810/CL-TWC-T15/RunTime/600.CL-TWC-T15.jpg"}
          alt="green iguana"

        /> */}
        <img src={news.urlToImage||"https://cdn.studentzone.in/productfiles/BMP-S1382810/CL-TWC-T15/RunTime/600.CL-TWC-T15.jpg"} alt="" className='h-[40vh] md:h-[43vh] max-h-[45vh]' />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            <span className='font-bold'>{news.title}</span>
          </Typography><br />
          <Typography variant="body2" color="text.secondary">
            {(news.description||"").slice(0,200)+"..."}
          </Typography><br /><br />
          <Typography variant="body3" color="text.secondary">
            By {news.author} <br />At {String(Date(news.publishedAt)).slice(0,21)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleView}>
        <a href={news.url} target='_blank'>View</a>
        </Button>
        {
          (!starred || !starred.find((element) => element.url==news.url))?
        <Button size="small" color="primary" onClick={handleFav}>
          Add To favourites
        </Button>:
        <Button size="small" color="primary" onClick={handleDelFav}>
          Delete from favourites
        </Button>
        }
      <LikeButton liked={(liked && liked.find((e)=>e==news.url))} handleClick={handleLike} likeCount={likes}/>
      </CardActions>
      <div className='text-blue-700 mx-4 border-red-700 border-[1px] text-center rounded-lg absolute bottom-1 block py-1 px-20'>Liked by : {likes.length}</div>
    </Card></>
  );
}

const mapStateToProps=createStructuredSelector({
    usertoken:selectuserToken,
    visited:selectVisited,
    starred:selectStarred,
    liked:selectLiked,
})

const mapDispatchToProps=(dispatch)=>({
    setSeen:(visited)=>dispatch(setVisited(visited)),
    setFav:(fav)=>dispatch(setStarred(fav)),
    setLiked:(liked)=>dispatch(setLiked(liked)),
    setMessage:(obj)=>dispatch(setMessage(obj)),
    setAlertVis:(bool)=>dispatch(setVisible(bool))
})

export default connect(mapStateToProps,mapDispatchToProps)(NewsItemMUI);