import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import axios from "axios";
import {TextField, Grid , Card} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import "../style/general.css"

function Formulario(props) {

  const [clientes,setClientes] =useState([]);
  const [loadClientes,setLoadClientes] = useState(false);

  console.log("PROPS EN NUEVOPROYECTO: ", props)

  console.log("clientes: ", clientes)
  console.log("load: ", loadClientes)

  useEffect(() => {
    setLoadClientes(true);
    fetchClientes();
    return () => {
      
    }
  }, [])

  const fetchClientes = async () => {
    await axios.get("http://localhost:27195/api/Clientes", {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioTokenData[1]}`
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

return (
  <Formik 
        initialValues={{
          id: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].id : 0) : 0,
          clienteID: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].clienteID : 0) : 0,
          clienteNombre: "", // no se carga
          nombre: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].nombre : "") : "",
          proyectoEstadoID: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].proyectoEstadoID : 0) : 0,
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
            axios.post("http://localhost:27195/api/Proyectos/update", values, {
              headers: 
                {
                  Authorization: `Bearer ${props.usuarioTokenData[1]}`
                }
              }
            ).then(res => {
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
            <Card className="form">
                <Form onSubmit={handleSubmit}>
                  <Grid container className="form">
                    <Grid item className="grid-item" xs={5}>
                      <TextField onChange={handleChange} value={values.nombre} onBlur={handleBlur} id="nombre standard-basic" name="nombre" label="Nombre" />
                      {errors.nombre && touched.nombre}
                    </Grid>
                    <Grid item className="grid-item" xs={5}>
                      <Field
                        id="clienteID standard-basic"
                        name="clienteID"
                        as="select"
                        className="select-css"
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
                    </Grid>
                    <Grid item className="grid-item" xs={12}>
                      <Field onChange={handleChange} value={values.proyectoEstadoID} onBlur={handleBlur} id="state" name="proyectoEstadoID" label="Estado" as="select"
                      className="select-css">
                        <option value="0">Cambie el estado de su proyecto</option>
                        <option value="1">Vigente</option>
                        <option value="2">Pausado</option>
                        <option value="3">Cancelado</option>
                        <option value="4">Finzalizado</option>
                      </Field>
                      {errors.proyectoEstadoID && touched.proyectoEstadoID}
                    </Grid>
                    <Grid item className="grid-item">
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


function NuevoProyecto(props) {
  return (
    <div className="container-form">
      <Formulario usuarioTokenData={[
        props.usuarioToken[0],
        props.usuarioToken[1]
      ]}/>
    </div>
  )
}

export default NuevoProyecto
export { Formulario }
