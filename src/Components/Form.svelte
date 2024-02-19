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
        max-width: 700px !important;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
    }

    .modal-backdrop {
        background-color: rgba(20, 20, 20, 0.8);
    }
</style>
