import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PersonIcon from '@material-ui/icons/Person';
import InfoIcon from '@material-ui/icons/Info';
import GroupIcon from '@material-ui/icons/Group';
import WorkIcon from '@material-ui/icons/Work';
import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles((theme) =>({

  buttonAccordion:{
    marginTop:"-35px",
    marginBot:"-35px",
    marginLeft:"25px",
  },
  ItemText:{
    marginLeft:"-25px"
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  drawerPaper: {
    width: 240,
  },
}));

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();

  console.log("props: ",props)

  console.log("usuarioToken[0]: ",props.usuarioToken[0]) // usuario
  console.log("usuarioToken[1]: ",props.usuarioToken[1]) // token

  return (
    <div>

<Drawer
    className={classes.drawer}
    variant="permanent"
    classes={{
        paper: classes.drawerPaper,
    }}
>
    <Toolbar />
        <div className={classes.drawerContainer}>
            <List>
            {props.usuarioToken[0].rolID == 1 ? //Solo puede entrar administrador
            <Accordion
            defaultExpanded={false}
            >
                <AccordionSummary 
                aria-controls="panel1a-content"
                id="panel1a-header" 
                >
                    <ListItem>
                        <ListItemIcon>
                            <PersonIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText}>
                            <b>Clientes</b>
                        </ListItemText>
                    </ListItem>
                </AccordionSummary>
                <AccordionDetails className={classes.buttonAccordion}>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/lista-clientes">
                        <ListItemIcon>
                            <ListIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Ver lista"/>
                    </ListItem>
                </AccordionDetails>
                <AccordionDetails className={classes.buttonAccordion}>
                    <ListItem button 
                        component={Link} 
                        to="/nuevo-cliente" >
                        <ListItemIcon><AddIcon /></ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Agregar"/>
                    </ListItem>
                </AccordionDetails>
            </Accordion> : <div></div>
            }

            <Accordion
            defaultExpanded={false}
            >
                <AccordionSummary 
                aria-controls="panel1a-content"
                id="panel1a-header" 
                >
                    <ListItem>
                        <ListItemIcon>
                            <PlaylistAddCheckIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText}>
                            <b>Tareas</b>
                        </ListItemText>
                    </ListItem>
                </AccordionSummary>
                <AccordionDetails className={classes.buttonAccordion}>
                    <ListItem 

                    button 
                    component={Link} 
                    to="/lista-tareas">
                        <ListItemIcon>
                            <ListIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Ver lista"/>
                    </ListItem>
                </AccordionDetails>
                
                {props.usuarioToken[0].rolID !== 3 ? <AccordionDetails className={classes.buttonAccordion}>
                <ListItem button component={Link} to="/nueva-tarea" >
                        <ListItemIcon><AddIcon /></ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Agregar"/>
                    </ListItem>
                </AccordionDetails> : <div></div> }
                {props.usuarioToken[0].rolID !== 2 ? //solo puede entrar el Empleado
                <AccordionDetails className={classes.buttonAccordion}>
                <ListItem button component={Link} to="/carga-horas-tarea" >
                        <ListItemIcon><AddIcon /></ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Cargar horas"/>
                    </ListItem>
                </AccordionDetails>: <div></div>}
            </Accordion>

            {props.usuarioToken[0].rolID !== 3 ?
            <Accordion
            defaultExpanded={false}
            >
                <AccordionSummary 
                aria-controls="panel1a-content"
                id="panel1a-header" 
                >
                    <ListItem>
                        <ListItemIcon>
                            <WorkIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText}>
                            <b>Proyectos</b>
                        </ListItemText>
                    </ListItem>
                </AccordionSummary>
                <AccordionDetails  className={classes.buttonAccordion}>
                    <ListItem 
                    button 
                    component={Link} 
                    to="/lista-proyectos">
                        <ListItemIcon>
                            <ListIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Ver lista"/>
                    </ListItem>
                </AccordionDetails>
                <AccordionDetails className={classes.buttonAccordion}>
                    <ListItem button component={Link} to="/nuevo-proyecto" >
                        <ListItemIcon><AddIcon /></ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Agregar"/>
                    </ListItem>
                </AccordionDetails>
            </Accordion> : <div></div>}

            {props.usuarioToken[0].rolID === 1 ? <Accordion
            defaultExpanded={false}
            >
                <AccordionSummary 
                aria-controls="panel1a-content"
                id="panel1a-header" 
                >
                    <ListItem>
                        <ListItemIcon>
                            <GroupIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText}>
                            <b>Empleados</b>
                        </ListItemText>
                    </ListItem>
                </AccordionSummary>
                <AccordionDetails  className={classes.buttonAccordion}>
                    <ListItem 
                    button 
                    component={Link} 
                    to="/lista-empleados">
                        <ListItemIcon>
                            <ListIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Ver lista"/>
                    </ListItem>
                </AccordionDetails>
                <AccordionDetails className={classes.buttonAccordion}>
                <ListItem button component={Link} to="/nuevo-empleado" >
                        <ListItemIcon><AddIcon /></ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Agregar"/>
                    </ListItem>
                </AccordionDetails>
            </Accordion> :<div></div>}

            {props.usuarioToken[0].rolID === 1 ? <Accordion
            defaultExpanded={false}
            >
                <AccordionSummary 
                aria-controls="panel1a-content"
                id="panel1a-header" 
                >
                    <ListItem>
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText}>
                            <b>Perfiles</b>
                        </ListItemText>
                    </ListItem>
                </AccordionSummary>
                <AccordionDetails className={classes.buttonAccordion}>
                <ListItem button component={Link} to="/lista-perfiles" >
                        <ListItemIcon><ListIcon/></ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Ver lista"/>
                    </ListItem>
                </AccordionDetails>
                <AccordionDetails className={classes.buttonAccordion}>
                <ListItem button component={Link} to="/nuevo-perfil" >
                        <ListItemIcon><AddIcon /></ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Agregar"/>
                    </ListItem>
                </AccordionDetails>
            </Accordion> : <div></div>}

            {props.usuarioToken[0].rolID !== 3 ?<Accordion
            defaultExpanded={false}
            >
                <AccordionSummary 
                aria-controls="panel1a-content"
                id="panel1a-header" 
                >
                    <ListItem>
                        <ListItemIcon>
                            <InfoIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText}>
                            <b>Informes</b>
                        </ListItemText>
                    </ListItem>
                </AccordionSummary>
                <AccordionDetails className={classes.buttonAccordion}>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/semanal-ob">
                        <ListItemIcon>
                            <ListIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Hs ob de la semana"/>
                    </ListItem>
                </AccordionDetails>
                <AccordionDetails className={classes.buttonAccordion}>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/hs-trab-proy">
                        <ListItemIcon>
                            <ListIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Hs trabajadas por proyecto"/>
                    </ListItem>
                </AccordionDetails>
                <AccordionDetails className={classes.buttonAccordion}>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/hs-trab-emp-per">
                        <ListItemIcon>
                            <ListIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Hs trabajadas por empleado"/>
                    </ListItem>
                </AccordionDetails>
                <AccordionDetails className={classes.buttonAccordion}>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/hs-adeudadas">
                        <ListItemIcon>
                            <ListIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Hs adeudadas"/>
                    </ListItem>
                </AccordionDetails>
                {/*}
                <AccordionDetails  className={classes.buttonAccordion}>
                    <ListItem 
                    button 
                    component={Link} 
                    to="/lista-perfiles">
                        <ListItemIcon>
                            <ListIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Ver lista"/>
                    </ListItem>
                </AccordionDetails>
                
                <AccordionDetails className={classes.buttonAccordion}>
                <ListItem button component={Link} to="/nuevo-perfil" >
                        <ListItemIcon><AddIcon /></ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Agregar"/>
                    </ListItem>
                </AccordionDetails>
                */}
            </Accordion> : <div></div>}
            {props.usuarioToken[0].rolID !== 3 ? <Accordion
            defaultExpanded={false}
            >
                <AccordionSummary 
                aria-controls="panel1a-content"
                id="panel1a-header" 
                >
                    <ListItem>
                        <ListItemIcon>
                            <AssignmentIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText}>
                            <b>Liquidación</b>
                        </ListItemText>
                    </ListItem>
                </AccordionSummary>
                <AccordionDetails className={classes.buttonAccordion}>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/pedir-liquidacion">
                        <ListItemIcon>
                            <ListIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.ItemText} primary="Liquidar"/>
                    </ListItem>
                </AccordionDetails>
                
            </Accordion> : <div></div>}
        </List>
    </div>
        
    </Drawer>
    </div>
  );
}
