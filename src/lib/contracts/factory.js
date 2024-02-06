import { readContract } from '@wagmi/core';
import FactoryABI from '$lib/abi/Factory.json';
import * as FactoryPair from '$lib/contracts/factoryPair';

const getPair = async(factory, token0, token1) => {
    const data = await readContract({
        address: factory,
        abi: FactoryABI,
        functionName: 'getPair',
        args: [token0, token1]
    })
    return data;
}   

export const getReservesFromTokens = async (factory, tokenA, tokenB) => {
    const [token0,] = sortTokens(tokenA, tokenB)
    const pairToken = await getPair(factory, tokenA, tokenB);
    const [reserve0, reserve1] = await FactoryPair.getReserves(pairToken);
    
    let reserveA, reserveB;

    if (tokenA === token0) {
        reserveA = reserve0;
        reserveB = reserve1;
    } else {
        reserveA = reserve1;
        reserveB = reserve0;
    }

    return [reserveA, reserveB];
}

function sortTokens(tokenA, tokenB) {
    if (tokenA === tokenB) {
      throw new Error("IDENTICAL_ADDRESSES");
    }
  
    let token0, token1;
  
    if (tokenA < tokenB) {
      token0 = tokenA;
      token1 = tokenB;
    } else {
      token0 = tokenB;
      token1 = tokenA;
    }
  
    if (token0 === '0x0000000000000000000000000000000000000000') {
      throw new Error("ZERO_ADDRESS");
    }
  
    return [token0, token1];
  }
