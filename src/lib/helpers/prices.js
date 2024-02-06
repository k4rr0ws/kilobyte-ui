import * as Router from '$contracts/router';
import * as Factory from '$contracts/factory';
import * as FactoryPair from '$contracts/factoryPair';
import * as erc20 from '$contracts/erc20';

import { parseEther, formatEther, formatUnits } from 'viem';

import { Oracles } from '$lib/config';
import { FARM_TOKEN_ADDRESS, NATIVE_TOKEN_ADDRESS, STABLECOIN_ADDRESS, PULSEX_V1_FACTORY_ADDRESS, PULSEX_V1_ROUTER_ADDRESS } from '$lib/config';
import { VAPORDEX_FACTORY_ADDRESS, VAPORDEX_ROUTER_ADDRESS } from '$lib/config'; //VAPORDEX
import { DEXTOP_FACTORY_ADDRESS, DEXTOP_ROUTER_ADDRESS } from '$lib/config';


export const tokenPrice = async(token, oracle) => {
    //fetch price using the PulseX V1 factory and router
    if (oracle == Oracles.PULSEX_V1) {
        try {
            let reserves = await Factory.getReservesFromTokens(PULSEX_V1_FACTORY_ADDRESS, token, NATIVE_TOKEN_ADDRESS);
            let quote = await Router.quote(PULSEX_V1_ROUTER_ADDRESS, parseEther('1'), reserves[0], reserves[1]);
            return quote;
        } catch (error) {
            console.log('Error fetching price using oracle PULSEX_V1');
        }
    } else if (oracle == Oracles.VAPORDEX) {
        try {
            let reserves = await Factory.getReservesFromTokens(VAPORDEX_FACTORY_ADDRESS, token, NATIVE_TOKEN_ADDRESS);
            let quote = await Router.quote(VAPORDEX_ROUTER_ADDRESS, parseEther('1'), reserves[0], reserves[1]);
            return quote;
        } catch (error) {
            console.log('Error fetching price using oracle TJ_V1');
        }
    } else if (oracle == Oracles.DEXTOP) {
        try {
            let reserves = await Factory.getReservesFromTokens(DEXTOP_FACTORY_ADDRESS, token, NATIVE_TOKEN_ADDRESS);
            let quote = await Router.quote(DEXTOP_ROUTER_ADDRESS, parseEther('1'), reserves[0], reserves[1]);
            return quote;
        } catch (error) {
            console.log('Error fetching price using oracle DEXTOP');
        }
    }
}

export const toUsd = async(amount) => {
    try {
        let reserves = await Factory.getReservesFromTokens(PULSEX_V1_FACTORY_ADDRESS, NATIVE_TOKEN_ADDRESS, STABLECOIN_ADDRESS);
        let quote = await Router.quote(PULSEX_V1_ROUTER_ADDRESS, amount, reserves[0], reserves[1]);
        return formatEther(quote);
    } catch (e) {
        console.log('Error fetching USD value');
    }
}

export const farmTokenPrice = async() => {
    try {
        let reserves = await Factory.getReservesFromTokens(DEXTOP_FACTORY_ADDRESS, FARM_TOKEN_ADDRESS, NATIVE_TOKEN_ADDRESS);
        let quote = await Router.quote(DEXTOP_ROUTER_ADDRESS, parseEther('1'), reserves[0], reserves[1]);
        return quote;
    } catch (e) {
        console.log('Error fetching token price');
    }
}

export const calculatePairValue = async(pairToken, amount, oracle) => {
    //fetch lp's value using PULSEX V1 factory and router
    if (amount > 0) {
        if (oracle == Oracles.PULSEX_V1) {
            try {
                let totalValueLocked;

                let reserves = await FactoryPair.getReserves(pairToken);
                let totalSupplyLP = await erc20.totalSupply(pairToken);
                let token0 = await FactoryPair.token0(pairToken);
                let token1 = await FactoryPair.token1(pairToken);

                let amountToken0 = reserves[0] * amount / totalSupplyLP;
                let amountToken1 = reserves[1] * amount / totalSupplyLP;

                if (token0 == NATIVE_TOKEN_ADDRESS) {
                    let tokenOneToNative = await Router.quote(PULSEX_V1_ROUTER_ADDRESS, amountToken1, reserves[1], reserves[0]);
                    totalValueLocked = amountToken0 + tokenOneToNative;
                } else if (token1 == NATIVE_TOKEN_ADDRESS) {
                    let tokenZeroToNative = await Router.quote(PULSEX_V1_ROUTER_ADDRESS, amountToken0, reserves[0], reserves[1]);
                    totalValueLocked = amountToken1 + tokenZeroToNative;
                } else {
                    let [reservesNative0, reserves0] = await Factory.getReservesFromTokens(PULSEX_V1_FACTORY_ADDRESS, NATIVE_TOKEN_ADDRESS, token0);
                    let [reservesNative1, reserves1] = await Factory.getReservesFromTokens(PULSEX_V1_FACTORY_ADDRESS, NATIVE_TOKEN_ADDRESS, token1);
                    let tokenZeroToNative = await Router.quote(PULSEX_V1_ROUTER_ADDRESS, amountToken0, reserves0, reservesNative0);
                    let tokenOneToNative = await Router.quote(PULSEX_V1_ROUTER_ADDRESS, amountToken1, reserves1, reservesNative1);

                    totalValueLocked = tokenZeroToNative + tokenOneToNative;
                }

                return totalValueLocked;
            } catch (error) {
                console.log(error);
            }
        } else if (oracle == Oracles.DEXTOP) {
            try {
                let totalValueLocked;

                let reserves = await FactoryPair.getReserves(pairToken);
                let totalSupplyLP = await erc20.totalSupply(pairToken);
                let token0 = await FactoryPair.token0(pairToken);
                let token1 = await FactoryPair.token1(pairToken);

                let amountToken0 = reserves[0] * amount / totalSupplyLP;
                let amountToken1 = reserves[1] * amount / totalSupplyLP;

                if (token0 == NATIVE_TOKEN_ADDRESS) {
                    let tokenOneToNative = await Router.quote(DEXTOP_ROUTER_ADDRESS, amountToken1, reserves[1], reserves[0]);
                    totalValueLocked = amountToken0 + tokenOneToNative;
                } else if (token1 == NATIVE_TOKEN_ADDRESS) {
                    let tokenZeroToNative = await Router.quote(DEXTOP_ROUTER_ADDRESS, amountToken0, reserves[0], reserves[1]);
                    totalValueLocked = amountToken1 + tokenZeroToNative;
                } else {
                    let [reservesNative0, reserves0] = await Factory.getReservesFromTokens(DEXTOP_FACTORY_ADDRESS, NATIVE_TOKEN_ADDRESS, token0);
                    let [reservesNative1, reserves1] = await Factory.getReservesFromTokens(DEXTOP_FACTORY_ADDRESS, NATIVE_TOKEN_ADDRESS, token1);
                    let tokenZeroToNative = await Router.quote(DEXTOP_ROUTER_ADDRESS, amountToken0, reserves0, reservesNative0);
                    let tokenOneToNative = await Router.quote(DEXTOP_ROUTER_ADDRESS, amountToken1, reserves1, reservesNative1);

                    totalValueLocked = tokenZeroToNative + tokenOneToNative;
                }

                return totalValueLocked;
            } catch (error) {
                console.log(error);
            }
        }
    }
}