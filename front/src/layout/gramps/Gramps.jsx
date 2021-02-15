import React from 'react'
import { BrowserRouter as Router, Route ,Switch , Redirect } from "react-router-dom";
import ListaClientes from "../clientes/ListaClientes";
import NuevoCliente from "../clientes/NuevoCliente";
import ListaEmpleados from "../empleados/ListaEmpleados";
import NuevoEmpleado from "../empleados/NuevoEmpleado";
import Informes from "../informes/Informes";
import NuevoPerfil from "../perfiles/NuevoPerfil";
import ListaProyectos from "../proyectos/ListaProyectos";
import NuevoProyecto from "../proyectos/NuevoProyecto";
import ListaTareas from "../tareas/ListaTareas";
import NuevaTarea from "../tareas/NuevaTarea";
import NavBar from "../nav/Nav"

function Gramps() {
    return (
        <Switch>
            <Route exact path="/lista-proyectos">
                <ListaProyectos/>
            </Route>
            <Route exact path="/nuevo-proyecto">
                <NuevoProyecto/>
            </Route>
            <Route exact path="/lista-tareas">
                <ListaTareas/>
            </Route>
            <Route exact path="/nueva-tarea">
                <NuevaTarea/>
            </Route>
            <Route exact path="/lista-clientes">
                <ListaClientes/>
            </Route>
            <Route exact path="/nuevo-cliente">
                <NuevoCliente/>
            </Route>
            <Route exact path="/lista-empleados">
                <ListaEmpleados/>
            </Route>
            <Route exact path="/nuevo-empleado">
                <NuevoEmpleado/>
            </Route>
            <Route exact path="/informes">
                <Informes/>
            </Route>
            <Route exact path="/nuevo-perfil">
                <NuevoPerfil/>
            </Route>
            <Redirect from="*" to="/lista-proyectos"/>
        </Switch>
    )
}

export default Gramps
