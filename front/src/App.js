import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route ,Switch , Link, Redirect } from "react-router-dom";
import Login from "./layout/login/Login"
import ListaClientes from "./layout/clientes/ListaClientes"
import NuevoCliente from "./layout/clientes/NuevoCliente"
import ListaEmpleados from "./layout/empleados/ListaEmpleados"
import NuevoEmpleado from "./layout/empleados/NuevoEmpleado"
import Informes from "./layout/informes/Informes"
import Perfiles from "./layout/perfiles/Perfiles"
import ListaProyectos from "./layout/proyectos/ListaProyectos"
import NuevoProyecto from "./layout/proyectos/NuevoProyecto"
import ListaTareas from "./layout/tareas/ListaTareas"
import NuevaTarea from "./layout/tareas/NuevaTarea"

function App() {
  return (
    <Router>
      <nav>
          <ul>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/lista-tareas">Tareas</Link>
            </li>
            <li>
              <Link to="/nueva-tarea">Crear Tarea</Link>
            </li>
            <li>
              <Link to="/informes">Informes</Link>
            </li>
            <li>
              <Link to="/lista-proyectos">Proyectos</Link>
            </li>
            <li>
              <Link to="/nuevo-proyecto">Nuevo Proyecto</Link>
            </li>
            <li>
              <Link to="/lista-clientes">Clientes</Link>
            </li>
            <li>
              <Link to="/nuevo-cliente">Nuevo Cliente</Link>
            </li>
          </ul>
        </nav>
    <Switch>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/lista-tareas">
          <ListaTareas/>
        </Route>
        <Route exact path="/nueva-tarea">
          <NuevaTarea/>
        </Route>
        <Route exact path="/informes">
          <Informes/>
        </Route>
        <Route exact path="/lista-proyectos">
          <ListaProyectos/>
        </Route>
        <Route exact path="/nuevo-proyecto">
          <NuevoProyecto/>
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
        <Redirect from="*" to="/lista-proyectos"/>

        {/* HABLAR CON OMAR SOBRE SI PERFILES TIENE MENÚ (MEPA Q NO) */}
      </Switch>
    </Router>
  );
}

export default App;
// http://localhost:27195