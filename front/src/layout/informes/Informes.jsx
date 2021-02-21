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
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../style/general.css"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Informes(props) {
  const classes = useStyles();

  const [informeSemanalHsOB,setInformeSemanalHsOB] = useState([]);
  const [loadInformeSemanalHsOB,setLoadInformeSemanalHsOB] = useState(false);

  function solicitarSemanalHorasOB() {
    axios.get("http://localhost:27195/api/HorasTrabajadas/informeSemanalHsOB").then(res => {
      setInformeSemanalHsOB(res.data);
      console.log("a ver este: ", informeSemanalHsOB);
    }).catch((error)=> {
    console.error("error en get login: ",error);
    })
  }

  console.log("informeSemanalHsOB: ",informeSemanalHsOB)
  console.log("load: ",loadInformeSemanalHsOB)

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Informe semanal de horas over budget</TableCell>
              <TableCell align="center">Informe horas trabajadas por proyecto</TableCell>
              <TableCell align="center">Informe horas trabajadas por empleado por perfil</TableCell>
              <TableCell align="center">Informe horas adeudadas por proyecto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <Button onClick={() => solicitarSemanalHorasOB()} size="medium" variant="contained" color="primary">Solicitar</Button>
              </TableCell>
              <TableCell align="center">
                <Button size="medium" variant="contained" color="primary">Solicitar</Button>
              </TableCell>
              <TableCell align="center">
                <Button size="medium" variant="contained" color="primary">Solicitar</Button>
              </TableCell>
              <TableCell align="center">
                <Button size="medium" variant="contained" color="primary">Solicitar</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Informes
