import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import axios from "axios";
import {ListItemAvatar, TextField , Card , Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {Select,InputLabel, MenuItem,FormControl} from "@material-ui/core";
import Moment from 'react-moment';
import "../style/general.css"



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

  const fetchProfiles = async () => {
    
    axios.get("http://localhost:27195/api/Perfiles").then((response)=>{
      const data = response;
      setProfiles(data.data);
      setLoadProfiles(false);
    }).catch((error)=>{
      console.error("Error pidiendo datos: ",error);
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
          id: props.data? props.data.id : 0,
          nombre: props.data? props.data.nombre : '',
          apellido: props.data? props.data.apellido : '',
          dni: props.data? props.data.dni : '',
          fechaIngreso: props.data? props.data.fechaIngreso : '',
          usuario: props.data? props.data.usuario : '',
          clave: props.data? props.data.clave : '',
          rolID: props.data? props.data.rolID : 0,
          perfiles2: props.data? armarArrayInt(props.data.perfiles) : [0] // array de int
        }}

        onSubmit={ async (values, setSubmitting) => {
          // acá se arma el array de perfiles para enviar como detalle
          let array2 = profiles
            .map((element) => (values.perfiles2.find(x => x == element.id) ? element : null))
            .filter((element) => element !== null);

          let array3 = [];

          array2.forEach((x) => {
            array3.push({
              id: 0,
              empleadoID: 0,
              empleadoNombre: null,
              perfilID: x.id,
              perfilDescripcion: null
            })
          })

          axios.post("http://localhost:27195/api/Empleados/update", {
            id: values.id,
            nombre: values.nombre,
            apellido: values.apellido,
            dni: parseInt(values.dni),
            usuario: values.usuario,
            clave: values.clave,
            fechaIngreso: values.fechaIngreso,
            rolID: parseInt(values.rolID),
            perfiles: array3
          }).then(res => {
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
                <br/>
                <Grid container className="form">
                  <Grid item className="grid-item" xs={5}>
                    <TextField onChange={handleChange} value={values.nombre} onBlur={handleBlur} id="nombre standard-basic" name="nombre" label="Nombre" />
                    {errors.nombre && touched.nombre}
                  </Grid>

                  <Grid item className="grid-item" xs={5}>
                    <TextField onChange={handleChange} value={values.apellido} onBlur={handleBlur} id="apellido standard-basic" name="apellido" label="Apellido" />
                    {errors.apellido && touched.apellido}
                  </Grid>
                </Grid>

               <Grid item className="grid-item" xs={12}>
                  <TextField onChange={handleChange} value={values.dni} placeholder="0" onBlur={handleBlur} id="dni standard-basic" name="dni" label="DNI" />
                  {errors.dni && touched.dni}
               </Grid>
{/* a rellenar con un fetch de perfiles */}
                <Grid container className="form">
                  <FieldArray name="perfiles2">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.perfiles2.length > 0 &&
                        values.perfiles2.map((perfil, index) => (
                          <div className="row" key={index}>
                            <div className="col">
                              <label>Perfil: </label>
                              <br/>
                              <Field
                                //labelId="labelSelectPerfiles"
                                name={`perfiles2.${index}`}
                                // component={Select} esto da error
                                as="select"
                                // defaultValue={`perfilesFetch[0]`}
                                onChange={handleChange}
                              >
                                <option value={0}>Elija un perfil...</option>
                                {profiles.map((item,i) => (
                                        <option key={i} value={item.id}>{item.descripcion}</option>
                                    )
                                  )
                                }
                              </Field>
                            </div>
                            <div className="col">
                              <Button color="primary" variant="outlined" className="secondary" onClick={() => remove(index)}>Descartar</Button>
                            </div>
                          </div>
                        ))}
                      <Button color="primary" variant="outlined" className="secondary" onClick={() => push(0)}
                      >
                        Agregar perfil
                      </Button>
                    </div>
                  )}
                  </FieldArray>
                  </Grid>

                  <Grid item className="grid-item" xs={12}>
                    <label>Rol: </label>
                    <br/>
                    <Field onChange={handleChange} value={values.rolID} onBlur={handleBlur} id="state" name="rolID" label="Rol" as="select">
                      <option value="0">Elija un rol para el empleado...</option>
                      <option value="1">Administrador</option>
                      <option value="2">Supervisor</option>
                      <option value="3">Empleado</option>
                    </Field>
                    {errors.rolID && touched.rolID}
                  
                  </Grid>

                { // para armar el empleadoperfilid, pido todos los perfiles, elijo uno y luego pido todos los empleadoperfil que tengan el id de ese perfil, desde ahí
                  // se arma el select de empleadoid y luego se consigue el empleadoperfilid adecuado para enviar en este dto para dar de alta/modificar
                  
                  // en realidad no sería values.perfilID sino fetch de axios
                  values.perfilID == 0 &&
                  <div> {/* teniendo el perfil, filtrar los empleadoperfil que se pidieron antes por perfilid elegido para armar el select de empleado */}
                    <p>Empleado: </p>
                    <Field onChange={handleChange} value={values.empleadoID} onBlur={handleBlur} id="empleadoID standard-basic" name="empleadoID" label="Empleado" as="select">
                      <option value="0">Jorge</option>
                      <option value="1">Mariano</option>
                    </Field>
                    {errors.empleadoID && touched.empleadoID}
                    <br/>
                    <br/>
                  </div>
                }
                {
                  values.perfilID == 1 &&
                  <div> {/* teniendo el perfil, filtrar los empleadoperfil que se pidieron antes por perfilid elegido para armar el select de empleado */}
                    <p>Empleado: </p>
                    <Field onChange={handleChange} value={values.empleadoID} onBlur={handleBlur} id="empleadoID standard-basic" name="empleadoID" label="Empleado" as="select">
                      <option value="0">Abel</option>
                      <option value="1">Mariano</option>
                    </Field>
                    {errors.empleadoID && touched.empleadoID}
                    <br/>
                    <br/>
                  </div>
                }
                <Grid container className="form">
                  <Grid item className="grid-item" xs={5}>
                    <TextField onChange={handleChange} value={values.usuario} onBlur={handleBlur} id="usuario standard-basic" name="usuario" label="Usuario" />
                    {errors.usuario && touched.usuario}
                  </Grid>
                  <Grid item className="grid-item" xs={5}>
                    <TextField onChange={handleChange} value={values.clave} onBlur={handleBlur} id="clave standard-basic" name="clave" label="Contraseña" />
                    {errors.clave && touched.clave}
                  </Grid>
                </Grid>
 
                <Grid className="grid-item" item xs={12}>
                  <TextField onChange={handleChange} placeholder='1976-04-19' value={values.fechaIngreso} onBlur={handleBlur} id="fechaIngreso standard-basic" name="fechaIngreso" label="Fecha de Ingreso" />
                  {errors.fechaIngreso && touched.fechaIngreso}
                </Grid>

                <Grid item className="grid-item" xs={12}>
                  <Button type="submit" size="medium" variant="contained" color="primary" disabled={isSubmitting}>
                    Agregar
                  </Button>
                </Grid>
             </Grid>
            </Form>
          </Card>
        )
      }  
      </Formik>)
}


function NuevoEmpleado() {

  // const [profiles,setProfiles] = useState([]);
  // const [loadProfiles,setLoadProfiles] = useState(false);

  // console.log("perfiles: ",profiles)
  // console.log("load: ",loadProfiles)

  // useEffect(() => {
  //   // perfiles
  //   setLoadProfiles(true);
  //   fetchProfiles();
  //   return () => {
      
  //   }
  // }, [])

  // const fetchProfiles = async () => {
    
  //   axios.get("http://localhost:27195/api/Perfiles").then((response)=>{
  //     const data = response;
  //     setProfiles(data.data);
  //     setLoadProfiles(false);
  //   }).catch((error)=>{
  //     console.error("Error pidiendo datos: ",error);
  //     setLoadProfiles(false)
  //   }); 
  // }

  return (
    <div className="container-form">
      <Formulario />
    </div>
  )
}

export default NuevoEmpleado
export {Formulario}
