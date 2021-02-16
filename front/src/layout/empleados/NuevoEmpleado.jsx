import React from 'react';
import { Formik, Field, Form, FieldArray,ErrorMessage } from 'formik';
import axios from "axios";
import {ListItemAvatar, TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {Select,InputLabel, MenuItem,FormControl} from "@material-ui/core";
import Moment from 'react-moment';

function NuevoEmpleado() {
  const perfilesFetch = [ // esto se carga con el endpoint http://localhost:27195/api/Perfiles
    {
      id: 0,
      descripcion: "Elija un perfil",
      valorHorario: 0
    },
    {
      id: 1,
      descripcion: "Analista",
      valorHorario: 3.0
    },
    {
      id: 2,
      descripcion: "Desarrollador",
      valorHorario: 3.0
    },
    {
      id: 3,
      descripcion: "Tester",
      valorHorario: 3.0
    },
    {
      id: 4,
      descripcion: "Implementador",
      valorHorario: 3.0
    },
    {
      id: 5,
      descripcion: "Capacitador",
      valorHorario: 3.0
    },
    {
      id: 6,
      descripcion: "Supervisor",
      valorHorario: 3.0
    }
  ]

  return (
    <div>
      <Formik 
        initialValues= {{
          id: 0,
          nombre: '',
          apellido: '',
          dni: 0,
          fechaIngreso: '',
          usuario: '',
          clave: '',
          perfiles: [0] // array de int
        }}
/*

https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date

https://material-ui.com/components/pickers/#date-time-pickers

{
  "id": 1,
  "nombre": "sample string 2",
  "apellido": "sample string 3",
  "dni": 4,
  "fechaIngreso": "2021-02-16T17:51:46.5867906-03:00",
  "usuario": "sample string 6",
  "clave": "sample string 7",
  "perfiles": [
    {
      "id": 1,
      "empleadoID": 2,
      "empleadoNombre": "sample string 3",
      "perfilID": 4,
      "perfilDescripcion": "sample string 5"
    },
    {
      "id": 1,
      "empleadoID": 2,
      "empleadoNombre": "sample string 3",
      "perfilID": 4,
      "perfilDescripcion": "sample string 5"
    }
  ]
} AUNQUE MANDAMOS ESTO, EN EL ESTADO GUARDAMOS SÓLO ID DE PERFIL ([int])

        validate={values=>{
          const errors ={};
          if (!values.name || !values.surname || !values.dni || !values.fechaIngreso || (values.perfiles.length == 0) || !values.usuario || !values.clave){
            errors.name = "Requerido";
            errors.surname = "Requerido";
            errors.dni = "Requerido";
            errors.fechaIngreso = "Requerido";
            errors.perfiles = "Requerido";
            errors.usuario = "Requerido";
            errors.clave = "Requerido";
          }
          return errors;
        }}
*/
        onSubmit={ async (values, setSubmitting) => {
          // enganchar a endpoint
          // http://localhost:27195/api/login/authenticate
          /*
          axios.post("http://localhost:27195/api/login/authenticate",{username: values.username, password:values.password}).then(res => {
            console.log(res) //
          }).catch((error)=> {
            console.error("error en get login: ",error)
          })
          */
         await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
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
            <TextField onChange={handleChange} value={values.name} onBlur={handleBlur} id="name standard-basic" name="name" label="Nombre" />
            {errors.name && touched.name}
            <br/>
            <br/>
            <TextField onChange={handleChange} value={values.surname} onBlur={handleBlur} id="surname standard-basic" name="surname" label="Apellido" />
            {errors.surname && touched.surname}
            <br/>
            <br/>
            <TextField onChange={handleChange} value={values.dni} onBlur={handleBlur} id="dni standard-basic" name="dni" label="DNI" />
            {errors.dni && touched.dni}
            <br/>
            <br/>{/* a rellenar con un fetch de perfiles */}
            <FieldArray name="perfiles">
            {({ insert, remove, push }) => (
              <div>
                {values.perfiles.length > 0 &&
                  values.perfiles.map((perfil, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label >Perfil: </label>
                        <br/>
                        <Field
                          //labelId="labelSelectPerfiles"
                          name={`perfiles.${index}`}
                          // component={Select} esto da error
                          as="select"
                          // defaultValue={`perfilesFetch[0]`}
                          onChange={handleChange}
                        >
                          {perfilesFetch.map((item,i) => (
                                  <option key={i} value={item.id}>{item.descripcion}</option>
                              )
                            )
                          }
                        </Field>
                      </div>
                      <div className="col">
                        <button type="button" className="secondary" onClick={() => remove(index)}>Descartar</button>
                      </div>
                    </div>
                  ))}
                <button type="button" className="secondary" onClick={() => push(0)}
                >
                  Agregar perfil
                </button>
              </div>
            )}
          </FieldArray>
            {/* validaciones */}
            <br/>
            <br/>
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
            <TextField onChange={handleChange} value={values.usuario} onBlur={handleBlur} id="usuario standard-basic" name="usuario" label="Usuario" />
            {errors.usuario && touched.usuario}
            <br/>
            <br/>
            <TextField onChange={handleChange} value={values.clave} onBlur={handleBlur} id="clave standard-basic" name="clave" label="Contraseña" />
            {errors.clave && touched.clave}
            <br/>
            <br/>
            <TextField onChange={handleChange} placeholder='1976-04-19T12:59-0500' value={values.fechaIngreso} onBlur={handleBlur} id="fechaIngreso standard-basic" name="fechaIngreso" label="Fecha de Ingreso" />
            {errors.fechaIngreso && touched.fechaIngreso}
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

export default NuevoEmpleado

/*
{
  "id": 1,
  "nombre": "sample string 2",
  "apellido": "sample string 3",
  "dni": 4,
  "fechaIngreso": "2021-02-16T11:08:27.7221078-03:00",
  "usuario": "sample string 6",
  "clave": "sample string 7",
  "perfiles": [
    {
      "id": 1,
      "empleadoID": 2,
      "empleadoNombre": "sample string 3",
      "perfilID": 4,
      "perfilDescripcion": "sample string 5"
    },
    {
      "id": 1,
      "empleadoID": 2,
      "empleadoNombre": "sample string 3",
      "perfilID": 5,
      "perfilDescripcion": "sample string 5"
    }
  ]
}
*/

//
/* {empleados.map((empleado,i)=>(
              <option key={i} value="empleado">{empleado.nombre}</option>
            ))} */