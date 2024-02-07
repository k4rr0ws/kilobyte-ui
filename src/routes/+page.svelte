<script>
    // ========= CORE =========== //
    import { onMount } from 'svelte';

    // ============ COMPONENTS =========== //
    import FarmBox from '$lib/components/FarmBox.svelte';
    import SortFarms from '$lib/components/SortFarms.svelte';

    // ========= CONFIG ============= //
    import { farms } from '$lib/config';
    import * as format from '$helpers/format';
    import * as priceHelper from '$helpers/prices';
    import { FARM_TOKEN_ADDRESS } from '$lib/config';

    // ========= CONTRACTS =========== //
    import * as erc20 from '$contracts/erc20';

    // =========== UTILS ============== //
    import { parseEther, formatEther } from 'viem';

    // ========= VARIABLES ========== //
    let totalTVL = 0;
    let farmTokenWPLS;
    let totalSupply;
    let farmTokenUSD;
    let WPLS_USD;
    let marketCap;
    let marketCapUSD;

    // ========= EVENTS ============ //
    const addToTVL = (event) => {
        totalTVL += event.detail.amount;
    }

    const refreshData = async() => {
        try {
            farmTokenWPLS = await priceHelper.farmTokenPrice();
            WPLS_USD = await priceHelper.toUsd(parseEther('1'));
            totalSupply = await erc20.totalSupply(FARM_TOKEN_ADDRESS);
            marketCap = formatEther(totalSupply) * formatEther(farmTokenWPLS);
            marketCapUSD = marketCap * WPLS_USD;
            farmTokenUSD = formatEther(farmTokenWPLS) * WPLS_USD;
        } catch (error) {
            console.log('Error fetching price data');
        }
    }

    onMount(async() => {
        setTimeout(function() {
            refreshData();
        }, 25);

        setInterval(function () {
            refreshData();
        }, 7000);
    });
</script>

<div class="text-white my-8 text-center grid grid-cols-2 gap-2">
    {#if farmTokenUSD}
        <div class="bg-blue-900 w-full mx-auto p-4">$KB <div>{format.usd(farmTokenUSD)}</div></div>
    {/if}
    {#if totalTVL}
        <div class="bg-blue-900 w-full mx-auto p-4">TVL <div>{format.usd(totalTVL)}</div></div>
    {/if}
    {#if totalSupply}
        <div class="bg-blue-900 w-full mx-auto p-4">Total Supply <div>{format.wei(totalSupply)}</div></div>
    {/if}
    {#if marketCapUSD}
        <div class="bg-blue-900 w-full mx-auto p-4">Marketcap <div>{format.usd(marketCapUSD)}</div></div>
    {/if}
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each farms as farm}
        <FarmBox info={farm} on:addToTVL={addToTVL} />
    {/each}
</div>