import React from 'react'
import { Outlet, NavLink,Link } from "react-router-dom";
import '../Style/Navbar.css'


const Navbar = () => {
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" id='heading-nav' href="#">Aayush</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <NavLink to='Home' aria-current="page" href="#" id='Navbar'>Home</NavLink>
        </li>

        <li class="nav-item">
          <NavLink to="/Registration" id='Navbar' class="nav-link active" aria-current="page" href="#">Registration</NavLink>
        </li> 

        <li class="nav-item">
          <NavLink to="/Login" id='Navbar' class="nav-link active" aria-current="page" href="#">Login</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
<Outlet/>
    </div>
  )
}

export default Navbar
