<script>
    // ============ COMPONENTS =========== //
    import FarmBox from '$lib/components/FarmBox.svelte';
    import SortFarms from '$lib/components/SortFarms.svelte';

    // ========= CONFIG ============= //
    import { farms } from '$lib/config';
    import * as format from '$helpers/format';

    // ========= VARIABLES ========== //
    let totalTVL = 0;

    // ========= EVENTS ============ //
    const addToTVL = (event) => {
        totalTVL += event.detail.amount;
    }
</script>

<div class="text-white my-8 text-center">
    {#if totalTVL}
        <div class="bg-blue-900 w-fit mx-auto p-4">TVL: <span>{format.usd(totalTVL)}</span></div>
    {/if}
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each farms as farm}
        <FarmBox info={farm} on:addToTVL={addToTVL} />
    {/each}
</div>