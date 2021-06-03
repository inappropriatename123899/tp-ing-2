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
import {Formulario} from "./NuevoCliente";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../style/general.css"
import {TextField , Card , Grid , Button} from '@material-ui/core';
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

function ListaClientes(props) {
  const classes = useStyles();

  const [clientes,setClientes] =useState([]);
  const [loadClientes,setLoadClientes] = useState(false);

  console.log("PROPS LISTACLIENTES: ",props)

  console.log("clientes: ",clientes)
  console.log("load: ",loadClientes)

  useEffect(() => {
    setLoadClientes(true);
    fetchClientes();
    return () => {
      
    }
  }, [])

  // para recibir streams
  const fetchReporte = () => {
    axios.get(apiLink + "api/Clientes/ClientesReporte", {
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

  function funcionBorrar(id, index) {
    axios.delete(apiLink + `api/Clientes/${id}`, {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        }
      }
    ).then((response)=>{
      setClientes(clientes.filter(x => x.id != id));
    }).catch((error)=>{
      alert(error.response.data.exceptionMessage)
    }); 
  }

  const fetchClientes = async () => {
    
    axios.get(apiLink + "api/Clientes", {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        }
      }
    ).then((response)=>{
      const data = response;
      setClientes(data.data);
      setLoadClientes(false);
    }).catch((error)=>{
      alert(error.response.data.exceptionMessage)
      setLoadClientes(false)
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
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Apellido</TableCell>
            <TableCell align="center">Razón Social</TableCell>
            <TableCell align="center">DNI/CUIT</TableCell>
            <TableCell align="center">Dirección</TableCell>
            <TableCell align="center">Teléfono Contacto</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Tipo de persona</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">
              <Button variant="contained" color="primary" onClick={()=>{fetchReporte()}}>PDF</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loadClientes && clientes.map((cliente, index) => (
            <TableRow key={cliente.dniCuit}>
            <TableCell align="center" component="th" scope="row">
              {cliente.nombre === null ? "-" : cliente.nombre}
            </TableCell>
            <TableCell align="center">
              {cliente.apellido === null ? "-" : cliente.apellido}
            </TableCell>
            <TableCell align="center">
              {cliente.razonSocial === null ? "-" : cliente.razonSocial}
            </TableCell>
            <TableCell align="center">
              {cliente.dniCuit}
            </TableCell>
            <TableCell align="center">
              {cliente.direccion}
            </TableCell>
            <TableCell align="center">
              {cliente.telefonoContacto}
            </TableCell>
            <TableCell align="center">
              {cliente.email}
            </TableCell>
            <TableCell  align="center">
              {cliente.razonSocial === null  ? "Física" : "Jurídica"}
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
                    cliente
                  ]}/>
              </Popup>
            </TableCell>
            <TableCell align="center">
              <IconButton onClick={()=> {funcionBorrar(cliente.id, index)}}>
                <DeleteIcon/>
              </IconButton>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
  )
}

export default ListaClientes;

