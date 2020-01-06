import React from 'react';
import {NavLink} from 'react-router-dom';
import './styles/navbar.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

const Navbar = () => {
    return(
        <AppBar position="static" style={{height: 70, backgroundColor:'black'}} >
        <Toolbar>
        <Typography variant="h6" className="title-container" style={{marginRight: 40}}>
          <h2 className="title" style={{marginRight: 10}}>BookMyEvent</h2><EventAvailableIcon style={{fontSize:40, marginTop:30}} />
        </Typography>
          <div className="link-container">
          <NavLink className="link" to="/event">
            <div style={{margin: 10}}><p className="link-title">Events</p></div>
          </NavLink>
          <NavLink className="link" to="/booking">
            <div style={{margin: 10}}><p className="link-title">Bookings</p></div>
          </NavLink>
          <NavLink className="link" to="/auth">
            <div style={{margin: 10}}><p className="link-title">Profile</p></div>
          </NavLink>
          </div>
        </Toolbar>
        </AppBar>
    )
}

export default Navbar;