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

function HsTrabProy(props) {
  const classes = useStyles();

  const [informeHorasTrabajadasPorProyecto,setInformeHorasTrabajadasPorProyecto] = useState([]);
  const [loadInformeHorasTrabajadasPorProyecto,setLoadInformeHorasTrabajadasPorProyecto] = useState(false);

  function solicitarHorasTrabajadasPorProyecto() {
    axios.get("http://localhost:27195/api/Proyectos/HorasTrabajadasPorProyectoPorPerfilTotales", {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        }
      }).then(res => {
      setInformeHorasTrabajadasPorProyecto(res.data);
      setLoadInformeHorasTrabajadasPorProyecto(true);
    }).catch((error)=> {
      setLoadInformeHorasTrabajadasPorProyecto(false);
    console.error("error en get login: ",error);
    })
  }

  useEffect(() => {
    solicitarHorasTrabajadasPorProyecto();
    return () => {
      
    }
  }, [])

  console.log("informeHorasTrabajadasPorProyecto: ",informeHorasTrabajadasPorProyecto)
  console.log("loadInformeHorasTrabajadasPorProyecto: ",loadInformeHorasTrabajadasPorProyecto)

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Proyecto</TableCell>
              <TableCell align="center">Perfil</TableCell>
              <TableCell align="center">Horas Trabajadas</TableCell>
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
                  </TableRow>
                  )
              }))
            })
          }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default HsTrabProy
