import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import {TextField, Card, Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import "../style/general.css"

function Formulario(props){
  return (
    <Formik 
        initialValues={{
          id: props.data ? props.data.id : 0,
          descripcion: props.data ? props.data.descripcion : '',
          valorHorario: props.data ? props.data.valorHorario : ''
        }}
/*
        validate={values=>{
          const errors ={};
          if (!values.proyectoNombre || !values.proyectoID || !values.perfilID || !values.empleadoID || !values.horasEstimadas || !values.horasOB){
            errors.name = "Requerido";
            errors.proyectoID = "Requerido";
            errors.perfilID = "Requerido";
            errors.empleadoPerfilID = "Requerido";
            errors.horasEstimadas = "Requerido";
            errors.horasOB = "Requerido";
          }
          return errors;
          }}
*/
        onSubmit={(values, {setSubmitting}) => {
          axios.post("http://localhost:27195/api/Perfiles/update", values).then(res => {
            console.log(res) 
          }).catch((error)=> {
            console.error("error: ",error)
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
                <Grid item className="grid-item" xs={5} >
                  <TextField onChange={handleChange} value={values.descripcion} onBlur={handleBlur} id="descripcion standard-basic" name="descripcion" label="Descripcion" />
                  {errors.descripcion && touched.descripcion}
                </Grid>

                <Grid item className="grid-item" xs={5}>
                  <TextField onChange={handleChange} value={values.valorHorario} onBlur={handleBlur} id="valorHorario standard-basic" name="valorHorario" label="Valor hora" />
                  {errors.valorHorario && touched.valorHorario}

                </Grid>
                <Grid item className="grid-item" xs={12}>
                  <Button type="submit" variant="contained" size="medium" color="primary" disabled={isSubmitting}>
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

function NuevoPerfil() {
  return (
    <div className="container-form">
      <Formulario />
    </div>
  )
}

export default NuevoPerfil
export {Formulario}


