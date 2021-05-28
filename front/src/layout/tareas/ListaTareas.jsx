import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
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
import {Formulario} from "./NuevaTarea";
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

function ListaTareas(props) {
  const classes = useStyles();

  console.log("props lista tareas: ",props)

  const [tareas,setTareas] =useState([]);
  const [loadTareas,setLoadTareas] = useState(false);

  console.log("tareas: ",tareas)
  console.log("load: ",loadTareas)

  useEffect(() => {
    setLoadTareas(true);
    fetchTareas();
    return () => {
      
    }
  }, [])

  const fetchTareas = async () => {
    
    axios.get(apiLink + "api/Tareas", {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        }
      }
    ).then((response)=>{
      const data = response;
      setTareas(data.data);
      setLoadTareas(false);
    }).catch((error)=>{
      alert(error.response.data.exceptionMessage)
      setLoadTareas(false)
    }); 
  }

  function funcionBorrar(id, index) {
    axios.delete(apiLink + `api/Tareas/${id}`, {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        }
      }
    ).then((response)=>{
      setTareas(tareas.filter(x => x.id != id));
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
              <TableCell align="center">Tarea</TableCell>
              <TableCell align="center">Empleado</TableCell>
              <TableCell align="center">Perfil</TableCell>
              <TableCell align="center">Proyecto</TableCell>
              <TableCell align="center">Horas estimadas</TableCell>
              <TableCell align="center">Horas OB</TableCell>
              {/* hay dos chequeos porque de intentar hacerlo en uno se rompe visualmente la tabla */}
              { props.usuarioToken[0].rolID != 3 ?
                <TableCell align="center"></TableCell>
              : <div></div>}
              { props.usuarioToken[0].rolID != 3 ?
                <TableCell align="center"></TableCell>
              : <div></div>}
            </TableRow>
          </TableHead>
          <TableBody>
            {(props.usuarioToken[0].rolID != 3) ? (
              tareas.map((row, index) => (
              <TableRow key={row.tarea}>
                <TableCell align="center" component="th" scope="row">
                  {row.nombre}
                </TableCell>
                <TableCell align="center">
                  {row.empleadoPerfilNombreEmplado}
                </TableCell>
                <TableCell align="center">
                  {row.empleadoPerfilDescripcion}
                </TableCell>
                <TableCell align="center">
                  {row.proyectoNombre}
                </TableCell>
                <TableCell align="center">
                  {row.horasEstimadas}
                </TableCell>
                <TableCell align="center">
                  {row.horasOB}
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
               ))) : (
                tareas.filter(x => x.empleadoPerfilNombreEmplado == props.usuarioToken[0].nombre)
                      .map((row, index) => (
                  <TableRow key={row.tarea}>
                    <TableCell align="center" component="th" scope="row">
                      {row.nombre}
                    </TableCell>
                    <TableCell align="center">
                      {row.empleadoPerfilNombreEmplado}
                    </TableCell>
                    <TableCell align="center">
                      {row.empleadoPerfilDescripcion}
                    </TableCell>
                    <TableCell align="center">
                      {row.proyectoNombre}
                    </TableCell>
                    <TableCell align="center">
                      {row.horasEstimadas}
                    </TableCell>
                    <TableCell align="center">
                      {row.horasOB}
                    </TableCell>
                  </TableRow>
                )
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default ListaTareas
