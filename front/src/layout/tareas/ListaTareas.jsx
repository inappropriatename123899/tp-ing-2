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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ListaTareas(props) {
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

  function funcionBorrar(id, index) {
    axios.delete(`http://localhost:27195/api/Tareas/${id}`).then((response)=>{
      setTareas(tareas.filter(x => x.id != id));
    }).catch((error)=>{
      console.error("Error pidiendo datos: ",error);
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
              {/* hay dos chequeos porque de intentar hacerlo en uno se rompe visualmente la tabla */}
              { props.usuario.rolID != 3 ?
                <TableCell align="center"></TableCell>
              : <div></div>}
              { props.usuario.rolID != 3 ?
                <TableCell align="center"></TableCell>
              : <div></div>}
            </TableRow>
          </TableHead>
          <TableBody>
            {(props.usuario.rolID != 3) ? (
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
                      <Formulario data={row}/>
                  </Popup>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={()=> {funcionBorrar(row.id, index)}}>
                    <DeleteIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
               ))) : (
                tareas.filter(x => x.empleadoPerfilNombreEmplado == props.usuario.nombre)
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
                    { props.usuario.rolID != 3 ?
                    <div>
                    <TableCell align="center">
                      <Popup trigger={
                        <IconButton>
                          <EditIcon/>
                        </IconButton>
                      } modal>
                          <Formulario data={row}/>
                      </Popup>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={()=> {funcionBorrar(row.id, index)}}>
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                    </div>
                    : <div></div>}
                  </TableRow>
                      )
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ListaTareas
