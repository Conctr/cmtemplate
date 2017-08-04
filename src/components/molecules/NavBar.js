import React from 'react'
import { NavLink } from 'react-router-dom'

export default ({
    isSignedIn = false
}) => (
    <nav>
        <NavLink exact to='/' activeClassName='active'>Home</NavLink>
    </nav>
)
