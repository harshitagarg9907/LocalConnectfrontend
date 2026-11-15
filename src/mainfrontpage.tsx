import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './Navbar'

function MainPage() {
    return (
        <div className="home-page">

            <NavBar />

            <Outlet />

        </div>
    )
}

export default MainPage