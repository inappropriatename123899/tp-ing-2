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

  const [proyectos,setProyectos] = useState([]);
  const [loadProyectos,setLoadProyectos] = useState(false);

  const fetchProyectos = async () => {
    
    axios.get("http://localhost:27195/api/Proyectos").then((response)=>{
      const data = response;
      setProyectos(data.data);
      setLoadProyectos(false);
    }).catch((error)=>{
      console.error("Error pidiendo datos: ",error);
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

  return (
    <div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center">Cliente</TableCell>
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
                {row.estado}
              </TableCell>
              <TableCell align="center">
                {row.cliente}
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

export default ListaProyectos




