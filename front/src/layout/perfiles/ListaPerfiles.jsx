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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ListaPerfiles() {
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
    
    axios.get("http://localhost:27195/api/Perfiles").then((response)=>{
      const data = response;
      setPerfiles(data.data);
      setLoadPerfiles(false);
    }).catch((error)=>{
      console.error("Error pidiendo datos: ",error);
      setLoadPerfiles(false)
    }); 
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Perfil</TableCell>
              <TableCell align="center">Paga por hora</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {perfiles.map((row) => (
              <TableRow key={row.tarea}>
                <TableCell align="center" component="th" scope="row">
                  {row.descripcion}
                </TableCell>
                <TableCell align="center">
                  {row.valorHorario}
                </TableCell>
                <TableCell align="center">
                  <IconButton>
                    <EditIcon/>
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton>
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

export default ListaPerfiles
