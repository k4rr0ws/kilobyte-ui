import { writable } from 'svelte/store';
import * as priceHelper from '$helpers/prices';

export const WAVAX_USD = writable(0);
export const FARM_TOKEN = writable(0);

export const updatePrices = async() => {
    
}