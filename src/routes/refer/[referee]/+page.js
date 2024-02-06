import { isAddress } from 'viem';

export function load({ params }) {

    if (isAddress(params.referer)) {
        return {
            referer: params.referer
        }
    }
	
}