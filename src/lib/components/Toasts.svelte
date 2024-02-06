<script>
    import Toast from "./Toast.svelte";
  
    import { dismissToast, toasts } from "$store/toasts";
</script>
  
{#if $toasts}
<div class="absolute top-2 right-2 text-center w-96 z-40 space-y-1">
    {#each $toasts as toast (toast.id)}
      <Toast type={toast.type} message={toast.message} />
    {/each}
</div>
{/if}