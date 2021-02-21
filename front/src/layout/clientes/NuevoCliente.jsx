import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import {TextField, Grid, Card} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import "../style/general.css"

function Formulario(props){
  return (
    <Formik
    initialValues={{
      id: props.data!==undefined ? props.data.id : 0,
      tipoPersona: props.data!==undefined ? (props.data.razonSocial ? "2" : "1") : "0",
      nombre: props.data!==undefined ? (props.data.razonSocial ? "" : props.data.nombre) : "",
      apellido: props.data!==undefined ? (props.data.razonSocial ? "" : props.data.apellido) : "",
      dniCuit: props.data!==undefined ? props.data.dniCuit : '',
      razonSocial: props.data!==undefined ? (props.data.razonSocial ? props.data.razonSocial : "") : "",
      direccion: props.data!==undefined ? props.data.direccion : '',
      telefonoContacto: props.data!==undefined ? props.data.telefonoContacto : '',
      email: props.data!==undefined ? props.data.email : ''
    }}
  /*
  {
  "id": 1,
  "nombre": "sample string 2",
  "apellido": "sample string 3",
  "dniCuit": 4,
  "razonSocial": "sample string 5",
  "direccion": "sample string 6",
  "telefonoContacto": 1,
  "email": "sample string 7",
  "tipoPersona": 8
  }
  */
    // validate={values=>{
    //   const errors ={};
    //   if (!values.tipoPersona || !values.name || !values.surname || !values.dniCuit || !values.razonSocial
    //    || !values.direccion || !values.telefonoContacto || !values.telefonoCelular || !values.email){
    //     errors.tipoPersona = "Requerido";
    //     errors.name = "Requerido";
    //     errors.surname = "Requerido";
    //     errors.dniCuit = "Requerido";
    //     errors.razonSocial = "Requerido";
    //     errors.direccion = "Requerido";
    //     errors.telefonoContacto = "Requerido";
    //     errors.email = "Requerido";
    //   }
    //   return errors;
    //   }}

    onSubmit={(values, {setSubmitting}) => {
      // enganchar a endpoint
      // http://localhost:27195/api/login/authenticate
      console.log(values);
      axios.post("http://localhost:27195/api/Clientes/update", {
        id: values.id,
        tipoPersona: parseInt(values.tipoPersona),
        nombre: values.nombre,
        apellido: values.apellido,
        dniCuit: parseInt(values.dniCuit),
        razonSocial: values.razonSocial,
        direccion: values.direccion,
        telefonoContacto: values.telefonoContacto,
        email: values.email
      }).then(res => {
        console.log(res) 
      }).catch((error)=> {
        console.error("error al subir datos: ",error)
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
          <br/>
          <Grid container className="form">
            <Grid item xs={12} className="grid-item">
              <p>Tipo Persona: </p>
              <Field onChange={handleChange} value={values.tipoPersona} onBlur={handleBlur} id="tipoPersona" name="tipoPersona" label="Tipo Persona" as="select" className="select-css">
                <option value="0">Elija un tipo de persona...</option>
                <option value="1">Física</option>
                <option value="2">Jurídica</option>
              </Field>
              {errors.state && touched.state}
            </Grid>
            {
              values.tipoPersona === "1" &&
              <Grid container className="form">
                <Grid item xs={5} className="grid-item">
                  <TextField onChange={handleChange} value={values.nombre} onBlur={handleBlur} id="nombre standard-basic" name="nombre" label="Nombre" />
                  {errors.nombre && touched.nombre}
                </Grid>
                <Grid item xs={5} className="grid-item">
                  <TextField onChange={handleChange} value={values.apellido} onBlur={handleBlur} id="apellido standard-basic" name="apellido" label="Apellido" />
                  {errors.apellido && touched.apellido}
                </Grid>
              </Grid>
            }
            {
              values.tipoPersona === "2" &&
              <Grid container spacing={2} className="form">
                <Grid item xs={12} className="grid-item">
                  <TextField onChange={handleChange} value={values.razonSocial} onBlur={handleBlur} id="razonSocial standard-basic" name="razonSocial" label="Razón Social" />
                  {errors.razonSocial && touched.razonSocial}
                </Grid>
              </Grid>
            }
            <Grid container className="form">
              <Grid className="grid-item" item xs={5}>
                <TextField onChange={handleChange} value={values.dniCuit} onBlur={handleBlur} id="dniCuit standard-basic" name="dniCuit" label="DNI/CUIT" />
                {errors.dniCuit && touched.dniCuit}
              </Grid>
              <Grid className="grid-item" item xs={5}>
                <TextField onChange={handleChange} value={values.direccion} onBlur={handleBlur} id="direccion standard-basic" name="direccion" label="Dirección" />
                {errors.direccion && touched.direccion}
              </Grid>
            </Grid>
            <Grid container className="form">
              <Grid className="grid-item" item xs={5}>
                <TextField onChange={handleChange} value={values.telefonoContacto} onBlur={handleBlur} id="telefonoContacto standard-basic" name="telefonoContacto" label="Teléfono de contacto" />
                {errors.telefonoContacto && touched.telefonoContacto}
              </Grid>
              <Grid className="grid-item" item xs={5}>
                <TextField onChange={handleChange} value={values.email} onBlur={handleBlur} id="email standard-basic" name="email" label="E-Mail" />
                {errors.email && touched.email}
              </Grid>
            </Grid>
            <Grid container className="form">
              <Grid item xs={12} className="grid-item" >
                { props.data!==undefined ? 
                <Button type="submit" size="medium" color="primary" variant="contained" disabled={isSubmitting}>
                  Modificar
                </Button>
                 : 
                <Button type="submit" size="medium" color="primary" variant="contained" disabled={isSubmitting}>
                  Agregar
                </Button>}
                
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </Card>
    )
  }  
  </Formik>
  )
}



function NuevoCliente() {

  return (
    <div className="container-form">
      <Formulario/>
    </div>
  )

}




export default NuevoCliente;
export {Formulario};
