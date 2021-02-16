import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LeftBar from "./LeftBar"
import Gramps from "../gramps/Gramps"
import CssBaseline from '@material-ui/core/CssBaseline';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar

}));

export default function Nav() {
  const classes = useStyles();
  
  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Sistema de Gestión de Empleados
          </Typography>
          <Button onClick={()=>{window.location.href="/login"}} color="inherit">Salir</Button>
        </Toolbar>
      </AppBar>
      <LeftBar/>
      <div className={classes.content}>
        <div className={classes.toolbar}/>
        <Gramps/>
      </div> 

    </div>
  );
}

