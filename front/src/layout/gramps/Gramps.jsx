import React from 'react';
import { BrowserRouter as Router, Route ,Switch , Redirect } from "react-router-dom";
import ListaClientes from "../clientes/ListaClientes";
import NuevoCliente from "../clientes/NuevoCliente";
import ListaEmpleados from "../empleados/ListaEmpleados";
import NuevoEmpleado from "../empleados/NuevoEmpleado";
import SemanalHsOB from "../informes/SemanalHsOB";
import HsTrabProy from "../informes/HsTrabProy";
import HsTrabEmpPer from "../informes/HsTrabEmpPer";
import HsAdeudadas from "../informes/HsAdeudadas";
import NuevoPerfil from "../perfiles/NuevoPerfil";
import ListaPerfiles from "../perfiles/ListaPerfiles";
import ListaProyectos from "../proyectos/ListaProyectos";
import NuevoProyecto from "../proyectos/NuevoProyecto";
import ListaTareas from "../tareas/ListaTareas";
import NuevaTarea from "../tareas/NuevaTarea";
import CargarHorasTarea from '../cargaHoras/CargarHorasTarea';
import Liquidacion from "../liquidacion/Liquidacion";

function Gramps(props) {
    console.log("ESTOY EN GRAMPS")
    console.log("usuarioToken[0]: ",props.usuarioToken[0]) // usuario
    console.log("usuarioToken[1]: ",props.usuarioToken[1]) // token
    return (
        <Switch>
            <Route exact path="/lista-tareas">
                <ListaTareas usuarioToken={props.usuarioToken}/>
            </Route>
            <Route exact path="/lista-proyectos">
                <ListaProyectos usuarioToken={props.usuarioToken}/>
            </Route>
            <Route exact path="/nuevo-proyecto">
                <NuevoProyecto usuarioToken={props.usuarioToken}/>
            </Route>
            <Route exact path="/nueva-tarea">
                <NuevaTarea usuarioToken={props.usuarioToken}/>
            </Route>
            <Route exact path="/lista-clientes">
                <ListaClientes usuarioToken={props.usuarioToken}/>
            </Route>
            <Route exact path="/nuevo-cliente">
                <NuevoCliente usuarioToken={props.usuarioToken}/>
            </Route>
            <Route exact path="/lista-empleados">
                <ListaEmpleados usuarioToken={props.usuarioToken} /> 
            </Route>
            <Route exact path="/nuevo-empleado">
                <NuevoEmpleado usuarioToken={props.usuarioToken} />
            </Route>

            <Route exact path="/semanal-ob">
                <SemanalHsOB usuarioToken={props.usuarioToken} />
            </Route>
            <Route exact path="/hs-trab-proy">
                <HsTrabProy usuarioToken={props.usuarioToken} />
            </Route>
            <Route exact path="/hs-trab-emp-per">
                <HsTrabEmpPer usuarioToken={props.usuarioToken} />
            </Route>
            <Route exact path="/hs-adeudadas">
                <HsAdeudadas usuarioToken={props.usuarioToken} />
            </Route>

            <Route exact path="/nuevo-perfil">
                <NuevoPerfil usuarioToken={props.usuarioToken} />
            </Route>
            <Route exact path="/lista-perfiles">
                <ListaPerfiles usuarioToken={props.usuarioToken} />
            </Route>
            <Route exact path="/carga-horas-tarea">
                <CargarHorasTarea usuarioToken={props.usuarioToken} />
            </Route>
            <Route exact path="/pedir-liquidacion">
                <Liquidacion usuarioToken={props.usuarioToken} />
            </Route>
            <Redirect from="*" to="/lista-tareas"/>
        </Switch>
    )
}

export default Gramps
