import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import {TextField, Grid, Card} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import "../style/general.css"
import { apiLink } from "../../utils/stringBack";

function Formulario(props){
  console.log("NUEVOCLIENTE PROPS: ",props)
  return (
    <Formik
    initialValues={{
      id: props.usuarioTokenData!== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].id : 0) : 0,
      tipoPersona: props.usuarioTokenData!==undefined ? 
        (props.usuarioTokenData[2]!==undefined ? 
          (props.usuarioTokenData[2].razonSocial ? 
            "2" : "1"
          ) : "0")
        : "0",
      nombre: props.usuarioTokenData!==undefined ? 
      (props.usuarioTokenData[2]!==undefined ? 
        (props.usuarioTokenData[2].razonSocial ? 
          "" : props.usuarioTokenData[2].nombre
        ) : "")
      : "",
      apellido: props.usuarioTokenData!==undefined ? 
      (props.usuarioTokenData[2]!==undefined ? 
        (props.usuarioTokenData[2].razonSocial ? 
          "" : props.usuarioTokenData[2].apellido
        ) : "")
      : "",
      dniCuit: props.usuarioTokenData!==undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].dniCuit : '') : '',
      razonSocial: props.usuarioTokenData!==undefined ? 
      (props.usuarioTokenData[2]!==undefined ? 
        (props.usuarioTokenData[2].razonSocial ? 
          props.usuarioTokenData[2].razonSocial : ""
        ) : "")
      : "",
      direccion: props.usuarioTokenData!==undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].direccion : '') : '',
      telefonoContacto: props.usuarioTokenData!==undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].telefonoContacto : '') : '',
      email: props.usuarioTokenData!==undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].email : '') : ''
    }}

    onSubmit={(values, {resetForm}, initialValues) => {
      console.log(values);
      console.log("token ",(props.usuarioTokenData[1]));
      axios.post(apiLink + "api/Clientes/update", {
        id: values.id,
        tipoPersona: parseInt(values.tipoPersona),
        nombre: values.nombre,
        apellido: values.apellido,
        dniCuit: parseInt(values.dniCuit),
        razonSocial: values.razonSocial,
        direccion: values.direccion,
        telefonoContacto: values.telefonoContacto,
        email: values.email
      }, { headers: {
            Authorization: `Bearer ${props.usuarioTokenData[1]}`
          }
        }
      ).then(res => {
        if (values.id == 0) {
          alert("Se ha creado un nuevo cliente");
          resetForm({values: initialValues})
        } else {
          alert("Se ha modificado el cliente");
        }
      }).catch((error)=> {
        alert(error.response.data.exceptionMessage)
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
                { props.usuarioTokenData[2]!==undefined ? 
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



function NuevoCliente(props) {

  return (
    <div className="container-form">
      <Formulario usuarioTokenData={[
        props.usuarioToken[0],
        props.usuarioToken[1]
      ]}/>
    </div>
  )
}




export default NuevoCliente;
export {Formulario};
