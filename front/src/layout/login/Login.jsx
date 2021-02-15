import React, {useState} from 'react'
import style from "./Login.module.css"
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

function Login(props) {
  const classes = useStyles();

  const [testFlag, setTestFlag] = useState(false)
  const [falseCreds, setFalseCreds] = useState({
    username: "admin",
    password: "1234"
  })

  // const falseCreds = {
  //                       username: "admin",
  //                       password: "1234"
  //                     };

  // let testFlag = false;  

  return (
    <div className={style.ContainerLogin}>
      
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
              // enganchar a endpoint
              // http://localhost:27195/api/login/authenticate
              /*
              axios.post("http://localhost:27195/api/login/authenticate",{username: values.username, password:values.password}).then(res => {
                console.log(res) //
              }).catch((error)=> {
                console.error("error en get login: ",error)
              })
              */
              if (values.password == falseCreds.password && values.username == falseCreds.username) {
                setFalseCreds(true).then(()=>{
                  props.login(testFlag)})
              }
              service.setToken(token);
              // redireccionar
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
  )
}

export default Login
