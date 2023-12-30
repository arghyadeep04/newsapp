import React  from 'react'
// import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { addToFav, addToSeen } from '../apis'
import { createStructuredSelector } from 'reselect'
import { selectuserToken } from '../redux/user/user.selector'
import { connect } from 'react-redux'


const Newsitem =(props)=> {


        const { news } = props
        // console.log(this.props)
        return (
            <div>
                <div className="card mb-3" style={{maxWidth: "540px",minWidth:"300px",height:"500px"}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={news.urlToImage||"/logo512.png"} className="img-fluid rounded-start" alt="/logo512.png"/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{news.title}</h5>
                                <p className="card-text">{news.description}</p>
                                <p className="card-text"><small className="text-muted">By {news.author} At {String(Date(news.publishedAt)).slice(0,21)}</small></p>
                                <p className="card-text"><small className="">Source : {news.source.name} </small></p>

                                <a href={news.url} className='btn btn-primary'>View</a>
                                <button onClick={()=>{addToSeen(news.url,props.usertoken)}}>Add to Seen</button>
                                <button onClick={()=>{addToFav(news,props.usertoken)}}>Add To Fav</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    
}

const mapStateToProps=createStructuredSelector({
    usertoken:selectuserToken
})



export default connect(mapStateToProps)(Newsitem);