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

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();


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
              <Accordion
              defaultExpanded={true}
              >
                  <AccordionSummary 
                   aria-controls="panel1a-content"
                   id="panel1a-header" 
                  >
                      <ListItem>
                          <ListItemIcon>
                              <InboxIcon/>
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
                              <InboxIcon/>
                          </ListItemIcon>
                          <ListItemText className={classes.ItemText} primary="Ver lista"/>
                      </ListItem>
                  </AccordionDetails>
                  <AccordionDetails className={classes.buttonAccordion}>
                      <ListItem button 
                          component={Link} 
                          to="/nuevo-cliente" >
                          <ListItemIcon><InboxIcon /></ListItemIcon>
                          <ListItemText className={classes.ItemText} primary="Agregar"/>
                      </ListItem>
                  </AccordionDetails>
              </Accordion>
  
              <Accordion
              defaultExpanded={true}
              >
                  <AccordionSummary 
                   aria-controls="panel1a-content"
                   id="panel1a-header" 
                  >
                      <ListItem>
                          <ListItemIcon>
                              <InboxIcon/>
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
                              <InboxIcon/>
                          </ListItemIcon>
                          <ListItemText className={classes.ItemText} primary="Ver lista"/>
                      </ListItem>
                  </AccordionDetails>
                  <AccordionDetails className={classes.buttonAccordion}>
                  <ListItem button component={Link} to="/nuevo-tarea" >
                          <ListItemIcon><InboxIcon /></ListItemIcon>
                          <ListItemText className={classes.ItemText} primary="Agregar"/>
                      </ListItem>
                  </AccordionDetails>
              </Accordion>
  
              <Accordion
              defaultExpanded={true}
              >
                  <AccordionSummary 
                   aria-controls="panel1a-content"
                   id="panel1a-header" 
                  >
                      <ListItem>
                          <ListItemIcon>
                              <InboxIcon/>
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
                              <InboxIcon/>
                          </ListItemIcon>
                          <ListItemText className={classes.ItemText} primary="Ver lista"/>
                      </ListItem>
                  </AccordionDetails>
                  <AccordionDetails className={classes.buttonAccordion}>
                  <ListItem button component={Link} to="/nuevo-proyecto" >
                          <ListItemIcon><InboxIcon /></ListItemIcon>
                          <ListItemText className={classes.ItemText} primary="Agregar"/>
                      </ListItem>
                  </AccordionDetails>
              </Accordion>
          </List>
            </div>
            
          </Drawer>
    </div>
  );
}
