import { readContract, prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import ZAPPER from '$lib/abi/Zapper.json';
import { ZAPPER_ADDRESS } from '$lib/config';

export const lpCompound = async(pid, referral) => {
    const config = await prepareWriteContract({
        address: ZAPPER_ADDRESS,
        abi: ZAPPER,
        functionName: 'lpCompound',
        args: [pid, referral],
    })
    return(await writeContract(config));
}

export const zapper = async(amount, pid, referral) => {
    const config = await prepareWriteContract({
        address: ZAPPER_ADDRESS,
        abi: ZAPPER,
        functionName: 'zapper',
        value: amount,
        args: [pid, referral],
    })
    return(await writeContract(config));
}

export const stakingZapper = async(amount, pid, referral) => {
    const config = await prepareWriteContract({
        address: ZAPPER_ADDRESS,
        abi: ZAPPER,
        functionName: 'stakingZapper',
        value: amount,
        args: [pid, referral],
    })
    return(await writeContract(config));
}