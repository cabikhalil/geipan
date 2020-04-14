import React from 'react'
import {Link} from 'react-router-dom';
import {AppBar, Tabs, Tab, Toolbar} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import StatsIcon from '@material-ui/icons/Poll';
import logo from '../res/extraterrestre-soucoupe-volante-espace.jpg';
import lblue from '@material-ui/core/colors/lightBlue';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default class Nav extends React.Component {

    handleClickHome(e){
        e.preventDefault();
        this.props.history.push("/cas/stats")
      }
  render() {
    return (
      <AppBar title="Bienvenue sur le site du Geipan" >
        <Toolbar>
       
        <Grid container>
        <Grid item xs={9}>
        
        <Tabs>
        

        <IconButton>
        <Link to={'/'}>
            <HomeIcon style={{color:"white"}} />
        </Link>
        </IconButton>
        

        <IconButton>
        <Link to={'/cas/stats'}>
            <StatsIcon style={{color:"white"}} />
        </Link>    
        </IconButton>

        </Tabs>
        </Grid>
        <Grid item xs={3}>
        
          <IconButton>
          
          <Typography variant="h5" style={{color:"white"}} >
          Site du Geipan
          </Typography>
          <img alt="logo" src={logo} style={{width:"15%",height:"15%"}} />
          </IconButton>
        
        </Grid>
          </Grid> 
        </Toolbar>
      </AppBar>
    )
  }
}

