<script>
    import { Router, Route } from "svelte-routing";
    import Productivity from "./Routes/Productivity.svelte";
    import Data from "./Routes/Data.svelte";
    import Assistance from "./Routes/Assistance.svelte";
    import Header from "./Sections/Header.svelte";
    import Home from "./Routes/Home.svelte";
    import SideBar from "./Sections/SideBar.svelte";
</script>

<SideBar />

<Header />
<main>
    <Router>
        <Route path="/"><Home /></Route>
        <Route path="/data"><Data /></Route>
        <Route path="/assistance"><Assistance /></Route>
        <Route path="/productivity"><Productivity /></Route>
    </Router>
</main>
