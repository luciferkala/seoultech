export namespace EnvDataTypes {
    export interface PostBody {
        location: string;
        time: Date;
        picture?: string;
        description?: string;
        temp: number;
        humid?: number;
        dust?: number;
        atm?: number;
        author: string;
    }
    export interface Body {
        idx: number;
        location: string;
        time: Date;
        picture?: string;
        description?: string;
        temp: number;
        humid?: number;
        dust?: number;
        atm?: number;
        author: string;
    }
}
