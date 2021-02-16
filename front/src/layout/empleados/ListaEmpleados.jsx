import React, { useEffect } from 'react';
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

  useEffect(() => {
    axios.get("http://localhost:27195/api/Empleados").then(res => {
            console.log(res) //
          }).catch((error)=> {
            console.error("error en get proyectos: ",error)
          })
    return () => {
      
    }
  }, [])

  return (
    <div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Apellido</TableCell>
            <TableCell align="center">DNI</TableCell>
            <TableCell align="center">Fecha de Ingreso</TableCell>
            <TableCell align="center">Perfiles</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.nombre}>
              <TableCell align="center" component="th" scope="row">
                {row.nombre}
              </TableCell>
              <TableCell align="center">
                {row.apellido}
              </TableCell>
              <TableCell align="center">
                {row.dni}
              </TableCell>
              <TableCell align="center">
                {row.fechaIngreso}
              </TableCell>
              <TableCell align="center">
                {row.perfiles.length}
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

export default ListaEmpleados
