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
/*
        public int ID { get; set; }

        public int ProyectoID { get; set; }
        public string ProyectoNombre { get; set; }

        public int EmpleadoPerfilID { get; set; }
        public string EmpleadoPerfilNombreEmplado { get; set; }
        public string EmpleadoPerfilDescripcion { get; set; } // perfil del tipo

        public string Nombre { get; set; } // nombre de la tarea
        public decimal HorasEstimadas { get; set; }
        public decimal HorasOB { get; set; }
*/
function createData(nombreProyecto, EmpleadoPerfilNombreEmpleado, EmpleadoPerfilDescripcion, nombreTarea /* Nombre en el dto */, HorasEstimadas, HorasOB) {
  return { nombreProyecto, EmpleadoPerfilNombreEmpleado, EmpleadoPerfilDescripcion, nombreTarea /* Nombre en el dto */, HorasEstimadas, HorasOB };
}

const rows = [
  createData("proyecto 1", "petete", "sabelotodo", "chupar medias", 24.7, 24.7),
  createData("proyecto 2", "salamin", "comer", "comida", 24.7, 24.7),
];

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
              <TableCell align="center">Proyecto</TableCell>
              <TableCell align="center">Empleado</TableCell>
              <TableCell align="center">Perfil</TableCell>
              <TableCell align="center">Tarea</TableCell>
              <TableCell align="center">Horas estimadas</TableCell>
              <TableCell align="center">Horas OB</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.proyecto}>
                <TableCell align="center" component="th" scope="row">
                  {row.nombreProyecto}
                </TableCell>
                <TableCell align="center">
                  {row.EmpleadoPerfilNombreEmpleado}
                </TableCell>
                <TableCell align="center">
                  {row.EmpleadoPerfilDescripcion}
                </TableCell>
                <TableCell align="center">
                  {row.nombreTarea}
                </TableCell>
                <TableCell align="center">
                  {row.HorasEstimadas}
                </TableCell>
                <TableCell align="center">
                  {row.HorasOB}
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
