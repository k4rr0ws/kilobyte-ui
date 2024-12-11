<script>
    // ========= CORE =========== //
    import { onMount } from 'svelte';
    import { connected, signerAddress } from 'svelte-wagmi';

    // ============ COMPONENTS =========== //
    import FarmBox from '$lib/components/FarmBox.svelte';

    // ========= CONFIG ============= //
    import { farms } from '$lib/config';
    import * as format from '$helpers/format';
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each farms as farm}
        {#if farm.isActive == false}
        <FarmBox info={farm} />
        {/if}
    {/each}
</div>