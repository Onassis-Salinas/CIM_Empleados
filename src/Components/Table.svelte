<div>
    <table class="table1">
        <slot />
    </table>
</div>

<style>
    div {
        width: max(250px, calc(95vw - var(--sideBarWidth)));
        overflow-x: auto;
    }
</style>
