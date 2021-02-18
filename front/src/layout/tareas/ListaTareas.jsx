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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ListaTareas() {
  const classes = useStyles();

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
    
    axios.get("http://localhost:27195/api/Tareas").then((response)=>{
      const data = response;
      setTareas(data.data);
      setLoadTareas(false);
    }).catch((error)=>{
      console.error("Error pidiendo datos: ",error);
      setLoadTareas(false)
    }); 
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Tarea</TableCell>
              <TableCell align="center">Empleado</TableCell>
              <TableCell align="center">Perfil</TableCell>
              <TableCell align="center">Proyecto</TableCell>
              <TableCell align="center">Horas estimadas</TableCell>
              <TableCell align="center">Horas OB</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tareas.map((row) => (
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
                  <IconButton>
                    <EditIcon/>
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton>
                    <DeleteIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ListaTareas
