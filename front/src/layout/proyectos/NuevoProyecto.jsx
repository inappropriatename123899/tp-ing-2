import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import axios from "axios";
import {TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';

function NuevoProyecto() {

  const [clientes,setClientes] =useState([]);
  const [loadClientes,setLoadClientes] = useState(false);

  console.log("clientes: ", clientes)
  console.log("load: ", loadClientes)

  useEffect(() => {
    setLoadClientes(true);
    fetchClientes();
    return () => {
      
    }
  }, [])

  const fetchClientes = async () => {
    await axios.get("http://localhost:27195/api/Clientes").then((response)=>{
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
            axios.post("http://localhost:27195/api/Proyectos/update", values).then(res => {
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
              <TextField onChange={handleChange} value={values.nombre} onBlur={handleBlur} id="nombre standard-basic" name="nombre" label="Nombre Proyecto" />
              {errors.nombre && touched.nombre}
              <br/>
              <br/> 
              <Field
                id="clienteID standard-basic"
                name="clienteID"
                as="select"
                onChange={handleChange}
                // no poner default value xq empieza a dar el error de uncontrolled select
              >
                <option value={0}>Elija un cliente...</option>
                {clientes.map((item,i) => (
                        <option key={i} value={item.id}>{ item.razonSocial == null ? item.nombre : item.razonSocial }</option>
                    )
                  )
                }
              </Field>
              <br/>
              <br/>
              <Field onChange={handleChange} value={values.proyectoEstadoID} onBlur={handleBlur} id="state" name="proyectoEstadoID" label="Estado" as="select">
                <option value="0">Cambie el estado de su proyecto</option>
                <option value="1">Vigente</option>
                <option value="2">Pausado</option>
                <option value="3">Cancelado</option>
                <option value="4">Finzalizado</option>
              </Field>
              {errors.proyectoEstadoID && touched.proyectoEstadoID}
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
