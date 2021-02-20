import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import {TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import style from "../login/Login.module.css"

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });

function CargarHorasTarea() {
    const classes = useStyles();

    const [tareasEmpleado,setTareasEmpleado] =useState([]);
    const [loadTareasEmpleado,setLoadTareasEmpleado] = useState(false);
  
    const [estadoHoras,setEstadoHoras] =useState([]);
    const [loadEstadoHoras,setLoadEstadoHoras] = useState(false);

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
        axios.get(`http://localhost:27195/api/Tareas/empleado?empleadoID=${parseInt("4")}`).then((response)=>{
        const data = response;
        setTareasEmpleado(data.data);
        setLoadTareasEmpleado(false);
      }).catch((error)=>{
        console.error("Error pidiendo datos: ",error);
        setLoadTareasEmpleado(false)
      }); 
    }

    const fetchEstadoHoras = async () => {
          axios.get(`http://localhost:27195/api/HorasTrabajadas`).then((response)=>{
          const data = response;
          setEstadoHoras(data.data);
          setLoadEstadoHoras(false);
        }).catch((error)=>{
          console.error("Error pidiendo datos: ",error);
          setLoadEstadoHoras(false)
        }); 
      }

    return (
        <div className={style.ContainerLogin}>
      
      <Card className={classes.root, style.cardContainer}>
        <CardContent>
          <p></p>

          <Formik 
            initialValues={{
              tareaID: 0,
              horasTrabajadas: 0
            }}

            onSubmit={(values, {setSubmitting}) => {
            axios.get(`http://localhost:27195/api/Tareas/${values.tareaID}`).then((response)=>{
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
              }).then(res => {
                console.log(res.data);

                alert(
                  <div>
                    <p>Está pasando horas over budget ({res.data}).</p>
                  </div>
                )

                axios.post("http://localhost:27195/api/HorasTrabajadas/update", {
                  id: 0,
                  proyectoID: response.data.proyectoID,
                  tareaID: response.data.id,
                  cantHoras: parseFloat(values.horasTrabajadas),
                  fecha: "2021-02-20T14:23:22.2676589-03:00", // de acá se manda cualquiera, pero se setea por back
                  horasTrabajadasEstadoID: 2,
                  horasTrabajadasEstadoDescripcion: null
                }).then(res => {
                console.log(res);
                }).catch((error)=> {
                console.error("error en get login: ",error);
                })
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
              <Form onSubmit={handleSubmit}>
                <p>Tarea</p>
                <Field onChange={handleChange} value={values.tareaID} onBlur={handleBlur} id="tareaID standard-basic" name="tareaID" label="Tarea" as="select">
                    <option value={0}>Elija la tarea a la que le cargará horas...</option>
                    { tareasEmpleado.map((item,i) => 
                        <option key={i} value={item.id}>{ item.nombre }</option>
                    )}
                </Field>
                {errors.tareaID && touched.tareaID}
                <br/>
                <br/>
                <TextField onChange={handleChange} value={values.horasTrabajadas} onBlur={handleBlur} id="horasTrabajadas standard-basic" name="horasTrabajadas" label="Horas trabajadas" />
                {errors.horasTrabajadas && touched.horasTrabajadas}
                <br/>
                <br/>
                <Button type="submit" size="small" color="primary" disabled={isSubmitting}>
                    Cargar
                </Button>
              </Form>
            )
          }
          </Formik>
        </CardContent>
      </Card>
    </div>
    )
}

export default CargarHorasTarea
