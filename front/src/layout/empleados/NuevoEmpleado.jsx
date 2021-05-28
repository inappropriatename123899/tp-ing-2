import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import axios from "axios";
import {ListItemAvatar, TextField , Card , Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {Select,InputLabel, MenuItem,FormControl,IconButton} from "@material-ui/core";
import Moment from 'react-moment';
import "../style/general.css"
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import moment from 'moment'
import { Redirect } from "react-router-dom";
import { apiLink } from "../../utils/stringBack";

function Formulario(props){

  const [profiles,setProfiles] = useState([]);
  const [loadProfiles,setLoadProfiles] = useState(false);

  console.log("perfiles: ",profiles)
  console.log("load: ",loadProfiles)

  useEffect(() => {
    // perfiles
    setLoadProfiles(true);
    fetchProfiles();
    return () => {
      
    }
  }, [])

  console.log("ESTOY EN NUEVO EMPLEADO")
  console.log("props: ",props)

  const fetchProfiles = async () => {
    
    axios.get(apiLink + "api/Perfiles", {
      headers: 
        {
          Authorization: `Bearer ${props.usuarioTokenData[1]}`
        }
      }
    ).then((response)=>{
      const data = response;
      setProfiles(data.data);
      setLoadProfiles(false);
    }).catch((error)=>{
      alert(error.response.data.exceptionMessage)
      setLoadProfiles(false)
    }); 
  }

  const armarArrayInt = (perfilesAListaInt) => {
    let arr = [];

    perfilesAListaInt.forEach(x => {
      arr.push(x.perfilID);
    });

    console.log(arr);

    return arr;
  }

  return(

  <Formik 
        initialValues= {{
          id: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].id : 0) : 0,
          nombre: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].nombre : '') : '',
          apellido: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].apellido : '') : '',
          dni: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].dni : '') : '',
          fechaIngreso: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].fechaIngreso : '') : '',
          usuario: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].usuario : '') : '',
          clave: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].clave : '') : '',
          rolID: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? props.usuarioTokenData[2].rolID : 0) : 0,
          perfiles2: props.usuarioTokenData !== undefined ? (props.usuarioTokenData[2]!==undefined ? armarArrayInt(props.usuarioTokenData[2].perfiles) : [0]) : [0] // array de int
        }}

        onSubmit={ async (values, {resetForm}, initialValues) => {
          // acá se arma el array de perfiles para enviar como detalle
          let array2 = profiles.map((element) => (values.perfiles2.find(x => x == element.id) ? element : null))
                               .filter((element) => element !== null);

          let array3 = [];

          array2.forEach((x) => {
              props.usuarioTokenData[2] ? (
                  array3.push({
                    id: props.usuarioTokenData[2].perfiles.find(y => y.perfilID == x.id) ? props.usuarioTokenData[2].perfiles.find(y => y.perfilID == x.id).id : 0,
                    empleadoID: props.usuarioTokenData[2].perfiles.find(y => y.perfilID == x.id) ? props.usuarioTokenData[2].perfiles.find(y => y.perfilID == x.id).empleadoID : 0,
                    empleadoNombre: null,
                    perfilID: x.id,
                    perfilDescripcion: null
                  })
                )
              : (
                array3.push({
                  id: 0,
                  empleadoID: 0,
                  empleadoNombre: null,
                  perfilID: x.id,
                  perfilDescripcion: null
                })
              )
            }
          )

          console.log("array3: ", array3)

          

          axios.post(apiLink + "api/Empleados/update", {
            id: values.id,
            nombre: values.nombre,
            apellido: values.apellido,
            dni: parseInt(values.dni),
            usuario: values.usuario,
            clave: values.clave,
            fechaIngreso: values.fechaIngreso,
            rolID: parseInt(values.rolID),
            perfiles: array3
          }, {
            headers: 
              {
                Authorization: `Bearer ${props.usuarioTokenData[1]}`
              }
            }
          ).then(res => {
            if (values.id == 0) {
              alert("Se ha creado un nuevo empleado");
              resetForm({values: initialValues})
            } else {
              alert("Se ha modificado el empleado");
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
          <Card style={{minWidth:"800px"}}>
            <Form onSubmit={handleSubmit}>
             <Grid container className="form-grid">
                <Grid item xs={7}>
                  <Grid container className="form">
                    <Grid item className="grid-item" xs={6}>
                      <TextField onChange={handleChange} value={values.nombre} onBlur={handleBlur} id="nombre standard-basic" name="nombre" label="Nombre" />
                      {errors.nombre && touched.nombre}
                    </Grid>
  
                    <Grid item className="grid-item" xs={6}>
                      <TextField onChange={handleChange} value={values.apellido} onBlur={handleBlur} id="apellido standard-basic" name="apellido" label="Apellido" />
                      {errors.apellido && touched.apellido}
                    </Grid>
                  </Grid>
  
                 <Grid container className="form">
                   <Grid item className="grid-item" xs={6}>
                      <TextField onChange={handleChange} value={values.dni} placeholder="0" onBlur={handleBlur} id="dni standard-basic" name="dni" label="DNI" />
                      {errors.dni && touched.dni}
                   </Grid>
                   <Grid className="grid-item" item xs={6}>
                      <TextField  
                      type="date"
                      onChange={handleChange} value={values.fechaIngreso} onBlur={handleBlur} id="fechaIngreso standard-basic" name="fechaIngreso" label="Fecha" 
                      InputLabelProps={{
                        shrink: true,
                      }}/>
                      {errors.fechaIngreso && touched.fechaIngreso}
                    </Grid>
                 </Grid>
                 <Grid container className="form">
                    <Grid item className="grid-item" xs={6}>
                      <TextField onChange={handleChange} value={values.usuario} onBlur={handleBlur} id="usuario standard-basic" name="usuario" label="Usuario" />
                      {errors.usuario && touched.usuario}
                    </Grid>
                    <Grid item className="grid-item" xs={6}>
                      <TextField onChange={handleChange} value={values.clave} onBlur={handleBlur} id="clave standard-basic" name="clave" label="Contraseña" />
                      {errors.clave && touched.clave}
                    </Grid>
                  </Grid>
                  <Grid item className="grid-item" xs={12}>
                    <label>Rol: </label>
                    <br/>
                    <Field onChange={handleChange} value={values.rolID} onBlur={handleBlur} id="state"
                    className="select-css" name="rolID" label="Rol" as="select">
                      <option value="0">Elija un rol para el empleado...</option>
                      <option value="1">Administrador</option>
                      <option value="2">Supervisor</option>
                      <option value="3">Empleado</option>
                    </Field>
                    {errors.rolID && touched.rolID}
                  
                  </Grid>
                </Grid>
 
                <Grid item xs={5}>
                  <Grid container className="form">
                  <label>Perfil/es:</label>
                    <FieldArray name="perfiles2">
                    {({ insert, remove, push }) => (
                      <Grid container className="form">
                        {values.perfiles2.length > 0  ?
                          values.perfiles2.map((perfil, index) => (
                                <Grid container key={index} className="form">
                                  <Grid item xs={8} >
                                    <Field className="select-css"
                                      name={`perfiles2.${index}`}
                                      as="select"
                                      onChange={handleChange}
                                    >
                                      <option value={0}>Elija un perfil...</option>
                                      {profiles.map((item,i) => (
                                            <option key={i} value={item.id}>{item.descripcion}</option>
                                          )
                                        )
                                      }
                                    </Field>
                                  </Grid>
    
                                  <Grid item  xs={1}>
                                    <IconButton color="secondary" onClick={() => remove(index)}><ClearIcon/></IconButton>
                                  </Grid>
                                  
                                </Grid> 
                          ))
                          :
                          <Grid/>
                        }
                        {profiles.length > values.perfiles2.length ? <Grid item xs={1}>
                                    <IconButton color="primary" onClick={() => push(0)}>
                                      <AddIcon/>
                                    </IconButton>
                        </Grid>:
                        <Grid/>}
                      </Grid>
                    )}
                    </FieldArray>
                  </Grid>
                    
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
      </Formik>)
}


function NuevoEmpleado(props) {

  return (
    <div className="container-form">
      <Formulario usuarioTokenData={[
        props.usuarioToken[0],
        props.usuarioToken[1]
      ]}/>
    </div>
  )
}

export default NuevoEmpleado
export {Formulario}
