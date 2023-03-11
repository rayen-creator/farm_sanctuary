export interface LoginResponse {

    signin: {
        accessToken: string;
        username: string;
        message: string;
        expiresIn: number;
        userfound:boolean;
        passwordIsValid:boolean;
        blocked:boolean;
    }
}