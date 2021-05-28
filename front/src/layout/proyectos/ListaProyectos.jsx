import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import {  IconButton, 
          Table, 
          TableBody, 
          TableCell, 
          TableHead, 
          TableContainer, 
          TableRow, 
          Paper
        } from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Formulario} from "./NuevoProyecto";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../style/general.css"
import {TextField , Card , Grid , Button} from '@material-ui/core';
import { apiLink } from "../../utils/stringBack";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container:{
    maxHeight: 440,
    minWidth: 700,
  }
});

function ListaProyectos(props) {
  const classes = useStyles();

  const [proyectos,setProyectos] = useState([]);
  const [loadProyectos,setLoadProyectos] = useState(false);

  const fetchProyectos = async () => {
    
    axios.get(apiLink + "api/Proyectos", {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        }
      }
    ).then((response)=>{
      const data = response;
      setProyectos(data.data);
      setLoadProyectos(false);
    }).catch((error)=>{
      alert(error.response.data.exceptionMessage)
      setLoadProyectos(false)
    }); 
  }

  console.log("proyectos: ",proyectos)
  console.log("load: ",loadProyectos)

  useEffect(() => {
    // proyectos
    setLoadProyectos(true);
    fetchProyectos();
    return () => {
      
    }
  }, [])

  function funcionBorrar(id, index) {
    axios.delete(apiLink + `api/Proyectos/${id}`, {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        }
      }
    ).then((response)=>{
      setProyectos(proyectos.filter(x => x.id != id));
    }).catch((error)=>{
      alert(error.response.data.exceptionMessage)
    }); 
  }

  return (
    <Card scroll="paper">
      {/* Agregado className={classes.container} y se sacó component={paper} */}
      <TableContainer className={classes.container} >
        {/* a los demas cambiarle a <Table> los atributos stickyHeader aria-label="sticky table" y modificar el classes de los estilos en use styles
        https://material-ui.com/components/tables/#fixed-header
        */}
        <Table stickyHeader aria-label="sticky table" className={classes.table} > 
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Estado del proyecto</TableCell>
            <TableCell align="center">Cliente (nombre/razón social)</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {proyectos.map((row, index) => (
            <TableRow key={row.nombre}>
              <TableCell align="center" component="th" scope="row">
                {row.nombre}
              </TableCell>
              <TableCell align="center">
                {row.proyectoEstadoDescripcion}
              </TableCell>
              <TableCell align="center">
                {row.clienteNombre}
              </TableCell>
              <TableCell align="center">
                <Popup trigger={
                  <IconButton>
                    <EditIcon/>
                  </IconButton>
                } modal>
                    <Formulario usuarioTokenData={[
                        props.usuarioToken[0],
                        props.usuarioToken[1],
                        row
                      ]}/>
                </Popup>
              </TableCell>
              <TableCell align="center">
                <IconButton onClick={()=> {funcionBorrar(row.id, index)}}>
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
  )
}

export default ListaProyectos
