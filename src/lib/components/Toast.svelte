<script>
    export let type;
    export let message;
</script>
  
{#if type === 'info'}
    <div class="bg-blue-500 text-white text-xs border-black border-2">
        <div class="w-full border-2 border-r-blue-800 border-b-blue-800 p-4">
        <span>{@html message}</span>
        </div>
    </div>
{:else if type === 'success'}
    <div class="bg-green-500 text-white text-xs border-black border-2">
        <div class="w-full border-2 border-r-green-800 border-b-green-800 p-4">
          <span>{@html message}</span>
        </div>
    </div>
{:else if type === 'error'}
    <div class="bg-red-500 text-white text-xs border-black border-2">
        <div class="w-full border-2 border-r-red-800 border-b-red-800 p-4">
        <span>{@html message}</span>
        </div>
    </div>
{/if}


