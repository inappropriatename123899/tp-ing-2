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
import {Formulario} from "./NuevoPerfil";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../style/general.css"
import {TextField , Card , Grid , Button} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container:{
    maxHeight: 440,
    minWidth: 700,
  }
});

function ListaPerfiles(props) {
  const classes = useStyles();

  const [perfiles,setPerfiles] =useState([]);
  const [loadPerfiles,setLoadPerfiles] = useState(false);

  console.log("perfiles: ",perfiles)
  console.log("load: ",loadPerfiles)

  useEffect(() => {
    setLoadPerfiles(true);
    fetchPerfiles();
    return () => {
      
    }
  }, [])

  const fetchPerfiles = async () => {
    
    axios.get("http://localhost:27195/api/Perfiles", {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        }
      }).then((response)=>{
      const data = response;
      setPerfiles(data.data);
      setLoadPerfiles(false);
    }).catch((error)=>{
      alert(error.response.data.exceptionMessage)
      setLoadPerfiles(false)
    }); 
  }

  function funcionBorrar(id, index) {
    axios.delete(`http://localhost:27195/api/Perfiles/${id}`, {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        }
      }
    ).then((response)=>{
      setPerfiles(perfiles.filter(x => x.id != id));
    }).catch((error)=>{
      alert(error.response.data.exceptionMessage)
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
              <TableCell align="center">Perfil</TableCell>
              <TableCell align="center">Paga por hora</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {perfiles.length > 0 ? 
              perfiles.map((row, index) => (
                <TableRow key={row.tarea}>
                  <TableCell align="center" component="th" scope="row">
                    {row.descripcion}
                  </TableCell>
                  <TableCell align="center">
                    {row.valorHorario}
                  </TableCell>
                  <TableCell align="center">
                <Popup trigger={
                  <IconButton>
                    <EditIcon/>
                  </IconButton>
                } modal>
                    <Formulario usuarioTokenData={[
                        props.usuarioToken[0],
                        props.usuarioToken[1],
                        row
                      ]}/>
                </Popup>
              </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={()=> {funcionBorrar(row.id, index)}}>
                      <DeleteIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              )) : (
                <div></div>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default ListaPerfiles
