import React , {useState , useEffect} from 'react'
import {TextField , Card , Grid , Button} from '@material-ui/core';
import "../style/general.css"
import moment from "moment"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios"
import { apiLink } from "../../utils/stringBack";

const Liquidacion = (props) => {

  const [inicio,setInicio] = useState();
  const [fin, setFin] = useState()

  const [empleado, setEmpleado] = useState()
  
  const [empleados,setEmpleados] =useState([]);
  const [loadEmpleados,setLoadEmpleados] = useState(false);

  const [liquidacion, setLiquidacion] =useState([])
  const [cargaLiquidacion, setCargaLiquidacion] =useState(false);

  console.log("empleados: ",empleados)
  console.log("load: ",loadEmpleados)
  console.log("empleado select: ",empleado)

  console.log("fechaDesde: ",inicio);
  console.log("fechaHasta: ",fin);

  useEffect(() => {
    setLoadEmpleados(true);
    fetchEmpleados();
    return () => {
      
    }
  }, [])

  const fetchLiquidacion = () => {

    console.log(empleado)

    console.log("ACÁ: ",props)

    axios.post(apiLink + "api/Proyectos/Liquidacion", {
      empleadoID: parseInt(empleado),
      desde: inicio,
      hasta: fin
    }, {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        }
      }
    ).then((response)=>{
      setLiquidacion(response.data);
      console.log(liquidacion);
      setCargaLiquidacion(true);
    }).catch((error)=>{
      alert(error.response.data.exceptionMessage)
      setCargaLiquidacion(true)
    }); 
  }

  const fetchLiquidacionPDF = () => {

    console.log(empleado)

    console.log("ACÁ: ",props)

    axios.get(apiLink + `api/Proyectos/LiquidacionReporte?EmpleadoID=${parseInt(empleado)}&Desde=${inicio}&Hasta=${fin}`, {
      method: 'GET',
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        },
        responseType: 'blob'
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

  const fetchEmpleados = async () => {  
    axios.get(apiLink + "api/Empleados", {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioToken[1]}`
        }
      }
    ).then((response)=>{
      setEmpleados(response.data);
      setLoadEmpleados(false);
    }).catch((error)=>{
      alert(error.response.data.exceptionMessage)
      setLoadEmpleados(false)
    }); 
  }

  return (
    <div className="container-form">
      <Card className="form">
        <Grid container className="form">
          <Grid container className="form">
            <Grid item className="grid-item" xs={5}>
              <form noValidate>
                <TextField
  
                  onChange={(event)=>{
                      setInicio(event.target.value)
                    }
                  }
                  id="date"
                  label="Inicio de periodo"
                  type="date"
                  defaultValue={moment()}
                  style={{ width: 160 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </Grid>
            <Grid/>
            <Grid item className="grid-item" xs={5}>
              <form noValidate>
                <TextField
                  onChange={(event)=>{
                      setFin(event.target.value)
                    }
                  }
                  id="date"
                  label="Fin de periodo"
                  type="date"
                  defaultValue={moment()}
                  style={{ width: 160 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </Grid>
          </Grid>
  
          <Grid container className="form">
            <Grid item className="grid-item" xs={3}>
              <select onChange={(event)=>{
                setEmpleado(event.target.value)
              }} id="empleadoID standard-basic" label="Empleado" className="select-css">
                <option value={0}>Elija un empleado...</option>
                { 
                  empleados.map((item,i) => <option key={i} value={item.id}>{ item.nombre }</option>)
                }
              </select>
            </Grid>
            <Grid item className="grid-item" xs={2}>
              <Button variant="contained" color="primary" onClick={()=>{fetchLiquidacion()}}>Liquidar</Button>
            </Grid>
            <Grid item className="grid-item" xs={2}>
              <Button variant="contained" color="primary" onClick={()=>{fetchLiquidacionPDF()}}>Ver PDF</Button>
            </Grid>
            <Grid container className="list">
              <TableContainer>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center"><b>Antigüedad</b></TableCell>
                      <TableCell align="center"><b>Hs. no OB</b></TableCell>
                      <TableCell align="center"><b>Hs. OB (50%)</b></TableCell>
                      <TableCell align="center"><b>Hs. totales</b></TableCell>
                      <TableCell align="center"><b>Perfiles</b></TableCell>
                      <TableCell align="center"><b>Proyectos</b></TableCell>
                      <TableCell align="center"><b>Tareas</b></TableCell>
                      <TableCell align="center"><b>% antigüedad</b></TableCell>
                      <TableCell align="center"><b>% total de horas</b></TableCell>
                      <TableCell align="center"><b>% cant. de perfiles</b></TableCell>
                      <TableCell align="center"><b>Total</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cargaLiquidacion && 
                    <TableRow>
                      <TableCell align="center">{liquidacion.antiguedadEmpleado}</TableCell>
                      <TableCell align="center">{liquidacion.cantidadHsNoOBLiquidados}</TableCell>
                      <TableCell align="center">{liquidacion.cantidadHsOBLiquidados}</TableCell>
                      <TableCell align="center">{liquidacion.cantidadHsTotalesLiquidados}</TableCell>
                      <TableCell align="center">{liquidacion.cantidadPerfiles}</TableCell>
                      <TableCell align="center">{liquidacion.cantidadProyectosLiquidados}</TableCell>
                      <TableCell align="center">{liquidacion.cantidadTareasLiquidados}</TableCell>
                      <TableCell align="center">{liquidacion.porcentajeAplicadoAntiguedad ? liquidacion.porcentajeAplicadoAntiguedad : "-" }</TableCell>
                      <TableCell align="center">{liquidacion.porcentajeAplicadoCantidadHoras ? liquidacion.porcentajeAplicadoCantidadHoras : "-" }</TableCell>
                      <TableCell align="center">{liquidacion.porcentajeAplicadoCantidadPerfiles ? liquidacion.porcentajeAplicadoCantidadPerfiles : "-" }</TableCell>
                      <TableCell align="center">{liquidacion.totalLiquidado}</TableCell>
                    </TableRow>}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default Liquidacion;
