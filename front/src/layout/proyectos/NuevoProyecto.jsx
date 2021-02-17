import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import {TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';

function NuevoProyecto() {

  const [clientes,setClientes] =useState([]);
  const [loadClientes,setLoadClientes] = useState(false);

  console.log("clientes: ",clientes)
  console.log("load: ",loadClientes)

  useEffect(() => {
    setLoadClientes(true);
    fetchClientes();
    return () => {
      
    }
  }, [])

  const fetchClientes = async () => {
    
    axios.get("http://localhost:27195/api/Clientes").then((response)=>{
      const data = response;
      setClientes(data.data);
      setLoadClientes(false);
    }).catch((error)=>{
      console.error("Error pidiendo datos: ",error);
      setLoadClientes(false)
    }); 
  }

  return (
    <div>
      <Formik 
        initialValues={{
          id: 0,
          clienteID: 0,
          clienteNombre: "", // no se carga
          nombre: "",
          proyectoEstadoID: 0,
          proyectoEstadoDescripcion: "" // no se carga
        }}
        /*
        Para enviar al servidor
        {
          "id": 1,
          "clienteID": 2,
          "clienteNombre": "sample string 3",
          "nombre": "sample string 4",
          "proyectoEstadoID": 5,
          "proyectoEstadoDescripcion": "sample string 6"
        }
        */
        

        // validate={values=>{
        //   const errors ={};
        //   if (!values.username || !values.password){
        //     errors.name = "Requerido";
        //     errors.state = "Requerido"
        //   }
        //   return errors
        //   }}

        onSubmit={(values, {setSubmitting}) => {
          // enganchar a endpoint
          // http://localhost:27195/api/login/authenticate
          /*
          axios.post("http://localhost:27195/api/login/authenticate",{username: values.username, password:values.password}).then(res => {
            console.log(res) //
          }).catch((error)=> {
            console.error("error en get login: ",error)
          })
          */
        
          alert(JSON.stringify(values,null,2));
          setSubmitting(false);
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
            <TextField onChange={handleChange} value={values.nombre} onBlur={handleBlur} id="nombre standard-basic" name="nombre" label="Nombre Proyecto" />
            {errors.nombre && touched.nombre}
            <br/>
            
            <br/>
            <br/> 
            <Field name="clienteID" as="select">
              <option value="0">Cliente ID</option>
              <option value="1">opcion 1</option>
              <option value="2">opcion 2</option>

            </Field>
            <br/>
            <br/>
            <Field onChange={handleChange} value={values.proyectoEstadoDescripcion} onBlur={handleBlur} id="state" name="proyectoEstadoDescripcion" label="Estado" as="select">
              <option value="0">Abierto</option>
              <option value="1">Cerrado</option>
              <option value="2">Terminado</option>
            </Field>
            {errors.proyectoEstadoDescripcion && touched.proyectoEstadoDescripcion}
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

export default NuevoProyecto
