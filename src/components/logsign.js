import { Button, TextField } from '@mui/material'
import React, { Component } from 'react'
import { setuserToken } from '../redux/user/user.action'
import { loginUser, signupUser } from '../apis'
import { connect } from 'react-redux'

 class LogSign extends Component {
    constructor(){
        super()
        this.state={
            Email:'',
            Password:'',
            Username:'',
        }
    }
    handleChange=(event)=>{
        const {value,name}=event.target
        this.setState({[name]:value},()=>{  console.log(this.state)})
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        signupUser(this.state,this.props.setUserToken)
    }
  render() {
    // this.state={Email:"",Username:"",Password:""}
    return (
      <div >
        <form action="" className='p-5'>
            <h1>SignUp</h1><br />
              <TextField id="Email" name='Email' label="Email" variant="standard" defaultValue={this.state.Email} onChange={this.handleChange} /><br />
              <TextField id="Username" name='Username' label="Username" variant="standard" onChange={this.handleChange} defaultValue={this.state.Username}/><br />
              <TextField id="Password" name='Password' label="Password" variant="standard" onChange={this.handleChange} defaultValue={this.state.Password}/><br />
              <Button variant="contained" onClick={this.handleSubmit}>SignUp</Button>

        </form>

      </div>
    )
  }
}

const mapDispatchToProps=(dispatch)=>({
    setUserToken:(token)=>dispatch(setuserToken(token)),

})

export default connect(null,mapDispatchToProps)(LogSign);