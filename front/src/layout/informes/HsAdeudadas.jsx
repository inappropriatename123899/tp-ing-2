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
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../style/general.css"
import {TextField , Card , Grid , Button} from '@material-ui/core';
import moment from "moment"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function HsAdeudadas(props) {
  const classes = useStyles();

  const [informeHsAdeudadas,setInformeHsAdeudadas] = useState([]);
  const [loadInformeHsAdeudadas,setLoadInformeHsAdeudadas] = useState(false);

  function solicitarHorasAdeudadas() {
    axios.get("http://localhost:27195/api/Proyectos/HorasAdeudadasPorProyectoPorEmpleadoTotales", {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        }
      }
    ).then(res => {
      console.log("res: ", res)
      console.log("res.data: ", res.data)
      setInformeHsAdeudadas(res.data);
      setLoadInformeHsAdeudadas(true);
    }).catch((error) => {
      setLoadInformeHsAdeudadas(false);
      console.error("error en get login: ",error);
    })
  }

  useEffect(() => {
    solicitarHorasAdeudadas();
    return () => {
      
    }
  }, [])

  console.log("informeHsAdeudadas: ",informeHsAdeudadas)
  console.log("loadInformeHsAdeudadas: ",loadInformeHsAdeudadas)

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">Proyecto</TableCell>
              <TableCell align="center">Empleado</TableCell>
              <TableCell align="center">Horas adeudadas</TableCell>
            </TableRow>
            {loadInformeHsAdeudadas && console.log("loadInformeHsAdeudadas: ",loadInformeHsAdeudadas)}
            {loadInformeHsAdeudadas &&
              informeHsAdeudadas.map((item) => {
                return (
                  item.empleadoHoras.map((itemInt) => {
                    return (
                      <TableRow>
                        <TableCell align="center">
                          {item.proyectoNombre}
                        </TableCell>
                        <TableCell align="center">
                          {itemInt.empleadoNombre + " " + itemInt.empleadoApellido}
                        </TableCell>
                        <TableCell align="center">
                          {itemInt.cantidadHorasAdeudadas}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default HsAdeudadas