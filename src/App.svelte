<script>
    import Productivity from "./Routes/Productivity.svelte";
    import Data from "./Routes/Data.svelte";
    import Assistance from "./Routes/Assistance.svelte";
    import Home from "./Routes/Home.svelte";
    import Login from "./Routes/Login.svelte";

    import SideBar from "./Sections/SideBar.svelte";
    import Header from "./Sections/Header.svelte";

    import axios from "axios";
    import { Router, Route, navigate } from "svelte-routing";
    import Users from "./Routes/Users.svelte";
    import { showError } from "./Components/utilities";
    import Vacations from "./Routes/Vacations.svelte";

    axios.defaults.withCredentials = true;
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) return navigate("/login");
            if (error.response && error.response.status === 402) return showError("No cuentas con los permisos para realizar esa accion");
            return Promise.reject(error);
        }
    );
</script>

<SideBar />
<Header />

<main>
    <Router>
        <Route path="/"><Home /></Route>
        <Route path="/data"><Data /></Route>
        <Route path="/users"><Users /></Route>
        <Route path="/assistance"><Assistance /></Route>
        <Route path="/productivity"><Productivity /></Route>
        <Route path="/login" let:location><Login /></Route>
        <Route path="/vacations"><Vacations /></Route>
    </Router>
</main>
