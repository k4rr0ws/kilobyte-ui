<script>

</script>

<div class="border-2 border-black w-full bg-orange-800 mb-4">
<div class="barn p-4 grid grid-cols-12 text-white text-xs space-y-4 md:space-y-0 md:space-x-4">
    <div class="col-span-12 md:col-span-4">
        <fieldset class="lighter border-2 border-solid border-[#28282a] p-1 h-full">
            <legend class="text-xs">Search</legend>
            <input type="text" class="lighter w-full p-2 bg-white placeholder-white focus:outline-none text-white" placeholder="Search.." />
        </fieldset>
    </div>
    <div class="col-span-12 md:col-span-4">
        <fieldset class="lighter border-2 border-solid border-[#28282a] p-1 h-full">
            <legend class="text-xs">Order By</legend>
            <select class="lighter p-2 w-full">
                <option value="default" selected>Default</option>
                <option value="tvl">TVL</option>
                <option value="apy">APR</option>
            </select>
        </fieldset>
    </div>
    <div class="col-span-12 md:col-span-4">
        <fieldset class="lighter border-2 border-solid border-[#28282a] p-1">
            <legend class="text-xs">Show</legend>
            <select class="lighter p-2 w-full">
                <option value="default" selected>Default</option>
                <option value="all">All</option>
                <option value="staked">Staked</option>
                <option value="decomissioned">Decomissioned</option>
            </select>
        </fieldset>
    </div>
</div>
</div>