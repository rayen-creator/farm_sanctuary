import { roles } from "./role";

export class User{
    id: number;
    username: String
    email: String
    password: String
    isActive: Boolean
    role: roles
}