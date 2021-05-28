import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import axios from "axios";
import {TextField, Grid , Card} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import "../style/general.css"
import { apiLink } from "../../utils/stringBack";

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
    await axios.get(apiLink + "api/Clientes", {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioTokenData[1]}`
        }
      }
    ).then((response)=>{
      setClientes(response.data);
      setLoadClientes(false);
    }).catch((error)=>{
      alert(error.response.data.exceptionMessage)
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

          onSubmit={(values, {resetForm}, initialValues) => {
            axios.post(apiLink + "api/Proyectos/update", values, {
              headers: 
                {
                  Authorization: `Bearer ${props.usuarioTokenData[1]}`
                }
              }
            ).then(res => {
              if (values.id == 0) {
                alert("Se ha creado un nuevo proyecto");
                resetForm({values: initialValues})
              } else {
                alert("Se ha modificado el proyecto");
              }
            }).catch((error)=> {
              console.error("error en get login: ",error)
            })
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
                    {props.usuarioTokenData[2]!==undefined ? 
                      <Button type="submit" size="medium" color="primary" variant="contained" disabled={isSubmitting}>
                        Modificar
                      </Button>
                      : 
                      <Button type="submit" size="medium" color="primary" variant="contained" disabled={isSubmitting}>
                        Agregar
                      </Button>}
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
