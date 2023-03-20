import { User } from '../../models/user';
import { roles } from './../../models/role';
export interface LoginResponse {

    signin: {
        accessToken: string;
        // username: string;
        user:User;
        message: string;
        expiresIn: number;
        userfound:boolean;
        passwordIsValid:boolean;
        // blocked:boolean;
        // role:roles;
        // two_FactAuth_Option: boolean,
    }
}