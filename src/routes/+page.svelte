<script>
    // ========= CORE =========== //
    import { onMount } from 'svelte';
    import { connected, signerAddress } from 'svelte-wagmi';

    // ============ COMPONENTS =========== //
    import FarmBox from '$lib/components/FarmBox.svelte';
    import SortFarms from '$lib/components/SortFarms.svelte';

    // ========= CONFIG ============= //
    import { farms } from '$lib/config';
    import * as format from '$helpers/format';
    import * as priceHelper from '$helpers/prices';
    import { FARM_TOKEN_ADDRESS, DEAD_ADDRESS } from '$lib/config';

    // ========= CONTRACTS =========== //
    import * as erc20 from '$contracts/erc20';
    import * as masterChef from '$contracts/masterChef';

    // =========== UTILS ============== //
    import { parseEther, formatEther } from 'viem';
    import * as toast from '$stores/toasts';

    // ========= VARIABLES ========== //
    let totalTVL = 0;
    let farmTokenWPLS;
    let totalSupply;
    let farmTokenUSD;
    let WPLS_USD;
    let marketCap;
    let marketCapUSD;
    let pendingTotal;
    let burnedTotal;

    // ========= EVENTS ============ //
    const addToTVL = (event) => {
        totalTVL += event.detail.amount;
    }

    const claimAll = async() => {
        try {
            const { hash } = await masterChef.claimAll();
            await waitForTransaction({hash});
            toast.success('Rewards Claimed!');
            refreshData();
        } catch (error) {
            toast.error('Error Claiming');
        }
    }

    const refreshData = async() => {
        try {
            farmTokenWPLS = await priceHelper.farmTokenPrice();
            WPLS_USD = await priceHelper.toUsd(parseEther('1'));
            totalSupply = await erc20.totalSupply(FARM_TOKEN_ADDRESS);
            marketCap = formatEther(totalSupply) * formatEther(farmTokenWPLS);
            marketCapUSD = marketCap * WPLS_USD;
            farmTokenUSD = formatEther(farmTokenWPLS) * WPLS_USD;
            burnedTotal = await erc20.balanceOf(FARM_TOKEN_ADDRESS, DEAD_ADDRESS);
        } catch (error) {
            console.log('Error fetching price data');
        }

        if ($connected) {
            let poolLength = await masterChef.poolLength();
            let totalRewards = BigInt(0);
            for(let i=0;i<poolLength;i++) {
                let rewards = await masterChef.pendingRewards(i, $signerAddress);
                totalRewards += rewards;
            }
            pendingTotal = totalRewards;
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

<div class="text-white my-8 text-center grid grid-cols-1 md:grid-cols-4 gap-2">
    <div class="col-span-2 border-black border-4">
        <div class="border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white bg-blue-900 w-full mx-auto p-4">$KB 
            <div>
                {#if farmTokenUSD}
                    {format.price(farmTokenUSD)}
                {:else}
                    <div class="animate-spin">%</div>
                {/if}
                </div>
            </div>
    </div>
    <div class="col-span-2 border-black border-4">
        <div class="border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white bg-blue-900 w-full mx-auto p-4">TVL 
            <div>
                {#if totalTVL}
                    {format.usd(totalTVL)}
                {:else}
                    <div class="animate-spin">%</div>
                {/if}
            </div>
        </div>
    </div>

    <div class="col-span-2 border-black border-4">
        <div class="border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white bg-blue-900 w-full mx-auto p-4">Total Supply 
            <div>
                {#if totalSupply}
                    {format.wei(totalSupply)}
                {:else}
                    <div class="animate-spin">%</div>
                {/if}
            </div>
        </div>
    </div>

    <div class="col-span-2 border-black border-4">
        <div class="border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white bg-blue-900 w-full mx-auto p-4">Marketcap 
            <div>
                {#if marketCapUSD}
                {format.usd(marketCapUSD)}
                {:else}
                    <div class="animate-spin">%</div>
                {/if}
            </div>
        </div>
    </div>
    <div class="col-span-4 border-black border-4">
        <div class="border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white bg-blue-900 w-full mx-auto p-4">Burned
            <div>
                {#if burnedTotal}
                {format.wei(burnedTotal)}
                {:else}
                    <div class="animate-spin">%</div>
                {/if}
            </div>
        </div>
    </div>

</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each farms as farm}
        {#if !farm.decomissioned}
            <FarmBox info={farm} on:addToTVL={addToTVL} />
        {/if}
    {/each}
</div>

<div class="text-center mt-8 flex flex-cols space-x-1">
    <div class="border-2 border-black bg-yellow-500 w-full md:w-64">
        <a href="/inactive" class="block border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white p-4 text-xs hover:underline hover:bg-yellow-600 text-white">Inactive Pools ></a>
    </div>
    {#if pendingTotal}
    <div class="border-2 border-black bg-yellow-500">
        <button 
            on:click={claimAll}
            class="border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white p-4 text-xs hover:underline hover:bg-yellow-600 text-white w-full"
        >
            Claim All ({format.wei(pendingTotal)} $KB)
        </button>
    </div>
    {/if}
</div>