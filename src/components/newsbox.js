import React, { Component, useEffect, useState } from 'react'
import Newsitem from './newsitem'
import newsNow from '../news'
import InfiniteScroll from "react-infinite-scroll-component";
// import newsNow from '../news'
import PropTypes from 'prop-types'
import LoadingBar from 'react-top-loading-bar';
import { createStructuredSelector } from 'reselect';
import { selectLoading, selectNewsNow } from '../redux/news/news.selector';
import { setNews, toggleLoading } from '../redux/news/news.action';
import { connect } from 'react-redux';
import { setnews } from '../redux/news/news.utils';
import NewsItemMUI from './newsitemMUI';
import NavigateTopButton from './navigateTopButton';
// const dotenv=require('dotenv')

 const Newsbox =({newsNow,loading,setNews,setloading,country,catagory,apikey,pageSize})=> {
  // const [newsNow,setnewsNow]=useState([])
  // const [loading,setloading]=useState(true)
  const [count,setcount]=useState(0)
  const [newsShowing,setnewsShowing]=useState([])
  const [showTop,setShowtop]=useState(false);
  // constructor(props){
  //   super(props)
  //   this.state={
  //     newsNow:[],
  //     loading:true,
  //     count:0,
  //     newsShowing:[]
  //   }
  //   document.title=props.catagory
  // }
  useEffect(()=>{
    document.title=catagory
    // console.log(props.apikey)

    setnews(country,catagory,apikey,pageSize).then(articles=>{
        setloading()
        setNews(articles)
        setnewsShowing(articles.slice(0,10))
        console.log("NEWSNOW",newsShowing)
    })
    // fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&pageSize=100&apiKey=${props.apikey}`)
    // .then(res=>{
    //   res.json().then(obj=>{
    //     console.log(props.catagory)
    //     // this.setState({
    //     //   newsNow:obj.articles,
    //     //   loading:false,
    //     // })
    //     setnewsNow(obj.articles)
    //     setloading(false)
    //     // this.setState({
    //     //   newsShowing:this.state.newsNow.slice(0,props.pageSize)
    //     // })
    //     setnewsShowing(obj.articles.slice(0,props.pageSize))
    //   })
    // })

  },[catagory])

    
    // const prev=()=>{
    //   if (count==0) {
    //     return;
    //   }
    //   this.setState({
    //     count:count-1,
        
    //   })
// console.log(count)
//     }
    const fetchMoreData = () => {
      // console.log((newsNow && newsNow.length))
      // a fake async api call like which sends
      // 20 more records in 1.5 secs
      setTimeout(() => {
        // this.setState({
        //   newsShowing: this.state.newsShowing.concat(this.state.newsNow.slice((count+1)*props.pageSize,(count+2)*props.pageSize)),
        //   count:count+1
        // });
        setnewsShowing(newsShowing.concat(newsNow.slice((count+1)*pageSize,(count+2)*pageSize)))
        setcount(count+1)
      }, 1500);
    };
    // const next=()=>{
    //   if(this.count>=Math.floor(this.state.newsNow.length/pageSize)-1){
    //     return;
    //   }
    //   this.setState({
    //     count:count+1,
    //   })
    //   console.log(count)
    // }
    // console.log(this.state.newsNow)
    return (
      <>
         <LoadingBar
        color='red'
        progress={loading?0:100}
        onLoaderFinished={() => {setloading()}}
      />
                <h1 className='m-3 pt-10 text-center text-3xl border-[2px] rounded-full border-blue-700 py-2'>News - {catagory}</h1>

      
        
            <InfiniteScroll
          dataLength={newsShowing.length||0}
          next={fetchMoreData}
          hasMore={count<=Math.floor((newsNow.length)/pageSize)-1}
          loader={<><div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div></>}
        >

{/* style={{display:'grid',gridTemplateColumns:"auto auto",columnGap:"5px",margin:"5px",padding:"5vw",justifyItems:"center"}} */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 grid-flow-row justify-items-center'>
          {/* {this.state.items.map((i, index) => (
            <div style={style} key={index}>
              div - #{index}
            </div>
          ))}
          .slice(count*pageSize,(count+1)*pageSize) */}
          {newsShowing.map(e=>{
            // console.log(e)
            return(<div className="p-2"><NewsItemMUI news={e} key={e.url}/></div>)
        })}
      </div>
        </InfiniteScroll>
        <NavigateTopButton/>
         
       {/* <div className='d-flex justify-around m-2 p-2' style={{display:"flex",justifyContent:"space-around",width:"100vw"}}>
       <button className='btn btn-primary' onClick={prev} disabled={count==0}>Previous</button>
       <button className='btn btn-primary'onClick={next} disabled={count>=Math.floor(this.state.newsNow.length/pageSize)}>Next</button>

     </div> */}
     </>
    )

}

Newsbox.propTypes = {
  apikey: PropTypes.string,
  catagory:PropTypes.string,
  pageSize:PropTypes.number
}

const mapStateToProps=state=>({
  newsNow:state.news.newsnow,
  loading:state.news.loading,
})

const mapDispatchToProps=(dispatch)=>({
    setNews:(newsget)=>dispatch(setNews(newsget)),
    setloading:()=>dispatch(toggleLoading())
})

export default connect(mapStateToProps,mapDispatchToProps)(Newsbox)