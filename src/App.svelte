<script>
    import Productivity from "./Routes/Productivity.svelte";
    import Employees from "./Routes/Employees.svelte";
    import Assistance from "./Routes/Assistance.svelte";
    import Home from "./Routes/Home.svelte";
    import Login from "./Routes/Login.svelte";
    import DataEntry from "./Routes/DataEntry.svelte";
    import Inventory from "./Routes/Inventory.svelte";
    import Movements from "./Routes/Movements.svelte";

    import Header from "./Sections/Header.svelte";

    import axios from "axios";
    import { Router, Route, navigate } from "svelte-routing";
    import Users from "./Routes/Users.svelte";
    import Vacations from "./Routes/Vacations.svelte";
    import Alerts from "./Components/Alerts.svelte";
    import { showError } from "./lib/utilities";

    axios.defaults.withCredentials = true;
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) return navigate("/login");
            if (error.response && error.response.status === 402) return showError({ text: "No cuentas con los permisos para realizar esa accion" });
            return Promise.reject(error);
        }
    );
</script>

<Header />
<main>
    <Router>
        <Route path="/"><Home /></Route>

        <Route path="/login" let:location><Login /></Route>
        <Route path="/users"><Users /></Route>

        <Route path="/employees"><Employees /></Route>
        <Route path="/assistance"><Assistance /></Route>
        <Route path="/productivity"><Productivity /></Route>
        <Route path="/vacations"><Vacations /></Route>

        <Route path="/" component={Inventory} />
        <Route path="/DataEntry" component={DataEntry} />
        <Route path="/Inventory" component={Inventory} />
        <Route path="/Movements" component={Movements} />
    </Router>

    <Alerts />
</main>
