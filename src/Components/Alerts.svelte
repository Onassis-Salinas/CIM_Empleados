<script>
    import { alerts } from "./../lib/storage.js";

    let alertsList = [];

    alerts.subscribe((value) => {
        alertsList = value;
    });
</script>

<div class="toast">
    {#each alertsList as alert}
        {#if alert.code === 200}
            <div role="alert" class="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{alert.message}</span>
            </div>
        {:else}
            <div role="alert" class="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{alert.message}</span>
            </div>
        {/if}
    {/each}
</div>

<style>
    .toast{
        z-index: 9999;
    }
</style>
