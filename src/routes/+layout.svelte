<script>
    // core
    import { onMount } from 'svelte';
    import { defaultConfig } from 'svelte-wagmi';
    import { connection, connected, chainId, signerAddress, disconnectWagmi, WC } from 'svelte-wagmi';
    import { pulsechain } from '@wagmi/core/chains';

    // components
    import Toasts from '$components/Toasts.svelte';
    import * as toast from '$stores/toasts';

    // transitions
    import { fade } from 'svelte/transition';
    import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

    // utilities
    import * as format from '$helpers/format';

    // assets
    import KILOBYTE_LOGO from "$lib/assets/kilobyte-logo.png";
    import TELEGRAM_ICON from '$lib/assets/telegram_icon.png';
    import TWITTER_ICON from '$lib/assets/twitter-x_icon.png';
    import "../app.pcss";

    // config
    import { DAPP_TITLE, networkChainId } from '$lib/config';

    
    // functions
    const walletConnect = async() => {
        await WC('Sign in to the app');
    }

    const injectedConnector = async() => {
        await connection();
    }

    // variables
    let connectModalOpen = false;

    // store events
    connected.subscribe((connect) => {
        if (connect) {
            connectModalOpen = false;
            toast.success('Wallet Connected!');
        }
    })

    // functions
    onMount(async() => {
        const erckit = defaultConfig({
            autoConnect: true,
            appName: 'erc.kit',
            walletConnectProjectId: '80fd36293beb23adfccb7beba44ad5e2',
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
            <a href="https://dex.dextop.pro/swap/?outputCurrency=0xaC55cd59F4d97c50FBeC9b0812352e15BC5d2e59" class="block border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white p-4 text-xs hover:underline hover:bg-yellow-600 text-white">Buy</a>
        </div>
        <div class="border-2 border-black bg-yellow-500 w-full md:w-44">
            <a href="https://k4rr0ws.github.io/kilobyte/" class="block border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white p-4 text-xs hover:underline hover:bg-yellow-600 text-white">Docs</a>
        </div>
        <div class="border-2 border-black bg-yellow-500 w-full md:w-44">
            <a href="https://www.dextools.io/app/en/pulse/pair-explorer/0x4db7c5a1da37f1681459d247ad353c8b4d1f64b7?t=1707266075949" class="block border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white p-4 text-xs hover:underline hover:bg-yellow-600 text-white">Chart</a>
        </div>
        <div class="border-2 border-black bg-yellow-500 w-full md:w-44">
            {#if !$connected}
                <button on:click={()=>connectModalOpen = true} class="block border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white p-4 text-xs hover:underline hover:bg-yellow-600 text-white w-full">Connect</button>
            {:else}
                <button on:click={disconnectWagmi} class="block border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white p-4 text-xs hover:underline hover:bg-yellow-600 text-white w-full">{format.address($signerAddress)}</button>
            {/if}
        </div>
    </div>
    <div class="mt-8">
        {#if $chainId !== networkChainId && $connected}
            <div class="mx-auto p-2 bg-red-500 my-6 text-center max-w-2xl text-white border-4 border-red-900">
                You're not connected to the right network, switch to PulseChain
            </div>
        {/if}
        <slot />
    </div>
</div>
</div>

{#if connectModalOpen}
<div transition:fade={{ delay: 128, duration: 256 }} class="z-40 absolute top-0 left-0 insert-0 min-height-100vh bg-black bg-opacity-50 overflow-y-auto h-screen w-full flex justify-center items-center" id="withdrawModal">
    <div class="relative opacity-inner w-1/4 text-white text-left border-4 border-black bg-green-500">
        <div class="border-t-white border-t-4 border-l-4 border-l-white border-b-4 w-full border-r-4 border-zinc-400 p-6">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-interactive-supports-focus -->
            <div on:click={()=>connectModalOpen=false} class="absolute top-0 right-0 p-2 mr-2 cursor-pointer text-2xl" role="button">x</div>
            <h2 class="text-2xl mt-4 mb-8 text-center uppercase">Choose Connection</h2>
            <div class="text-xs mb-1 flex justify-between">

            </div>
            <div class="space-y-1">
                <div class="border-2 border-black bg-yellow-500">
                    <button
                        on:click={walletConnect}
                        class="border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white p-4 text-xs hover:underline hover:bg-yellow-600 text-white w-full"
                    >
                        WalletConnect
                    </button>
                </div>
                <div class="border-2 border-black bg-yellow-500">
                    <button
                        on:click={injectedConnector}
                        class="border-b-4 border-r-4 border-zinc-500 border-t-white border-t-4 border-l-4 border-l-white p-4 text-xs hover:underline hover:bg-yellow-600 text-white w-full"
                    >
                        Injected Connector
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
{/if}

<footer class="p-4 text-center mb-8">
    <div class="mx-auto">
        <a href="https://t.me/KILOBYTEfarm" target="_blank"><img src={TELEGRAM_ICON} class="w-16 mx-auto inline" alt="Join telegram" /></a>
        <a href="https://twitter.com/KILOBYTEonPulse" target="_blank"><img src={TWITTER_ICON} class="w-16 mx-auto inline" alt="Follow on twitter" /></a>
    </div>
</footer>