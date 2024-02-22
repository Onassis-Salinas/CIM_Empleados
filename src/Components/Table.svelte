<div class="table-container overflow-x-auto">
    <table class="table table-xs table-pin-rows table-pin-cols table-zebra table-primary">
        <slot />
    </table>
</div>

<style>
    .table-container {
        max-width: calc(100vw - 40px);
        max-height: calc(100vh - calc(var(--headerheight) + 75px));
        min-height: 120px;
    }
</style>
