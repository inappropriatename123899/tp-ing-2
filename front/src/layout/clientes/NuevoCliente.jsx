import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import {TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';

function NuevoCliente() {
  return (
    <div>
      <Formik 
        initialValues={{
          id: 0,
          tipoPersona: "1",
          nombre: '',
          apellido: '',
          dniCuit: 0,
          razonSocial: '',
          direccion: '',
          telefonoContacto: '',
          email: ''
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
            dniCuit: values.dniCuit,
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
          <Form onSubmit={handleSubmit}>
            <br/>
            <p>Tipo Persona: </p>
            <Field onChange={handleChange} value={values.tipoPersona} onBlur={handleBlur} id="tipoPersona" name="tipoPersona" label="Tipo Persona" as="select">
              <option value="1">Física</option>
              <option value="2">Jurídica</option>
            </Field>
            {errors.state && touched.state}
            {
              values.tipoPersona === "1" &&
              <div>
                <TextField onChange={handleChange} value={values.nombre} onBlur={handleBlur} id="nombre standard-basic" name="nombre" label="Nombre" />
                {errors.nombre && touched.nombre}
                <br/>
                <br/>
                <TextField onChange={handleChange} value={values.apellido} onBlur={handleBlur} id="apellido standard-basic" name="apellido" label="Apellido" />
                {errors.apellido && touched.apellido}
                <br/>
                <br/>
              </div>
            }
            {
              values.tipoPersona === "2" &&
              <div>
                <TextField onChange={handleChange} value={values.razonSocial} onBlur={handleBlur} id="razonSocial standard-basic" name="razonSocial" label="Razón Social" />
                {errors.razonSocial && touched.razonSocial}
                <br/>
                <br/>
              </div>
            }
            <TextField onChange={handleChange} value={values.dniCuit} onBlur={handleBlur} id="dniCuit standard-basic" name="dniCuit" label="DNI/CUIT" />
            {errors.dniCuit && touched.dniCuit}
            <br/>
            <br/>
            <TextField onChange={handleChange} value={values.direccion} onBlur={handleBlur} id="direccion standard-basic" name="direccion" label="Dirección" />
            {errors.direccion && touched.direccion}
            <br/>
            <br/>
            <TextField onChange={handleChange} value={values.telefonoContacto} onBlur={handleBlur} id="telefonoContacto standard-basic" name="telefonoContacto" label="Teléfono de contacto" />
            {errors.telefonoContacto && touched.telefonoContacto}
            <br/>
            <br/>
            <TextField onChange={handleChange} value={values.email} onBlur={handleBlur} id="email standard-basic" name="email" label="E-Mail" />
            {errors.email && touched.email}
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

export default NuevoCliente
