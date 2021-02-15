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

function createData(nombre, apellido, dni, fechaIngreso, usuario/*irrelevante*/, clave/*irrelevante*/, perfiles) {
  return { nombre, apellido, dni, fechaIngreso, usuario/*irrelevante*/, clave/*irrelevante*/, perfiles };
}

const rows = [
  createData(
    "sample string 2",
    "sample string 3",
    44444444,
    "2021-02-15T16:28:33.7757647-03:00",
    "sample string 6",
    "sample string 7",
    [
      {
        "id": 1,
        "empleadoID": 2,
        "empleadoNombre": "sample string 3",
        "perfilID": 4,
        "perfilDescripcion": "sample string 5"
      },
      {
        "id": 1,
        "empleadoID": 2,
        "empleadoNombre": "sample string 3",
        "perfilID": 4,
        "perfilDescripcion": "sample string 5"
      }
    ]
  ),
  createData(
    "sample string 2",
    "sample string 3",
    44444444,
    "2021-02-15T16:28:33.7757647-03:00",
    "sample string 6",
    "sample string 7",
    [
      {
        "id": 3,
        "empleadoID": 2,
        "empleadoNombre": "sample string 3",
        "perfilID": 4,
        "perfilDescripcion": "sample string 5"
      },
      {
        "id": 4,
        "empleadoID": 2,
        "empleadoNombre": "sample string 3",
        "perfilID": 4,
        "perfilDescripcion": "sample string 5"
      }
    ]
  ),
];

function ListaEmpleados() {
  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">DNI</TableCell>
            <TableCell align="right">Fecha de Ingreso</TableCell>
            <TableCell align="right">Perfiles</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.nombre}>
              <TableCell component="th" scope="row">
                {row.nombre}
              </TableCell>
              <TableCell align="right">
                {row.apellido}
              </TableCell>
              <TableCell align="right">
                {row.dni}
              </TableCell>
              <TableCell align="right">
                {row.fechaIngreso}
              </TableCell>
              <TableCell align="right">
                {row.perfiles.length}
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

export default ListaEmpleados
