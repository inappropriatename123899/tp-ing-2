import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import {TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';

/*
{
  "id": 1,
  "descripcion": "sample string 2",
  "valorHorario": 3.0
}
*/

function NuevoPerfil() {
  return (
    <div>
      <Formik 
        initialValues={{
          id: 0,
          descripcion: '',
          valorHorario: ''
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
          <Form onSubmit={handleSubmit}>
            <br/>
            <TextField onChange={handleChange} value={values.descripcion} onBlur={handleBlur} id="descripcion standard-basic" name="descripcion" label="Descripcion" />
            {errors.descripcion && touched.descripcion}
            <br/>
            <br/>
            <TextField onChange={handleChange} value={values.valorHorario} onBlur={handleBlur} id="valorHorario standard-basic" name="valorHorario" label="Valor hora" />
            {errors.valorHorario && touched.valorHorario}
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

export default NuevoPerfil


