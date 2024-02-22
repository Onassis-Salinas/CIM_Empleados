<script>
    export let show;
</script>

<dialog class="modal" open={show}>
    <div class="modal-box max-w-2xl">
        <slot />
    </div>
    <form method="dialog" class="modal-backdrop" on:submit={() => (show = false)}>
        <button />
    </form>
</dialog>

<style>
    .modal-box {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        min-height: 400px;
    }

    .modal-backdrop {
        background-color: rgba(20, 20, 20, 0.8);
    }
</style>
