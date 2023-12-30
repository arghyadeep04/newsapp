import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { connect } from 'react-redux';
import { setLiked, setStarred, setUserName, setuserToken, setVisited } from '../redux/user/user.action';
import { loginUser, signupUser } from '../apis';
import { useNavigate } from 'react-router-dom';
import { setMessage, setVisible } from '../redux/alert/alert.action';
import { selectuserToken } from '../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { useEffect } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        NewsApp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignUp=({setUserToken,setFav,setVisited,setLiked,setMessage,setAlertVis,usertoken,setUsername})=> {
  useEffect(()=>{
    if(usertoken){
      navigate("/");
    //   setMessage({msg:"Alredy Signed In",type:"info"});
    //   setAlertVis(true);
    }
  },[usertoken])
    const navigate=useNavigate()
    const [state,setState]=useState({
        Email:'',
        Password:'',
        Username:'',
    })
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(setUserToken)
        signupUser(state,setUserToken,setVisited,setFav,setLiked,setMessage,setUsername).then(()=>{
          setAlertVis(true)
            if(usertoken){

              navigate("/");
            }else{
              navigate("/users/signup");
            }
        })
    
    }
  const handleChange=(event)=>{
    const {value,name}=event.target
    setState({...state,[name]:value})
    console.log(state);
}
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="Username"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Email"
              label="Email Address"
              name="Email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              {/* {<Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>} */}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

const mapDispatchToProps=(dispatch)=>({
    setUserToken:(token)=>dispatch(setuserToken(token)),
    setVisited:(newsUrl)=>dispatch(setVisited(newsUrl)),
    setFav:(news)=>dispatch(setStarred(news)),
    setLiked:(liked)=>dispatch(setLiked(liked)),
    setMessage:(obj)=>dispatch(setMessage(obj)),
    setAlertVis:(bool)=>dispatch(setVisible(bool)),
    setUsername:(name)=>dispatch(setUserName(name))

})

const mapStateToProps=createStructuredSelector({
  usertoken:selectuserToken
})

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);