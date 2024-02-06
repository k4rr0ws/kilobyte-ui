<script>
    import FarmBox from '$lib/components/FarmBox.svelte';
    import SortFarms from '$lib/components/SortFarms.svelte';
    import { farms } from '$lib/config';
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each farms as farm}
        <FarmBox info={farm} />
    {/each}
</div>