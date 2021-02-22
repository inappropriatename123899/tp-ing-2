import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import {TextField , Card , Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import "../style/general.css"

function Formulario(props) {

  const [proyectos,setProyectos] = useState([]);
  const [loadProyectos,setLoadProyectos] = useState(false);

  const [perfiles,setPerfiles] = useState([]);
  const [loadPerfiles,setLoadPerfiles] = useState(false);

  const [empleados,setEmpleados] = useState([]);
  const [loadEmpleados,setLoadEmpleados] = useState(false);

  useEffect( () => {
    // proyectos
    setLoadProyectos(true);
    fetchProyectos();
    // perfiles
    setLoadPerfiles(true);
    fetchPerfiles();
    // empleadosPerfiles
    setLoadEmpleados(true);
    fetchEmpleados();
  }, [])

  console.log("ESTOY EN NUEVA TAREA")
  console.log("props: ",props)

  const fetchProyectos = async () => {
    
    axios.get("http://localhost:27195/api/Proyectos", {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioTokenData[1]}`
        }
      }
    ).then((response)=>{
      setProyectos(response.data);
      setLoadProyectos(false);
    }).catch((error)=>{
      alert(error.response.data.exceptionMessage)
      setLoadProyectos(false)
    }); 
  }

  const fetchPerfiles = async () => {
    axios.get("http://localhost:27195/api/Perfiles", {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioTokenData[1]}`
        }
      }
    ).then((response)=>{
      setPerfiles(response.data);
      setLoadPerfiles(false);
    }).catch((error)=>{
      alert(error.response.data.exceptionMessage)
      setLoadPerfiles(false)
    }); 
  }

  const fetchEmpleados = async () => {
    axios.get("http://localhost:27195/api/Empleados", {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioTokenData[1]}`
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
    <Formik 
    initialValues={{
      id: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].id : 0) : 0,
      nombre: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].nombre : '') : 0,
      proyectoID: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].proyectoID : 0) : 0,
      perfilID: "0",
      empleadoID: "0",
      horasEstimadas: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].horasEstimadas : 0) : 0,
      horasOB: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].horasOB : 0) : 0
    }}

    onSubmit={(values, {resetForm}, initialValues) => {
      axios.get(`http://localhost:27195/api/Empleados/GetEmpleadoPerfilID?empleadoID=${parseInt(values.empleadoID)}&perfilID=${parseInt(values.perfilID)}`, {
        headers: 
          {
            Authorization: `Bearer ${props.usuarioTokenData[1]}`
          }
        }
      ).then((response)=>{
        console.log(response.data);
          axios.post("http://localhost:27195/api/Tareas/update", {
          id: values.id,
          nombre: values.nombre,
          proyectoID: values.proyectoID,
          empleadoPerfilID: response.data,
          horasEstimadas: parseFloat(values.horasEstimadas),
          horasOB: parseFloat(values.horasOB)
        }, {
          headers: 
            {
              Authorization: `Bearer ${props.usuarioTokenData[1]}`
            }
          }
        ).then(res => {
          if (values.id == 0) {
            alert("Se ha creado una nueva tarea");
            resetForm({values: initialValues})
          } else {
            alert("Se ha modificado la tarea");
          }
        }).catch((error)=> {
          alert(error.response.data.exceptionMessage)
        })
      }).catch((error)=>{
        alert(error.response.data.exceptionMessage)
        setLoadEmpleados(false)
      });
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
           <Grid item xs={5} className="grid-item">
              <TextField onChange={handleChange} value={values.nombre} onBlur={handleBlur} id="nombre standard-basic" name="nombre" label="Nombre" />
              {errors.nombre && touched.nombre}
              
           </Grid>
            <Grid item className="grid-item" xs={5}>
            <p>Pertenece al proyecto: </p> {props.data ? props.data.id : ""}
              <Field onChange={handleChange} value={values.proyectoID} onBlur={handleBlur} id="proyectoID" name="proyectoID" label="Pertenece al proyecto" as="select" className="select-css">
              <option value={0}>Elija un proyecto...</option>
                { proyectos.filter(x => x.proyectoEstadoID == 1)
                           .map((item,i) => (
                    <option key={i} value={item.id}>{ item.nombre }</option>
                  )
                )}
              </Field>
              {errors.proyectoID && touched.proyectoID}
            </Grid>
            <Grid item className="grid-item" xs={5}>
              <p>Perfil para la tarea</p>
              <Field onChange={handleChange} value={values.perfilID} onBlur={handleBlur} id="perfilID standard-basic" name="perfilID" label="Perfil" as="select" className="select-css">
                <option value={0}>Elija un perfil...</option>
                { perfiles.map((item,i) => (
                  <option key={i} value={item.id}>{ item.descripcion }</option>
                ))}
              </Field>
              {errors.perfilID && touched.perfilID}
            </Grid>

           <Grid item className="grid-item" xs={5}>
              <p>Empleado</p>
              <Field onChange={handleChange} value={values.empleadoID} onBlur={handleBlur} id="empleadoID standard-basic" name="empleadoID" label="Empleado" as="select" className="select-css">
                <option value={0}>Elija un empleado...</option>
                { 
                  empleados.filter(x => x.perfiles.find(element => element.perfilID == values.perfilID)).length != 0 ?
                  (
                    empleados.filter(x => x.perfiles.find(element => element.perfilID == values.perfilID))
                             .map((item,i) => <option key={i} value={item.id}>{ item.nombre }</option>)
                  ) : (<option value={-1}>Ningún empleado posee este perfil</option>)
                }
              </Field>
              {errors.empleadoID && touched.empleadoID}
           </Grid>

           <Grid item className="grid-item" xs={5}>
              <TextField onChange={handleChange} type="number" value={values.horasEstimadas} onBlur={handleBlur} id="horasEstimadas standard-basic" name="horasEstimadas" label="Horas estimadas" />
              {errors.horasEstimadas && touched.horasEstimadas}
           </Grid>
           {/* <Grid item className="grid-item" xs={5}>
              <TextField onChange={handleChange} type="number" value={values.horasOB} onBlur={handleBlur} id="horasOB standard-basic" name="horasOB" label="Horas over budget" />
              {errors.horasOB && touched.horasOB}
           </Grid> */}

            <Grid item className="grid-item" xs={12}>
              <Button type="submit" size="medium" variant="contained" color="primary" disabled={isSubmitting}>
                Agregar
              </Button>
            </Grid>
            </Grid>
          </Form>
      </Card>
    )
  }  
  </Formik>
  )
}


function NuevaTarea(props) {

  return (
    <div className="container-form">
      <Formulario usuarioTokenData={[
        props.usuarioToken[0],
        props.usuarioToken[1]
      ]}/>
    </div>
  )
}

export default NuevaTarea
export {Formulario}