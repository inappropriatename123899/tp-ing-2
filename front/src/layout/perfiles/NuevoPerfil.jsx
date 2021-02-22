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
          id: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].id : 0) : 0,
          descripcion: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].descripcion : '') : '',
          valorHorario: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].valorHorario : '') : ''
        }}
        onSubmit={(values, {resetForm}, initialValues) => {
          axios.post("http://localhost:27195/api/Perfiles/update", values, {
            headers: 
              {
                Authorization: `Bearer ${props.usuarioTokenData[1]}`
              }
            }
          ).then(res => {
            if (values.id == 0) {
              alert("Se ha creado un nuevo perfil");
              resetForm({values: initialValues})
            } else {
              alert("Se ha modificado el perfil");
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

function NuevoPerfil(props) {
  return (
    <div className="container-form">
      <Formulario usuarioTokenData={[
        props.usuarioToken[0],
        props.usuarioToken[1]
      ]}/>
    </div>
  )
}

export default NuevoPerfil
export {Formulario}


