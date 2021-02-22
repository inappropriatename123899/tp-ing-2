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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
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

  function funcionBorrar(id, index) {
    axios.delete(`http://localhost:27195/api/Clientes/${id}`, {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        }
      }
    ).then((response)=>{
      setClientes(clientes.filter(x => x.id != id));
    }).catch((error)=>{
      console.error("Error pidiendo datos: ",error);
    }); 
  }

  const fetchClientes = async () => {
    
    axios.get("http://localhost:27195/api/Clientes", {
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
      console.error("Error pidiendo datos: ",error);
      setLoadClientes(false)
    }); 
  }
  

  /*
  <Popup trigger={<button>{row.perfiles.length}</button>} position="center">
    <div>
      {row.perfiles.map((item, i) => {
          return (<p>{item.perfilDescripcion}</p>)
        }
      )}
    </div>
  </Popup>
   */

  return (
    <div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
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
            <TableCell align="center"></TableCell>
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
    </div>
  )
}

export default ListaClientes;

