
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

function createData(nombre, estado, cliente) {
  return { nombre, estado, cliente };
}

const rows = [
  createData('proyecto 1', 159, 6.0, 24, 4.0),
  createData('proyecto 2', 237, 9.0, 37, 4.3),
];

function ListaProyectos() {

  const classes = useStyles();


  return (
    <div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Cliente</TableCell>
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
                {row.estado}
              </TableCell>
              <TableCell align="right">
                {row.cliente}
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

export default ListaProyectos




