import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import {TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';

function NuevaTarea() {

  const [proyectos,setProyectos] = useState([]);
  const [loadProyectos,setLoadProyectos] = useState(false);

  const [perfiles,setPerfiles] = useState([]);
  const [loadPerfiles,setLoadPerfiles] = useState(false);

  const [empleados,setEmpleados] = useState([]);
  const [loadEmpleados,setLoadEmpleados] = useState(false);

  // const [empleadosPerfiles,setEmpleadosPerfiles] = useState([]);
  // const [loadEmpleadosPerfiles,setLoadEmpleadosPerfiles] = useState(false);

  console.log("proyectos: ",proyectos)
  console.log("load: ",loadProyectos)

  console.log("perfiles: ",perfiles)
  console.log("load: ",loadPerfiles)

  console.log("empleados: ",empleados)
  console.log("load: ",loadEmpleados)

  // console.log("empleadosPerfiles: ",empleadosPerfiles)
  // console.log("load: ",loadEmpleadosPerfiles)

  useEffect(() => {
    // proyectos
    setLoadProyectos(true);
    fetchProyectos();
    // perfiles
    setLoadPerfiles(true);
    fetchPerfiles();
    // empleadosPerfiles
    setLoadEmpleados(true);
    fetchEmpleados();
    return () => {
      
    }
  }, [])


  const fetchProyectos = async () => {
    
    axios.get("http://localhost:27195/api/Proyectos").then((response)=>{
      const data = response;
      setProyectos(data.data);
      setLoadProyectos(false);
    }).catch((error)=>{
      console.error("Error pidiendo datos: ",error);
      setLoadProyectos(false)
    }); 
  }

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

  const fetchEmpleados = async () => {
    axios.get("http://localhost:27195/api/Empleados").then((response)=>{
      const data = response;
      setEmpleados(data.data);
      setLoadEmpleados(false);
    }).catch((error)=>{
      console.error("Error pidiendo datos: ",error);
      setLoadEmpleados(false)
    }); 
  }

  return (
    <div>
      <Formik 
        initialValues={{
          id: 0,
          nombre: '',
          proyectoID: 0,
          perfilID: 0,
          empleadoID: 0,
          horasEstimadas: 0,
          horasOB: 0
        }}
/*
{
  "id": 1,
  "proyectoID": 2,
  "proyectoNombre": "sample string 3",
  "empleadoPerfilID": 4,
  "empleadoPerfilNombreEmplado": "sample string 5",
  "empleadoPerfilDescripcion": "sample string 6",
  "nombre": "sample string 7",
  "horasEstimadas": 8.0,
  "horasOB": 9.0
}
*/
        // validate={values=>{
        //   const errors ={};
        //   if (!values.proyectoNombre || !values.proyectoID || !values.perfilID || !values.empleadoID || !values.horasEstimadas || !values.horasOB){
        //     errors.name = "Requerido";
        //     errors.proyectoID = "Requerido";
        //     errors.perfilID = "Requerido";
        //     errors.empleadoPerfilID = "Requerido";
        //     errors.horasEstimadas = "Requerido";
        //     errors.horasOB = "Requerido";
        //   }
        //   return errors;
        //   }}

        onSubmit={(values, {setSubmitting}) => {
          // console.log(`http://localhost:27195/api/Empleados/GetEmpleadoPerfilID?empleadoID=${values.empleadoID}&perfilID=${values.perfilID}`);
          // console.log(`http://localhost:27195/api/Empleados/GetEmpleadoPerfilID?empleadoID=${parseInt(values.empleadoID)}&perfilID=${parseInt(values.perfilID)}`);
          // console.log(values.empleadoID);
          // console.log(values.perfilID);
          // console.log(parseInt(values.empleadoID));
          // console.log(parseInt(values.perfilID));
          axios.get(`http://localhost:27195/api/Empleados/GetEmpleadoPerfilID?empleadoID=${parseInt(values.empleadoID)}&perfilID=${parseInt(values.perfilID)}`).then((response)=>{
            console.log(response.data);

              axios.post("http://localhost:27195/api/Tareas/update", {
              id: 0,
              nombre: values.nombre,
              proyectoID: values.proyectoID,
              empleadoPerfilID: response.data,
              horasEstimadas: parseFloat(values.horasEstimadas),
              horasOB: parseFloat(values.horasOB)
            }).then(res => {
              console.log(res) 
            }).catch((error)=> {
              console.error("error en get login: ",error)
            })
          }).catch((error)=>{
            console.error("Error pidiendo datos: ",error);
            setLoadEmpleados(false)
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
            <br/>
            <TextField onChange={handleChange} value={values.nombre} onBlur={handleBlur} id="nombre standard-basic" name="nombre" label="Nombre" />
            {errors.nombre && touched.nombre}
            <br/>
            <br/>
            <p>Pertenece al proyecto: </p>
            <Field onChange={handleChange} value={values.proyectoID} onBlur={handleBlur} id="proyectoID" name="proyectoID" label="Pertenece al proyecto" as="select">
            <option value={0}>Elija un proyecto...</option>
              { proyectos.filter(x => x.proyectoEstadoID == 1)
                         .map((item,i) => (
                <option key={i} value={item.id}>{ item.nombre }</option>
              ))}
            </Field>
            {errors.proyectoID && touched.proyectoID}
            <br/>
            <br/>
            <p>Perfil para la tarea</p>
            <Field onChange={handleChange} value={values.perfilID} onBlur={handleBlur} id="perfilID standard-basic" name="perfilID" label="Perfil" as="select">
              <option value={0}>Elija un perfil...</option>
              { perfiles.map((item,i) => (
                <option key={i} value={item.id}>{ item.descripcion }</option>
              ))}
            </Field>
            {errors.perfilID && touched.perfilID}
            <br/>
            <br/>
            <p>Empleado</p>
            <Field onChange={handleChange} value={values.empleadoID} onBlur={handleBlur} id="empleadoID standard-basic" name="empleadoID" label="Empleado" as="select">
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
            <br/>
            <br/>
            <TextField onChange={handleChange} type="number" value={values.horasEstimadas} onBlur={handleBlur} id="horasEstimadas standard-basic" name="horasEstimadas" label="Horas estimadas" />
            {errors.horasEstimadas && touched.horasEstimadas}
            <br/>
            <br/>
            <TextField onChange={handleChange} type="number" value={values.horasOB} onBlur={handleBlur} id="horasOB standard-basic" name="horasOB" label="Horas over budget" />
            {errors.horasOB && touched.horasOB}
            <br/>
            <br/>
            <Button type="submit" size="small" color="primary" disabled={isSubmitting}>
              Agregar
            </Button>
          </Form>
        )
      }  
      </Formik>
    </div>
  )
}

export default NuevaTarea

/*
{
  "id": 1,
  "proyectoID": 2,
  "proyectoNombre": "sample string 3",
  "empleadoPerfilID": 4,
  "empleadoPerfilNombreEmplado": "sample string 5",
  "empleadoPerfilDescripcion": "sample string 6",
  "nombre": "sample string 7",
  "horasEstimadas": 8.0,
  "horasOB": 9.0
}

<add name="DBGestionProyectos" connectionString="Data Source=DESKTOP-96SE15A\SQLEXPRESS;Initial Catalog=DBGestionProyectos;Integrated Security=SSPI; MultipleActiveResultSets=true" providerName="System.Data.SqlClient" />

*/