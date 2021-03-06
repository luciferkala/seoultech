import jwt, { TokenExpiredError } from "jsonwebtoken";

class JwtService {
    static async createAccessToken(email): Promise<string> {
        const payload = {
            email
        };
        const options = {
            expiresIn: "4 weeks"
        };
        const token = await jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            options
        );
        return token;
    }
    static async createRefreshToken(): Promise<string> {
        const payload = {};
        const options = {
            expiresIn: "8 weeks"
        };
        const token = await jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            options
        );
        return token;
    }

    static async verifyToken(token): Promise<string | object | undefined> {
        let validToken: string | object | undefined = "";
        try {
            validToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                validToken = "ExpiredToken";
            } else {
                validToken = "InvalidToken";
            }
        }
        return validToken;
    }

    static async decodeToken(
        token
    ): Promise<{ [key: string]: any } | string | null> {
        return await jwt.decode(token);
    }
}
export default JwtService;
