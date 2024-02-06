import { readContract, prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import RouterABI from '$lib/abi/Router.json';
import { maxInt256 } from '$lib/utils';

export const quote = async(router, amountA, reserveA, reserveB) => {
    const data = await readContract({
        address: router,
        abi: RouterABI,
        functionName: 'quote',
        args: [amountA, reserveA, reserveB]
    })
    return data;
}