<script>
    import { connected, signerAddress } from 'svelte-wagmi';
    import { DAPP_URL } from '$lib/config';

    let inputBox;
    let copyButton;

    const copyInput = () => {
        inputBox.select();
        inputBox.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(inputBox.value);
        copyButton.innerHTML = 'Saved To Clipboard!';

        setTimeout(function() {
            copyButton.innerHTML = 'Copy Referral Code';
        }, 1000)
    }
</script>

<div class="mx-auto text-center max-w-2xl">
    {#if $connected}
        <div class="border-2 border-[#28282a]">
            <input 
                bind:this={inputBox}
                value="{DAPP_URL}/refer/{$signerAddress}"
                type="text" 
                class="lighter w-full p-2 border-b-2 w-full border-r-2 border-[#cb6d26] bg-white placeholder-white focus:outline-none text-white text-xs" 
            />
        </div>
        <div class="border-2 border-black w-full bg-orange-700 mt-1">
            <button
                bind:this={copyButton}
                on:click={copyInput}
                class="border-t-orange-500 border-t-2 border-l-2 border-l-orange-500 border-b-2 w-full border-r-2 border-orange-900 p-4 text-xs hover:bg-orange-800 text-white"
            >
                Copy Referral Code
            </button>
        </div>
    {:else}
        <h1 class="text-white">Connect to view your referral link</h1>
    {/if}
</div>