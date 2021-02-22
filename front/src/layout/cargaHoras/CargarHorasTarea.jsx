import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import {TextField, Card , Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import "../style/general.css"


function CargarHorasTarea(props) {

    const [tareasEmpleado,setTareasEmpleado] =useState([]);
    const [loadTareasEmpleado,setLoadTareasEmpleado] = useState(false);
  
    const [estadoHoras,setEstadoHoras] =useState([]);
    const [loadEstadoHoras,setLoadEstadoHoras] = useState(false);

    console.log("props: ",props)

    console.log("tareas: ",tareasEmpleado)
    console.log("load: ",loadTareasEmpleado)

    console.log("tareas: ",estadoHoras)
    console.log("load: ",loadEstadoHoras)
  
    useEffect(() => {
      setLoadTareasEmpleado(true);
      fetchTareasEmpleado();

      setLoadEstadoHoras(true);
      fetchEstadoHoras();

      return () => {
        
      }
    }, [])
  
    const fetchTareasEmpleado = async () => {
      //el q se loggea es un empleado, al margen de su rol, por lo tanto empleadoID=loggedUser.ID
      // los empleados disponibles tienen los ids 3, 4, 5 y 6, pero el 6 no tiene tareas asignadas, los demás tienen 1 cada 1
        axios.get(`http://localhost:27195/api/Tareas/empleado?empleadoID=${parseInt(props.usuarioToken[0].id)}`, {
          headers: 
            {
              Authorization: `Bearer ${props.usuarioToken[1]}`
            }
          }
        ).then((response)=>{
        const data = response;
        setTareasEmpleado(data.data);
        setLoadTareasEmpleado(false);
      }).catch((error)=>{
        console.error("Error pidiendo datos: ",error);
        setLoadTareasEmpleado(false)
      }); 
    }

    const fetchEstadoHoras = async () => {
          axios.get(`http://localhost:27195/api/HorasTrabajadas`, {
            headers: 
              {
                Authorization: `Bearer ${props.usuarioToken[1]}`
              }
            }
          ).then((response)=>{
          const data = response;
          setEstadoHoras(data.data);
          setLoadEstadoHoras(false);
        }).catch((error)=>{
          console.error("Error pidiendo datos: ",error);
          setLoadEstadoHoras(false)
        }); 
      }

    return (
      <div className="container-form">
          <Formik 
            initialValues={{
              tareaID: 0,
              horasTrabajadas: 0
            }}

            onSubmit={(values, {setSubmitting}) => {
            axios.get(`http://localhost:27195/api/Tareas/${values.tareaID}`, {
              headers: 
                {
                  Authorization: `Bearer ${props.usuarioToken[1]}`
                }
              }
            ).then((response)=>{
              console.log("proyectoID: ",response.data.proyectoID);
              console.log("tareaID: ",response.data.id);
              
              axios.post("http://localhost:27195/api/HorasTrabajadas/getHsOB", {
                id: 0,
                proyectoID: response.data.proyectoID,
                tareaID: response.data.id,
                cantHoras: parseFloat(values.horasTrabajadas),
                fecha: "2021-02-20T14:23:22.2676589-03:00", // de acá se manda cualquiera, pero se setea por back
                horasTrabajadasEstadoID: 2,
                horasTrabajadasEstadoDescripcion: "algo"
              }, {
                headers: 
                  {
                    Authorization: `Bearer ${props.usuarioToken[1]}`
                  }
                }
              ).then(res => {
                console.log(res.data);


                if (res.data != 0) {
                  let confirmarHOB = window.confirm(`Está pasando horas over budget (${res.data}).`)

                    if (confirmarHOB === true) {
                      axios.post("http://localhost:27195/api/HorasTrabajadas/update", {
                        id: 0,
                        proyectoID: response.data.proyectoID,
                        tareaID: response.data.id,
                        cantHoras: parseFloat(values.horasTrabajadas),
                        fecha: "2021-02-20", // de acá se manda cualquiera, pero se setea por back
                        horasTrabajadasEstadoID: 2,
                        horasTrabajadasEstadoDescripcion: null
                      }, {
                        headers: 
                          {
                            Authorization: `Bearer ${props.usuarioToken[1]}`
                          }
                        }
                      ).then(res => {
                      console.log(res);
                      }).catch((error)=> {
                      console.error("error en get login: ",error);
                      })
                    }else{
                      console.log("...")
                    }
                  } else {
                    axios.post("http://localhost:27195/api/HorasTrabajadas/update", {
                        id: 0,
                        proyectoID: response.data.proyectoID,
                        tareaID: response.data.id,
                        cantHoras: parseFloat(values.horasTrabajadas),
                        fecha: "2021-02-20", // de acá se manda cualquiera, pero se setea por back
                        horasTrabajadasEstadoID: 2,
                        horasTrabajadasEstadoDescripcion: null
                      }, {
                        headers: 
                          {
                            Authorization: `Bearer ${props.usuarioToken[1]}`
                          }
                        }
                      ).then(res => {
                      console.log(res);
                      }).catch((error)=> {
                      console.error("error en get login: ",error);
                      })
                  }
                
              console.log(res);
              }).catch((error)=> {
              console.error("error en get login: ",error);
              })
            }).catch((error)=>{
                console.error("Error pidiendo datos: ",error);
            }); 
            setSubmitting(false)
            }
          }>
          {
            ({
              values,
              errors,
              touched,
              handleChange,   
              handleBlur,   
              handleSubmit,   
              isSubmitting
            }) => (
              <Card className="form">
                <Form onSubmit={handleSubmit}>
                  <Grid container className="form">
                   <Grid item className="grid-item" xs={5}>
                      <p>Tarea</p>
                      <Field onChange={handleChange} value={values.tareaID} onBlur={handleBlur} id="tareaID standard-basic" name="tareaID" label="Tarea" as="select" className="select-css">
                          <option value={0}>Elija la tarea a la que le cargará horas...</option>
                          { tareasEmpleado.map((item,i) => 
                              <option key={i} value={item.id}>{ item.nombre }</option>
                          )}
                      </Field>
                      {errors.tareaID && touched.tareaID}
                   </Grid>
                  <Grid item className="grid-item" xs={5}>
                      <TextField onChange={handleChange} value={values.horasTrabajadas} onBlur={handleBlur} id="horasTrabajadas standard-basic" name="horasTrabajadas" label="Horas trabajadas" />
                      {errors.horasTrabajadas && touched.horasTrabajadas}
                  </Grid>
                    <Grid item className="grid-item">
                      <Button type="submit" size="medium" variant="contained" color="primary" disabled={isSubmitting}>
                          Cargar
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Card>
            )
          }
          </Formik>
      </div>
    )
}

export default CargarHorasTarea
