import { Role } from "./role"

export type UserType={
    name: string,
    email: string,
    password: string,
    role: Role,
    status: boolean,
    create_at: Date
}