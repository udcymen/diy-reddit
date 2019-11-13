import { Role } from './role.model'


export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    roles: Role;
}