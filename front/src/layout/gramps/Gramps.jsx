import React from 'react'
import { BrowserRouter as Router, Route ,Switch , Redirect } from "react-router-dom";
import ListaClientes from "../clientes/ListaClientes";
import NuevoCliente from "../clientes/NuevoCliente";
import ListaEmpleados from "../empleados/ListaEmpleados";
import NuevoEmpleado from "../empleados/NuevoEmpleado";
import Informes from "../informes/Informes";
import NuevoPerfil from "../perfiles/NuevoPerfil";
import ListaPerfiles from "../perfiles/ListaPerfiles";
import ListaProyectos from "../proyectos/ListaProyectos";
import NuevoProyecto from "../proyectos/NuevoProyecto";
import ListaTareas from "../tareas/ListaTareas";
import NuevaTarea from "../tareas/NuevaTarea";
import CargarHorasTarea from '../cargaHoras/CargarHorasTarea';
import Liquidacion from "../liquidacion/Liquidacion"

function Gramps(props) {
    return (
        <Switch>
            <Route exact path="/lista-proyectos">
                <ListaProyectos usuario={props.usuario}/>
            </Route>
            <Route exact path="/nuevo-proyecto">
                <NuevoProyecto usuario={props.usuario}/>
            </Route>
            <Route exact path="/lista-tareas">
                <ListaTareas usuario={props.usuario}/>
            </Route>
            <Route exact path="/nueva-tarea">
                <NuevaTarea  usuario={props.usuario}/>
            </Route>
            <Route exact path="/lista-clientes">
                <ListaClientes usuario={props.usuario}/>
            </Route>
            <Route exact path="/nuevo-cliente">
                <NuevoCliente usuario={props.usuario}/>
            </Route>
            <Route exact path="/lista-empleados">
                <ListaEmpleados usuario={props.usuario} /> 
            </Route>
            <Route exact path="/nuevo-empleado">
                <NuevoEmpleado usuario={props.usuario} />
            </Route>
            <Route exact path="/informes">
                <Informes usuario={props.usuario} />
            </Route>
            <Route exact path="/nuevo-perfil">
                <NuevoPerfil usuario={props.usuario} />
            </Route>
            <Route exact path="/lista-perfiles">
                <ListaPerfiles usuario={props.usuario} />
            </Route>
            <Route exact path="/carga-horas-tarea">
                <CargarHorasTarea usuario={props.usuario} />
            </Route>
            <Route exact path="/pedir-liquidacion">
                <Liquidacion usuario={props.usuario} />
            </Route>
            <Redirect from="*" to="/lista-proyectos"/>
        </Switch>
    )
}

export default Gramps
