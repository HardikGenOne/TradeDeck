import React from 'react'
import logo from "../../assets/logo.jpg"
// import "../styles/navBar.css"
export default function NavBar() {
return (
    <div className='navBar'>
        <div className='left'>
            <div>
                <img src = {logo} alt='Logo'></img>
                <p>GenOne Stock Analyser</p>
            </div>
            <div>
                <a>Dashboard</a>
                <a>Portfolio</a>
                <a>Heat Map</a>
            </div>
        </div>
        <div className='right'>
            <button className='login' onClick={()=>window.location.href="/login"}>Log In</button>
            <button classname="Signup" onClick={()=>window.location.href="/signup"}>Sign Up</button>
        </div>
    </div>
  )
}
