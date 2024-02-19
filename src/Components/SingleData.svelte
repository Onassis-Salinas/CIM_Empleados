<script>
    export let text;
    export let amount;
    export let mainClass = "";
</script>

<div class="stat ">
    <p class="stat-title">{text}:</p>
    <b class="stat-value {mainClass}">{amount}</b>
</div>
