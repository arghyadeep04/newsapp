import React from 'react'
import { createStructuredSelector } from 'reselect'
import { selectStarred, selectuserToken } from '../redux/user/user.selector'
import { setStarred, setVisited, setuserToken } from '../redux/user/user.action'
import { connect } from 'react-redux'
import NewsitemMUI from './newsitemMUI'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Favourites=({favourites,usertoken})=> {
  const navigate=useNavigate();
  useEffect(()=>{
    if(!usertoken){
      navigate("/users/login")
    }
  })
  return (
    <div>
        <h1 className='p-3 mt-0 text-4xl'>Favourites</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 grid-flow-row justify-items-center'>
          {/* {this.state.items.map((i, index) => (
            <div style={style} key={index}>
              div - #{index}
            </div>
          ))}
          .slice(count*pageSize,(count+1)*pageSize) */}
          {favourites.map(e=>{
            // console.log(e)
            return(<div className="p-2"><NewsitemMUI news={e} key={e.url}/></div>)
        })}
      </div>
    </div>
  )
}

const mapStateToProps=createStructuredSelector({
    usertoken:selectuserToken,
    favourites:selectStarred,
  
  })
  
  const mapDispatchToProps=(dispatch)=>({
    setUserToken:(token)=>dispatch(setuserToken(token)),
    setVisited:(visited)=>dispatch(setVisited(visited)),
    setFav:(fav)=>dispatch(setStarred(fav))
  
  })
  
export default connect(mapStateToProps,mapDispatchToProps)(Favourites);