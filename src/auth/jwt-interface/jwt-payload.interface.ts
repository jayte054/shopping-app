import {v4 as uuid} from "uuid"
export interface JwtPayload {
    username: string;
    id: string
}