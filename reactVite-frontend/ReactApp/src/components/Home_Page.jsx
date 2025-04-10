import React from 'react'
import NavBar from './small_components/navBar'
import ScrollAnimation from './small_components/ScrollAnimation'
export default function Home_Page() {
  return (
    <div style={{ margin: 0, padding: 0, width: '100vw', height: '100vh', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <NavBar />
    <ScrollAnimation />
    
    </div>
  )
}
