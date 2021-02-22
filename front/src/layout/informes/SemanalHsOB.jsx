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
import {TextField , Card , Grid , Button, Dialog} from '@material-ui/core';
import moment from "moment"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    
  },
  //esto de acá abajo se agregó
  container:{
    maxHeight: 440,
    minWidth: 700,
  }
});

function SemanalHsOB(props) {
  const classes = useStyles();
  
  const [informeSemanalHsOB,setInformeSemanalHsOB] = useState([]);
  const [loadInformeSemanalHsOB,setLoadInformeSemanalHsOB] = useState(false);

  function solicitarSemanalHorasOB() {
    axios.get("http://localhost:27195/api/HorasTrabajadas/informeSemanalHsOB", {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        }
      }
    ).then(res => {
      setInformeSemanalHsOB(res.data);
      setLoadInformeSemanalHsOB(true);
    }).catch((error)=> {
      setLoadInformeSemanalHsOB(false);
      alert(error.response.data.exceptionMessage)
    })
  }

  useEffect(() => {
    solicitarSemanalHorasOB();
    return () => {
      
    }
  }, [])

  console.log("informeSemanalHsOB: ",informeSemanalHsOB)
  console.log("loadInformeSemanalHsOB: ",loadInformeSemanalHsOB)

  return (
    <Card scroll="paper">
      {/* Agregado className={classes.container} y se sacó component={paper} */}
      <TableContainer className={classes.container} >
        {/* a los demas cambiarle a <Table> los atributos stickyHeader aria-label="sticky table" y modificar el classes de los estilos en use styles
        https://material-ui.com/components/tables/#fixed-header
        */}
        <Table stickyHeader aria-label="sticky table" className={classes.table} > 
          <TableHead  >
            <TableRow>
              <TableCell align="center">Proyecto</TableCell>
              <TableCell align="center">Tarea</TableCell>
              <TableCell align="center">Horas OB</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadInformeSemanalHsOB && 
            informeSemanalHsOB.tareasSubtotalesHsOB.map((item,index) => {
              return (
              <TableRow key={index}>
                <TableCell align="center">
                  {item.proyectoNombre}
                </TableCell>
                <TableCell align="center">
                  {item.tareaNombre}
                </TableCell>
                <TableCell align="center">
                  {item.subtotalHsOB}
                </TableCell>
              </TableRow>
              )
            })
          }
          </TableBody>
        </Table>
      </TableContainer>
    
      <Table>
        <TableHead>
          {loadInformeSemanalHsOB && 
          <TableRow>
            <TableCell align="center">
              Total
            </TableCell>
            <TableCell align="center">
              {informeSemanalHsOB.hsOBTotales}
            </TableCell>
          </TableRow>
          }
        </TableHead>
      </Table>
    </Card>
  )
}

export default SemanalHsOB
