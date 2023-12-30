import React from 'react'
import { Link ,Router} from 'react-router-dom';

const Navbar = (props)=> {
 
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">Link</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Catagory
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            {/* <Router> */}
          {["business","entertainment","general","health","science","sports","technology"].map((e)=>{
            return(<Link className="dropdown-item" to={`/${e}`} key={e}>{e}</Link>)
          })}
            {/* </Router> */}
            
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="/" tabIndex="-1"  aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
      </div>
    )
  
}
export default Navbar;