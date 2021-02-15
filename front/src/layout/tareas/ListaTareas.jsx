import React from 'react';
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

  return (
    <div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Proyecto</TableCell>
            <TableCell align="right">Empleado</TableCell>
            <TableCell align="right">Perfil</TableCell>
            <TableCell align="right">Tarea</TableCell>
            <TableCell align="right">Horas estimadas</TableCell>
            <TableCell align="right">Horas OB</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.proyecto}>
              <TableCell component="th" scope="row">
                {row.nombreProyecto}
              </TableCell>
              <TableCell align="right">
                {row.EmpleadoPerfilNombreEmpleado}
              </TableCell>
              <TableCell align="right">
                {row.EmpleadoPerfilDescripcion}
              </TableCell>
              <TableCell align="right">
                {row.nombreTarea}
              </TableCell>
              <TableCell align="right">
                {row.HorasEstimadas}
              </TableCell>
              <TableCell align="right">
                {row.HorasOB}
              </TableCell>
              <TableCell align="right">
                <IconButton>
                  <EditIcon/>
                </IconButton>
              </TableCell>
              <TableCell align="right">
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
