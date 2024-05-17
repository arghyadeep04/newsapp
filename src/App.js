
import logo from './logo.svg';
import './App.css';
import React, { Component, useCallback, useEffect, useState } from 'react'
import Navbar from './components/navbar';
import Newsbox from './components/newsbox';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Newsitem from './components/newsitem';
import Logsign from './components/logsign';
import SignIn from './components/login';
import { SignalCellular4Bar } from '@mui/icons-material';
import signup from './components/signup';
import Signup from './components/signup';
import NavBarMUI from './components/navBarMUI';
import favouritesMUI from './components/favouritesMUI';
import FavouritesMUI from './components/favouritesMUI';
import AlertBarMUI from './components/alertBarMUI';
// if (process.env.NODE_ENV !=="production") {
//   require('dotenv').config()
// }
// import { env } from 'node:process';
const App = (props)=> {
  const [pageSize,setpageSize]=useState(10)
  const [apikey,setaapikey]=useState("a077863c289846cba0854c20c61f3016")
  // constructor() {
  //   super()
  //   this.state = {
  //     pageSize: 10
  //   }
  //   this.apikey="a077863c289846cba0854c20c61f3016"
  // }
  useEffect(()=>{
    console.log("IN APP ",process.env.NEWSAPI_KEY)
  },[])

    const setpgs = (e) => {
      // this.setState({
      //   pageSize: Number(e.target.value)
      // })
      setpageSize(e.target.value)
    }
 
    return (

        <>
       
          <NavBarMUI />
          <AlertBarMUI/>
          {/* <div style={{ display: "flex", justifyContent: "start" }}>
            <label htmlFor="pgs" className='m-3'>News per page  </label>
            <input type="Number" onChange={setpgs} id='pgs' className='m-2' value={pageSize} /></div> */}
          <div>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Routes>
            {["business","entertainment","general","health","science","sports","technology"].map((e)=>{
              return(
            <Route exact path={`/${e}`} element={<Newsbox pageSize={pageSize} country={"in"} catagory={e} apikey={apikey}/>}/>
            
               )
            })}
             <Route path="/" element={<Newsbox pageSize={pageSize} country={"in"} catagory={"general"} apikey={apikey}/>}/>
              <Route exact path='/users' element={<Logsign/>}/> 
              <Route exact path='/users/login' element={<div className='pt-10 mt-0'><SignIn/></div>}/>
              <Route exact path='/users/signup' element={<div className='pt-10 mt-0'><Signup/></div>}/>
              <Route exact path='/users/favourites' element={<FavouritesMUI/>}/>
            </Routes>
          </div>
          {/* <Newsbox pageSize={this.state.pageSize} country={"in"} catagory={""} /> */}
        </>
  
    )

}


export default App;
