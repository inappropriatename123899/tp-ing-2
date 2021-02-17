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
    // empleados
    setLoadEmpleados(true);
    fetchEmpleados();
    // empleadosPerfiles
    // setLoadEmpleadosPerfiles(true);
    // fetchEmpleadosPerfiles();
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

  // const fetchEmpleadosPerfiles = async () => {
    
  //   axios.get("http://localhost:27195/api/EmpleadosPerfiles").then((response)=>{
  //     const data = response;
  //     setEmpleados(data.data);
  //     setLoadEmpleados(false);
  //   }).catch((error)=>{
  //     console.error("Error pidiendo datos: ",error);
  //     setLoadEmpleados(false)
  //   }); 
  // }

  return (
    <div>
      <Formik 
        initialValues={{
          id: 0,
          proyectoNombre: '',
          proyectoID: '',
          perfilID: '',
          empleadoPerfilID: '',
          horasEstimadas: '',
          horasOB: ''
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
          axios.post("http://localhost:27195/api/Tareas/update", {
            id: 0,
            proyectoNombre: values.proyectoNombre,
            proyectoID: parseInt(values.proyectoID),
            perfilID: parseInt(values.perfilID),
            //empleadoPerfilID: , falta poner
            horasEstimadas: '',
            horasOB: ''
          }).then(res => {
            console.log(res) 
          }).catch((error)=> {
            console.error("error en get login: ",error)
          })
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
            <TextField onChange={handleChange} value={values.proyectoNombre} onBlur={handleBlur} id="proyectoNombre standard-basic" name="proyectoNombre" label="Nombre" />
            {errors.proyectoNombre && touched.proyectoNombre}
            <br/>
            <br/>
            <p>Pertenece al proyecto: </p>
            <Field onChange={handleChange} value={values.proyectoID} onBlur={handleBlur} id="proyectoID" name="proyectoID" label="Pertenece al proyecto" as="select">
              <option value="0">Física</option>
              <option value="1">Jurídica</option>
            </Field>
            {errors.proyectoID && touched.proyectoID}
            <br/>
            <br/>
            <p>Perfil del empleado</p>
            <Field onChange={handleChange} value={values.perfilID} onBlur={handleBlur} id="perfilID standard-basic" name="perfilID" label="Perfil" as="select">
              <option value="0">Analista</option>
              <option value="1">Desarrollador</option>
            </Field>
            {errors.perfilID && touched.perfilID}
            <br/>
            <br/>
            { // para armar el empleadoperfilid, pido todos los perfiles, elijo uno y luego pido todos los empleadoperfil que tengan el id de ese perfil, desde ahí
              // se arma el select de empleadoid y luego se consigue el empleadoperfilid adecuado para enviar en este dto para dar de alta/modificar
              
              // en realidad no sería values.perfilID sino fetch de axios
              values.perfilID == 0 &&
              <div> {/* teniendo el perfil, filtrar los empleadoperfil que se pidieron antes por perfilid elegido para armar el select de empleado */}
                <p>Empleado: </p>
                <Field onChange={handleChange} value={values.empleadoPerfilID} onBlur={handleBlur} id="empleadoPerfilID standard-basic" name="empleadoPerfilID" label="Empleado" as="select">
                  <option value="0">Jorge</option>
                  <option value="1">Mariano</option>
                </Field>
                {errors.empleadoPerfilID && touched.empleadoPerfilID}
                <br/>
                <br/>
              </div>
            }
            {
              values.perfilID == 1 &&
              <div> {/* teniendo el perfil, filtrar los empleadoperfil que se pidieron antes por perfilid elegido para armar el select de empleado */}
                <p>Empleado: </p>
                <Field onChange={handleChange} value={values.empleadoID} onBlur={handleBlur} id="empleadoID standard-basic" name="empleadoID" label="Empleado" as="select">
                  <option value="0">Abel</option>
                  <option value="1">Mariano</option>
                </Field>
                {errors.empleadoID && touched.empleadoID}
                <br/>
                <br/>
              </div>
            }
            <TextField onChange={handleChange} value={values.horasEstimadas} onBlur={handleBlur} id="horasEstimadas standard-basic" name="horasEstimadas" label="Horas estimadas" />
            {errors.horasEstimadas && touched.horasEstimadas}
            <br/>
            <br/>
            <TextField onChange={handleChange} value={values.horasOB} onBlur={handleBlur} id="horasOB standard-basic" name="horasOB" label="Horas over budget" />
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