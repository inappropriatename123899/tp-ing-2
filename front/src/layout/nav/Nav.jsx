import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LeftBar from "./LeftBar"
import Gramps from "../gramps/Gramps"
import CssBaseline from '@material-ui/core/CssBaseline';
import { useLocation } from 'react-router-dom'
import axios from "axios";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor:"#7d7d7d",
    height:"100vh"
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
    display:"flex",
    alignContent:"center",
    alignSelf:"center",
    justifyContent:"center"    
  },
  toolbar: theme.mixins.toolbar

}));

function nameRoutes (link){
  switch (link) {
    case "/lista-proyectos":
      return " - Lista de proyecto";
      break;
    case "/nuevo-proyecto":
      return " - Nuevo proyecto";
      break;
    case "/lista-tareas":
      return " - Lista de tareas";
      break;
    case "/nueva-tarea":
      return " - Nueva tareas";
      break;
    case "/lista-clientes":
      return " - Lista de clientes";
      break;
    case "/nuevo-cliente":
      return " - Nuevo cliente";
      break;
    case "/lista-empleados":
      return " - Lista de empleados";
      break;
    case "/nuevo-empleado":
      return " - Nuevo empleado";
      break;
    case "/informes":
      return " - Informes";
      break;
    case "/nuevo-perfil":
      return " - Nuevo perfil";
      break;
    case "/lista-perfiles":
      return " - Lista de perfiles";
      break;
    case "/carga-horas-tarea":
      return " - Carga de horas";
      break;
      case "/pedir-liquidacion":
        return " - Liquidación";
        break;

    default:
      break;
  }
}

const Nav = (props) => {

  const [loggedUser,setLoggedUser] = useState([]);
  const [loadLoggedUser,setLoadLoggedUser] = useState(false);

  console.log("perfiles: ",loggedUser)
  console.log("load: ",loadLoggedUser)

  const fetchLoggedUser = async () => {
    axios.get("http://localhost:27195/api/Empleados/DameMisDatos",
    {headers: {Authorization: `Bearer ${props.token}`} 
    }).then((response)=>{
      setLoggedUser(response.data);
      setLoadLoggedUser(false);
      console.log("response: ",response)
    }).catch((error)=>{
      console.error("Error pidiendo datos: ",error);
      setLoadLoggedUser(false)
    }); 
  }

  useEffect(() => {
    // perfiles
    setLoadLoggedUser(true);
    fetchLoggedUser();
  }, [])



  const classes = useStyles();
  
  let link = useLocation()

  return (
    !loadLoggedUser && (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Sistema de Gestión de Empleados {nameRoutes(link.pathname)}
          </Typography>
          <Button onClick={()=>{window.location.href="/login"}} color="inherit">Salir</Button>
        </Toolbar>
      </AppBar>
      <LeftBar usuario={loggedUser}/>
      <div className={classes.content}>
        <div className={classes.toolbar}/>
        <Gramps usuario={loggedUser}/>
      </div> 
    </div>)
  );
};

export default Nav;