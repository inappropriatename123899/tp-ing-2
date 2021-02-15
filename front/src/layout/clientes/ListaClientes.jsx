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

function createData(nombre, apellido, dni, razonSocial, direccion, telefonoFijo, telefonoCelular, email, proyectos) {
  return { nombre, apellido, dni, razonSocial, direccion, telefonoFijo, telefonoCelular, email, proyectos };
}
// nombre y apellido <|no vienen nunca juntas|> razonSocial
const rows = [
  createData(null, null, 33222111, "La Cochinilla S.A.", "blabla 123", 123123123123, 123123123123, "blabla@pete.com", 
    [
      {
        "id": 1,
        "clienteNombre": "sample string 2",
        "nombre": "sample string 3",
        "proyectoEstadoID": 4,
        "proyectoEstadoDescripcion": "sample string 5"
      },
      {
        "id": 1,
        "clienteNombre": "sample string 2",
        "nombre": "sample string 3",
        "proyectoEstadoID": 4,
        "proyectoEstadoDescripcion": "sample string 5"
      }
    ]
  ),
  createData("Juancho", "Talarga", 33222111, null, "blabla 123", 123123123123, 123123123123, "blabla@pete.com", 
    [
      {
        "id": 1,
        "clienteNombre": "sample string 2",
        "nombre": "sample string 3",
        "proyectoEstadoID": 4,
        "proyectoEstadoDescripcion": "sample string 5"
      },
      {
        "id": 1,
        "clienteNombre": "sample string 2",
        "nombre": "sample string 3",
        "proyectoEstadoID": 4,
        "proyectoEstadoDescripcion": "sample string 5"
      },
      {
        "id": 1,
        "clienteNombre": "sample string 2",
        "nombre": "sample string 3",
        "proyectoEstadoID": 4,
        "proyectoEstadoDescripcion": "sample string 5"
      },
      {
        "id": 1,
        "clienteNombre": "sample string 2",
        "nombre": "sample string 3",
        "proyectoEstadoID": 4,
        "proyectoEstadoDescripcion": "sample string 5"
      }
    ]
  )
];



function ListaClientes() {
  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Apellido</TableCell>
            <TableCell align="center">DNI</TableCell>
            <TableCell align="center">Razon Social</TableCell>
            <TableCell align="center">Dirección</TableCell>
            <TableCell align="center">Teléfono</TableCell>
            <TableCell align="center">Celular</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Proyectos</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.dni}>
            <TableCell align="center" component="th" scope="row">
              {row.nombre === null ? "-" : row.nombre}
            </TableCell>
            <TableCell align="center">
              {row.apellido === null ? "-" : row.apellido}
            </TableCell>
            <TableCell align="center">
              {row.dni}
            </TableCell>
            <TableCell align="center">
              {row.razonSocial === null ? "-" : row.razonSocial}
            </TableCell>
            <TableCell align="center">
              {row.direccion}
            </TableCell>
            <TableCell align="center">
              {row.telefonoFijo}
            </TableCell>
            <TableCell align="center">
              {row.telefonoCelular}
            </TableCell>
            <TableCell align="center">
              {row.email}
            </TableCell>
            <TableCell align="center">
              {row.proyectos.length}
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

export default ListaClientes
