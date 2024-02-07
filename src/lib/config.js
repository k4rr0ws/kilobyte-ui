
export const DAPP_URL = "http://localhost:5173";
export const DAPP_TITLE = "KILOBYTE.FARM";

export const networkChainId = 369;

export const MASTERCHEF_ADDRESS = "0x24321b16e1AF2FEC2EA8543091257BcbB5873BC7";
export const NATIVE_TOKEN_ADDRESS = "0xA1077a294dDE1B09bB078844df40758a5D0f9a27"; //WPLS
export const FARM_TOKEN_ADDRESS = "0xaC55cd59F4d97c50FBeC9b0812352e15BC5d2e59"; //KB
export const STABLECOIN_ADDRESS = "0xefD766cCb38EaF1dfd701853BFCe31359239F305"; //DAI
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ZAPPER_ADDRESS = "0xb1392e2928C797B20b784ac90EA4d630D53Fd21d";

//PulseX V1
export let PULSEX_V1_FACTORY_ADDRESS = "0x1715a3E4A142d8b698131108995174F37aEBA10D";
export let PULSEX_V1_ROUTER_ADDRESS = "0x98bf93ebf5c380C0e6Ae8e192A7e2AE08edAcc02";

//PulseX V2
export let PULSEX_V2_FACTORY_ADDRESS = "0x29ea7545def87022badc76323f373ea1e707c523";
export let PULSEX_V2_ROUTER_ADDRESS = "0x165C3410fC91EF562C50559f7d2289fEbed552d9";

//DEXTOP
export let DEXTOP_FACTORY_ADDRESS = "0x556F4C3aAa6c6b76e1BBa0409D99D4a483b29997";
export let DEXTOP_ROUTER_ADDRESS = "0x2221EEa96821E537F100C711dE439F79451c6A01";

//VaporDex
export let VAPORDEX_FACTORY_ADDRESS = "0xC009a670E2B02e21E7e75AE98e254F467f7ae257";
export let VAPORDEX_ROUTER_ADDRESS = "0x19C0FC4562A4b76F27f86c676eF5a7e38D12a20d";

export const Oracles = {
    PULSEX_V1: 0,
    PULSEX_V2: 1,
    DEXTOP: 2
}

export const Types = {
    Pool: 0,
    Farm: 1
}

export const DepositTypes = {
    TOKEN: 0,
    AVAX: 1
}


export let farms = [
    {
        orderById: 1,
        displayName: 'KB/PLS',
        lpAbbreviation: 'LP',
        poolId: 0,
        stakingToken: '0x4db7c5A1DA37f1681459D247aD353C8b4D1F64b7',
        liquidityLink: 'https://dex.dextop.pro/add/',
        depositFee: 0,
        withdrawFee: 0,
        poolWeight: 25,
        isActive: true,
        compound: false,
        zaps: false,
        type: Types.Farm,
        oracle: Oracles.DEXTOP
    },
    {
        orderById: 2,
        displayName: 'KB/DEX',
        lpAbbreviation: 'LP',
        poolId: 1,
        stakingToken: '0x1c69F07efb55281EcA5490b1D7412486048547Fc',
        liquidityLink: 'https://dex.dextop.pro/add/',
        depositFee: 0,
        withdrawFee: 0,
        poolWeight: 10,
        isActive: true,
        compound: false,
        zaps: false,
        type: Types.Farm,
        oracle: Oracles.DEXTOP
    },
    {
        orderById: 2,
        displayName: 'DEX/PLS',
        lpAbbreviation: 'LP',
        poolId: 4,
        stakingToken: '0x635969e2c12aB4938f9B31BF69aCA724DF1F2c42',
        liquidityLink: 'https://dex.dextop.pro/add/',
        depositFee: 0,
        withdrawFee: 0,
        poolWeight: 5,
        isActive: true,
        compound: false,
        zaps: false,
        type: Types.Farm,
        oracle: Oracles.DEXTOP
    },
    {
        orderById: 3,
        displayName: 'DAI/PLS',
        lpAbbreviation: 'LP',
        poolId: 2,
        stakingToken: '0xBDEb3316d6E09BB85ac4290ed193fe1AF59c1328',
        liquidityLink: 'https://dex.dextop.pro/add/',
        depositFee: 1,
        withdrawFee: 1,
        poolWeight: 1,
        isActive: true,
        compound: false,
        zaps: false,
        type: Types.Farm,
        oracle: Oracles.DEXTOP
    },
    {
        orderById: 4,
        displayName: 'PLSX/PLS',
        lpAbbreviation: 'LP',
        poolId: 3,
        stakingToken: '0xEa1457a682eBB5471E75F83f5348743DF918A6c3',
        liquidityLink: 'https://dex.dextop.pro/add/',
        depositFee: 1,
        withdrawFee: 1,
        poolWeight: 1,
        isActive: true,
        compound: false,
        zaps: false,
        type: Types.Farm,
        oracle: Oracles.DEXTOP
    }
]