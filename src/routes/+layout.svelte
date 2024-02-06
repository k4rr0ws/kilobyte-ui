<script>
    // ========= CORE ========== //
    import { onMount } from 'svelte';
    import { defaultConfig } from 'svelte-wagmi';
    import { connection, connected, chainId, signerAddress, disconnectWagmi, WC } from 'svelte-wagmi';
    import { avalanche, avalancheFuji, pulsechain } from '@wagmi/core/chains';

    // ========== COMPONENTS ========== //
    import Toasts from '$components/Toasts.svelte';
    import * as toast from '$stores/toasts';

    // ========== TRANSITIONS ========= //
    import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

    // ============ UTILS ============= //
    import * as format from '$helpers/format';

    // =========== ASSETS =========== //
    import KILOBYTE_LOGO from "$lib/assets/kilobyte-logo.png";
    import "../app.pcss";

    //=========== CONFIG ============= //
    import { DAPP_TITLE, networkChainId } from '$lib/config';

    
    // ========== FUNCTIONS ======== //
    const walletConnect = async() => {
        await WC('Sign in to the app');
    }

    // ========== STORE EVENTS ============= //
    connected.subscribe((connect) => {
        if (connect) {
            toast.success('Wallet Connected!');
        }
    })

    // =========== MOUNT =========== //
    onMount(async() => {
        const erckit = defaultConfig({
            autoConnect: true,
            appName: 'erc.kit',
            walletConnectProjectId: 'd5891ecfc77771a9aafe21b38f45711d',
            chains: [pulsechain]
        });
        
        await erckit.init();
    });
</script>

<svelte:head>
    <title>{DAPP_TITLE}</title>
</svelte:head>

<Toasts />
<div class="border-4 border-black bg-orange-800 max-w-7xl mx-auto mb-6">
<div class="bg-blue-700 border-t-white border-t-4 border-l-4 border-l-white p-8 border-r-4 border-b-4 border-zinc-500">
    <div class="mb-8">
        <img src={KILOBYTE_LOGO} class="mx-auto h-64 mb-8" alt="kilobyte logo" />
    </div>
    <div class="mx-auto text-center w-full md:w-fit space-x-0 md:space-x-2 space-y-1 md:space-y-0 flex flex-col md:flex-row">
        <div class="border-2 border-black bg-yellow-500 w-full md:w-44">
            <a href="/" class="block border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white p-4 text-xs hover:underline hover:bg-yellow-600 text-white">Farms</a>
        </div>
        <div class="border-2 border-black bg-yellow-500 w-full md:w-44">
            <a href="/" class="block border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white p-4 text-xs hover:underline hover:bg-yellow-600 text-white">Buy</a>
        </div>
        <div class="border-2 border-black bg-yellow-500 w-full md:w-44">
            <a href="/" class="block border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white p-4 text-xs hover:underline hover:bg-yellow-600 text-white">Chart</a>
        </div>
        <div class="border-2 border-black bg-yellow-500 w-full md:w-44">
            {#if !$connected}
                <button on:click={walletConnect} class="block border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white p-4 text-xs hover:underline hover:bg-yellow-600 text-white w-full">Connect</button>
            {:else}
                <button on:click={disconnectWagmi} class="block border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white p-4 text-xs hover:underline hover:bg-yellow-600 text-white w-full">{format.address($signerAddress)}</button>
            {/if}
        </div>
    </div>
    <div class="mt-8">
        {#if $chainId !== networkChainId}
            <div class="mx-auto p-2 bg-red-500 my-6 text-center max-w-2xl text-white border-4 border-red-900">
                You're not connected to the right network, switch to PulseChain
            </div>
        {/if}
        <slot />
    </div>
</div>
</div>