import { Url } from "url";

export interface Coins {
    coinName: {
        name: string,
        symbol: string,
        image: string,
        imageSmall: string,
        status: string,
        minerFee: number
    }

}
