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
import { apiLink } from "../../utils/stringBack";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container:{
    maxHeight: 440,
    minWidth: 700,
  }
});

function HsTrabProy(props) {
  const classes = useStyles();

  const [informeHorasTrabajadasPorProyecto,setInformeHorasTrabajadasPorProyecto] = useState([]);
  const [loadInformeHorasTrabajadasPorProyecto,setLoadInformeHorasTrabajadasPorProyecto] = useState(false);

  function solicitarHorasTrabajadasPorProyecto() {
    axios.get(apiLink + "api/Proyectos/HorasTrabajadasPorProyectoPorPerfilTotales", {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        }
      }).then(res => {
      setInformeHorasTrabajadasPorProyecto(res.data);
      setLoadInformeHorasTrabajadasPorProyecto(true);
    }).catch((error)=> {
      setLoadInformeHorasTrabajadasPorProyecto(false);
      alert(error.response.data.exceptionMessage)
    })
  }

  useEffect(() => {
    solicitarHorasTrabajadasPorProyecto();
    return () => {
      
    }
  }, [])

  console.log("informeHorasTrabajadasPorProyecto: ",informeHorasTrabajadasPorProyecto)
  console.log("loadInformeHorasTrabajadasPorProyecto: ",loadInformeHorasTrabajadasPorProyecto)

  // para recibir streams
  const fetchReporte = () => {
    axios.get(apiLink + `api/Proyectos/HsTrabajadasProyectorPerfilReporte`, {
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

  return (
    <Card scroll="paper">
      {/* Agregado className={classes.container} y se sacó component={paper} */}
      <TableContainer className={classes.container} >
        {/* a los demas cambiarle a <Table> los atributos stickyHeader aria-label="sticky table" y modificar el classes de los estilos en use styles
        https://material-ui.com/components/tables/#fixed-header
        */}
        <Table stickyHeader aria-label="sticky table" className={classes.table} > 
          <TableHead>
            <TableRow>
              <TableCell align="center">Proyecto</TableCell>
              <TableCell align="center">Perfil</TableCell>
              <TableCell align="center">Horas Trabajadas</TableCell>
              <TableCell align="center">
                <Button variant="contained" color="primary" onClick={()=>{fetchReporte()}}>Reporte PDF</Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {loadInformeHorasTrabajadasPorProyecto && 
            informeHorasTrabajadasPorProyecto.map((item) => {
              return (
              item.perfilesHoras.map((itemInt) => {
                return (
                  <TableRow>
                    <TableCell align="center">
                      {item.proyectoNombre}
                    </TableCell>
                    <TableCell align="center">
                      {itemInt.perfilDescripcion}
                    </TableCell>
                    <TableCell align="center">
                      {itemInt.cantidadHoras}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  )
              }))
            })
          }
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default HsTrabProy
