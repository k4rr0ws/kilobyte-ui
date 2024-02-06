import { readContract, prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import ERC20ABI from '$lib/abi/ERC20.json';
import { maxInt256 } from '$lib/utils';

export const balanceOf = async(contract, account) => {
    const data = await readContract({
        address: contract,
        abi: ERC20ABI,
        functionName: 'balanceOf',
        args: [account]
    })
    return data;
}

export const totalSupply = async(contract) => {
    const data = await readContract({
        address: contract,
        abi: ERC20ABI,
        functionName: 'totalSupply',
    })
    return data;
}

export const allowance = async(contract, address, spender) => {
    const data = await readContract({
        address: contract,
        abi: ERC20ABI,
        functionName: 'allowance',
        args: [address, spender]
    })
    return data;
}

export const approve = async(contract, spender, amount=maxInt256) => {
    const config = await prepareWriteContract({
        address: contract,
        abi: ERC20ABI,
        functionName: 'approve',
        args: [spender, amount],
    })
    return(await writeContract(config));
}