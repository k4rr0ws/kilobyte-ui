import { formatUnits, formatEther } from 'viem';

export const wei = (input, decimals=18) => {
    if (typeof input !== 'bigint') {
        return 0;
    }

    let formattedNumber = formatUnits(input, decimals).toString().match(/^-?\d+(?:\.\d{0,8})?/)[0];
    let [integerPart, decimalPart = ''] = formattedNumber.split(".");

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    decimalPart = decimalPart.padEnd(1, '0'); // Ensures consistent decimal places

    return `${integerPart}.${decimalPart}`;
}

export const address = (account) => {
    return account.substr(0, 4) + "~" + account.substr(account.length - 4, 4);
}

export const apr = (input) => {
    try {
        let formattedNumber = input.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
        let [integerPart, decimalPart = ''] = formattedNumber.split(".");

        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        decimalPart = decimalPart.padEnd(1, '0'); // Ensures consistent decimal places

        return `${integerPart}.${decimalPart}%`;
    } catch (error) {
        return 0;
    }
}

export const usd = (value) => {
    return freedomUnits.format(value);
}

export const tvl = (value) => {
    if (typeof value !== 'bigint') {
        return 0;
    } 

    return formatEther(value);
}

const freedomUnits = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});