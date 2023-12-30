import { Button } from '@mui/material'
import React from 'react'

export default function LikeButton({liked,handleClick,likeCount}) {
  return (
    <div className='mx-3'>
      <Button onClick={handleClick} variant={liked?"contained":"outlined"}>{liked?"UnLike":"Like"} <i className={`fa-${liked?"solid":"regular"} fa-thumbs-up`} style={{color: "#8a0000",}} ></i>
      <br /></Button>
        
    </div>
  )
}
