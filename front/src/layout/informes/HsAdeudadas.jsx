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
  container:{
    maxHeight: 440,
    minWidth: 700,
  }
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
      alert(error.response.data.exceptionMessage)
    })
  }

  useEffect(() => {
    solicitarHorasAdeudadas();
    return () => {
      
    }
  }, [])

  // para recibir streams
  const fetchReporte = () => {
    axios.get("http://localhost:27195/api/Clientes/ClientesReporte", {
      method: 'GET',
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        },
      responseType: 'blob' //Force to receive data in a Blob Format
    })
    .then(response => {//Create a Blob from the PDF Stream
        const file = new Blob(
          [response.data], 
          {type: 'application/pdf'});//Build a URL from the file
        const fileURL = URL.createObjectURL(file);//Open the URL on new Window
        window.open(fileURL);})
    .catch(error => {
        console.log(error);
    });
  }

  console.log("informeHsAdeudadas: ",informeHsAdeudadas)
  console.log("loadInformeHsAdeudadas: ",loadInformeHsAdeudadas)

  return (
    <Card scroll="paper">
      {/* Agregado className={classes.container} y se sacó component={paper} */}
      <TableContainer className={classes.container} >
        {/* a los demas cambiarle a <Table> los atributos stickyHeader aria-label="sticky table" y modificar el classes de los estilos en use styles
        https://material-ui.com/components/tables/#fixed-header
        */}
        <Table stickyHeader aria-label="sticky table" className={classes.table} > 
          <TableHead>
            
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">Proyecto</TableCell>
              <TableCell align="center">Empleado</TableCell>
              <TableCell align="center">Horas adeudadas</TableCell>
              <TableCell align="center">
                <Button variant="contained" color="primary" onClick={()=>{fetchReporte()}}>Reporte PDF</Button>
              </TableCell>
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
                        <TableCell></TableCell>
                      </TableRow>
                    )
                  })
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default HsAdeudadas