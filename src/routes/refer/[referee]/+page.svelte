<script>
    import { browser } from '$app/environment';
    import { redirect } from '@sveltejs/kit';
    import { isAddress } from 'viem';
    import { onMount } from 'svelte';
    import { DAPP_URL } from '$lib/config';

    export let data;
    let referral = '';

    if (browser) {
        if (isAddress(data.referer)) {
            localStorage.setItem('referral', data.referer);
        }
    }

    onMount(() => {
        window.location.replace(DAPP_URL);
    })
</script>