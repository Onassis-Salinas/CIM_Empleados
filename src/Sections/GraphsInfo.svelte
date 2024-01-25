<script>
    import AreaAssistanceGraph from "../Components/AreaAssistanceGraph.svelte";
    import AssistanceGraph from "../Components/AssistanceGraph.svelte";
</script>

<div>
    <AssistanceGraph />
    <AreaAssistanceGraph />
</div>

<style>
    div {
        display: flex;
        gap: 10px;
    }
</style>
