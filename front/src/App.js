import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route ,Switch , useHistory, Link, Redirect } from "react-router-dom";
//import Login from "./layout/login/Login";
import NavBar from "./layout/nav/Nav"
import ListaProyectos from './layout/proyectos/ListaProyectos';

// cosas de login
import React, {useState, useEffect} from "react"
import style from "./layout/login/Login.module.css"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import {TextField} from "@material-ui/core"


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function App() {
  const classes = useStyles();

  const [token, setToken] = useState("")
  
  return (
    <Router>
      {
        (token.length == 0) ? 
          <div className={style.ContainerLogin}> {/* login */}
        
          <Card className={classes.root, style.cardContainer}>
          <h1>Bienvenido</h1>
            <CardContent>
              <Formik 
                initialValues={{
                  username: '',
                  password: '',
                }}
    
                validate={values=>{
                  const errors ={};
                  if (!values.username || !values.password){
                    errors.username = "Requerido";
                    errors.password = "Requerido"
                  }
                  return errors
                  }}
    
                onSubmit={(values, setSubmitting) => {
                  axios.post("http://localhost:27195/api/login/authenticate", {
                    username: values.username,
                    password: values.password
                  }).then(res => {
                    console.log(res)
                    setToken(res.data)
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
                  <Form onSubmit={handleSubmit}>
                    <br/>
                    <TextField onChange={handleChange} value={values.username} onBlur={handleBlur} id="username standard-basic" name="username" label="Username" />
                    {errors.username && touched.username}
                    <br/>
                    <br/>
                    <TextField onChange={handleChange} type="password" value={values.password} onBlur={handleBlur} id="password" name="password" label="Password" />
                    {errors.password && touched.password}
                    <br/>
                    <br/>
                    <Button type="submit" size="small" color="primary" disabled={isSubmitting}>
                      Ingresar
                    </Button>
                  </Form>
                )
              }  
              </Formik>
            </CardContent>
          </Card>
        </div> 
        :
          <NavBar token={token} />      
      }
    </Router>  
  );
}

export default App;
// http://localhost:27195
// /api/login/authenticate (login -> devuelve token)

// Axios para las conexiones
// https://github.com/axios/axios

// Renderizado condicional
// https://es.reactjs.org/docs/conditional-rendering.html

// hooks 
// https://reactjs.org/docs/hooks-state.html - Reemplaza la forma de armar los estados
// https://reactjs.org/docs/hooks-effect.html - Reemplaza el ComponentDidMount/WillMount etc

// Formularios con Formik
// https://formik.org/docs/overview

// generar archivos PDF (temporal) - Buscar biblioteca
//https://dev.to/finallynero/generating-pdf-documents-in-react-using-react-pdf-4ka7 