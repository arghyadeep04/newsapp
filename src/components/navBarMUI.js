import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/joi/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { FormControl, Select } from '@mui/material';
import { Link } from 'react-router-dom';
// import { Dropdown, MenuButton } from '@mui/joy';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import { connect } from 'react-redux';
import { setLiked, setStarred, setVisited, setuserToken } from '../redux/user/user.action';
import { selectUsername, selectuserToken } from '../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { setMessage, setVisible } from '../redux/alert/alert.action';
import { Widgets, WidthFull } from '@mui/icons-material';


const pagesUnauth = ['login', 'signup', 'favourites','home'];
const pagesauth = [ 'favourites','home'];


function NavBarMUI({setUserToken,setVisited,setFav,usertoken,setLiked,setMessage,setAlertVisible,username}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout=()=>{
    setUserToken(null)
    setFav([])
    setVisited([])
    setLiked([])
    handleClose()
    setMessage({msg:"Successfully Logged Out",type:"success"})
    setAlertVisible(true)
  }
  return (
    <AppBar position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Newz
          </Typography>


          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Newz
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {(usertoken?pagesauth:pagesUnauth).map((page) => (
              <Link to={page!='home'?`/users/${page}`:"/"}><Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button></Link>
              
            ))}
            {usertoken?
             <Button
                key="logout"
                onClick={handleLogout}
                sx={{ my: 0, color: 'black', display: 'block' }}
              >
                LogOut
              </Button>:<></>
            }


              
          </Box>
          {
              usertoken?
            <div className='text-white px-4 md:px-20 text-center w-max'>Welcome <span className='font-bold'>{username}</span></div>:<></>
            }


          <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{display:{xs:"block",md:"none"},color:"white"}}
      >
        <i className="fa-solid fa-bars" style={{color: "#d8dff3"}}></i>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{display:{xs:"block",md:"none"}}}
      >
        {(usertoken?pagesauth:pagesUnauth).map((page) => (
                <Link to={`/users/${page}`}><MenuItem><Button
                key={page}
                onClick={handleClose}
                sx={{ my: 0, color: 'black', display: 'block' }}
              >
                {page}
              </Button></MenuItem></Link>
              ))}
              {usertoken?

             <MenuItem onClick={handleLogout}><Button  sx={{width:"full"}}>Logout</Button></MenuItem>:<></>
              }
              <MenuItem onClick={handleClose}><Button >Close</Button></MenuItem>
              <MenuItem> <Dropdown>
        <MenuButton
            variant="soft"
            size="lg">
   Catagories
        </MenuButton>
        <Menu
            variant="soft"
            size="lg">
            {["business","entertainment","general","health","science","sports","technology"].map((e)=>{
            return(<MenuItem onClick={handleClose}><Link className="dropdown-item" to={`/${e}`} key={e}>{e}</Link></MenuItem>)
            })}
        </Menu>
      </Dropdown></MenuItem>
      </Menu>


          

      <div className='hidden md:block'>
        <Dropdown>
        <MenuButton
            variant="soft"
            size="lg">
   Catagories
        </MenuButton>
        <Menu
            variant="soft"
            size="lg">
            {["business","entertainment","general","health","science","sports","technology"].map((e)=>{
            return(<MenuItem onClick={handleClose}><Link className="dropdown-item" to={`/${e}`} key={e}>{e}</Link></MenuItem>)
            })}
        </Menu>
      </Dropdown>
      </div>



</Toolbar>
      </Container>
    </AppBar>
  );
}

const mapStateToProps=createStructuredSelector({
  usertoken:selectuserToken,
  username:selectUsername

})

const mapDispatchToProps=(dispatch)=>({
  setUserToken:(token)=>dispatch(setuserToken(token)),
  setVisited:(visited)=>dispatch(setVisited(visited)),
  setFav:(fav)=>dispatch(setStarred(fav)),
  setLiked:(liked)=>dispatch(setLiked(liked)),
  setMessage:(obj)=>dispatch(setMessage(obj)),
  setAlertVisible:(bool)=>dispatch(setVisible(bool))


})

export default connect(mapStateToProps,mapDispatchToProps)( NavBarMUI);