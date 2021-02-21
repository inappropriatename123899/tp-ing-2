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
import {Formulario} from "./NuevoProyecto";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../style/general.css"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
});

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

  function funcionBorrar(id, index) {
    axios.delete(`http://localhost:27195/api/Proyectos/${id}`).then((response)=>{
      setProyectos(proyectos.filter(x => x.id != id));
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
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Estado del proyecto</TableCell>
            <TableCell align="center">Cliente (nombre/razón social)</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {proyectos.map((row, index) => (
            <TableRow key={row.nombre}>
              <TableCell align="center" component="th" scope="row">
                {row.nombre}
              </TableCell>
              <TableCell align="center">
                {row.proyectoEstadoDescripcion}
              </TableCell>
              <TableCell align="center">
                {row.clienteNombre}
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default ListaProyectos




