import React from 'react'
import {Link} from 'react-router-dom';
import {AppBar, Tabs, Tab, Toolbar} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import StatsIcon from '@material-ui/icons/Poll';

export default class Nav extends React.Component {

    handleClickHome(e){
        e.preventDefault();
        this.props.history.push("/cas/stats")
      }
  render() {
    return (
      <AppBar title={<img
        src={"../res/extraterrestre-soucoupe-volante-espace.jpg"}
        alt=" Logo"
        />}>
      <Toolbar>
        <Tabs>
        <Link to={'/cas/stats/'}>
        <IconButton >
            <HomeIcon />
          </IconButton>
        </Link>

        <IconButton>
            <StatsIcon />
        </IconButton>

        </Tabs>
       </Toolbar> 
      </AppBar>
    )
  }
}

