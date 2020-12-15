import { encode, decode } from 'jwt-simple';

export class JWT {
    public static encodeToken (data: object): string {
        return encode(data, "SECRET_KEY");
    }

    public static decodeToken (token: string): any {
        return decode(token, "SECRET_KEY");
    }
}