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
import {Formulario} from "./NuevoEmpleado";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../style/general.css"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ListaEmpleados() {
  const classes = useStyles();

  const [empleados,setEmpleados] =useState([]);
  const [loadEmpleados,setLoadEmpleados] = useState(false);

  console.log("empleados: ",empleados)
  console.log("load: ",loadEmpleados)

  useEffect(() => {
    setLoadEmpleados(true);
    fetchEmpleados();
    return () => {
      
    }
  }, [])

  const fetchEmpleados = async () => {
    
    axios.get("http://localhost:27195/api/Empleados").then((response)=>{
      const data = response;
      setEmpleados(data.data);
      setLoadEmpleados(false);
    }).catch((error)=>{
      console.error("Error pidiendo datos: ",error);
      setLoadEmpleados(false)
    }); 
  }

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
          {empleados.map((row) => (
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
                <Popup trigger={<button>{row.perfiles.length}</button>} position="center">
                  <div>
                    {row.perfiles.map((item, i) => {
                        return (<p>{item.perfilDescripcion}</p>)
                      }
                    )}
                  </div>
                </Popup>
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
