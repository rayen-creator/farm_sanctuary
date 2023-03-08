import { roles } from "./role";

export class User{
    id: number;
    username: String
    email: String
    password: String
    phone: Number
    isActive: Boolean
    role: roles
}