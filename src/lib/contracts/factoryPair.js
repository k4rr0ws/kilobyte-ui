import { readContract, prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import FactoryPairABI from '$lib/abi/FactoryPair.json';
import { maxInt256 } from '$lib/utils';

export const balanceOf = async(contract, account) => {
    const data = await readContract({
        address: contract,
        abi: FactoryPairABI,
        functionName: 'balanceOf',
        args: [account]
    })
    return data;
}

export const totalSupply = async(contract) => {
    const data = await readContract({
        address: contract,
        abi: FactoryPairABI,
        functionName: 'totalSupply',
    })
    return data;
}

export const getReserves = async(contract) => {
    const data = await readContract({
        address: contract,
        abi: FactoryPairABI,
        functionName: 'getReserves',
    })
    return data;
}

export const token0 = async(contract) => {
    const data = await readContract({
        address: contract,
        abi: FactoryPairABI,
        functionName: 'token0',
    })
    return data;
}

export const token1 = async(contract) => {
    const data = await readContract({
        address: contract,
        abi: FactoryPairABI,
        functionName: 'token1',
    })
    return data;
}

export const approve = async(contract, spender, amount=maxInt256) => {
    const config = await prepareWriteContract({
        address: contract,
        abi: FactoryPairABI,
        functionName: 'approve',
        args: [spender, amount],
    })
    const { hash } = await writeContract(config);
    return (waitForTransaction({ hash }));
}