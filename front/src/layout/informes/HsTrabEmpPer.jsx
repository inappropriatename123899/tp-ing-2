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

function HsTrabEmpPer(props) {
  const classes = useStyles();

  const [informeHorasTrabajadasPorEmpleadoYPerfil,setInformeHorasTrabajadasPorEmpleadoYPerfil] = useState([]);
  const [loadInformeHorasTrabajadasPorEmpleadoYPerfil,setLoadInformeHorasTrabajadasPorEmpleadoYPerfil] = useState(false);

  const [inicio, setInicio] = useState();
  const [fin, setFin] = useState()

  console.log("fechaDesde: ",inicio);
  console.log("fechaHasta: ",fin);

  function solicitarHorasTrabajadasPorEmpleadoYPerfil() {
    axios.get(`http://localhost:27195/api/Proyectos/HorasTrabajadasPorProyectoPorPerfilPorEmpleadoTotales?desde=${inicio}&hasta=${fin}`, {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        }
      }).then(res => {
      setInformeHorasTrabajadasPorEmpleadoYPerfil(res.data);
      setLoadInformeHorasTrabajadasPorEmpleadoYPerfil(true);
    }).catch((error)=> {
      setLoadInformeHorasTrabajadasPorEmpleadoYPerfil(false);
      alert(error.response.data.exceptionMessage)
    })
  }

  function bothReady() {
    console.log("inicio: ",inicio)
    console.log("fin: ",fin)
    if (inicio !== undefined && fin !== undefined) solicitarHorasTrabajadasPorEmpleadoYPerfil();
  }

  console.log("informeHorasTrabajadasPorEmpleadoYPerfil: ",informeHorasTrabajadasPorEmpleadoYPerfil)
  console.log("loadInformeHorasTrabajadasPorEmpleadoYPerfil: ",loadInformeHorasTrabajadasPorEmpleadoYPerfil)

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
              <TableCell align="center">
                  <Grid item className="grid-item" xs={5}>
                    <form noValidate>
                      <TextField
                        onChange={(event)=>{
                          setInicio(event.target.value);
                          bothReady();
                        }}
                        id="date"
                        label="Inicio de periodo"
                        type="date"
                        defaultValue={moment()}
                        style={{ width: 180 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </form>
                  </Grid>
                  </TableCell>
                  <TableCell>
                  <Grid item className="grid-item" xs={5}>
                    <form noValidate>
                          <TextField
                            onChange={(event)=>{
                                setFin(event.target.value);
                                bothReady();
                              }
                            }
                            id="date"
                            label="Fin de periodo"
                            type="date"
                            defaultValue={moment()}
                            style={{ width: 180 }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                    </form>
                  </Grid>
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
                <Button onClick={() => bothReady()} size="medium" variant="contained" color="primary">Solicitar</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Proyecto</TableCell>
              <TableCell align="center">Perfil</TableCell>
              <TableCell align="center">Nombre Empleado</TableCell>
              <TableCell align="center">Horas trabajadas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadInformeHorasTrabajadasPorEmpleadoYPerfil &&
              informeHorasTrabajadasPorEmpleadoYPerfil.map((item) => {
                return (
                item.perfilesEmpleadosHoras.map((itemInt) => {
                  return (
                    itemInt.empleadosHoras.map((itemIntInt) => {
                      return (
                      <TableRow>
                        <TableCell align="center">
                          {item.proyectoNombre}
                        </TableCell>
                        <TableCell align="center">
                          {itemInt.perfilDescripcion}
                        </TableCell>
                        <TableCell align="center">
                          {itemIntInt.empleado.nombre + " " + itemIntInt.empleado.apellido}
                        </TableCell>
                        <TableCell align="center">
                          {itemIntInt.cantidadHoras}
                        </TableCell>
                      </TableRow>
                      )
                    }))
                }))
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default HsTrabEmpPer