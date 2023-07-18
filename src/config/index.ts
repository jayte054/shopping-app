import {config} from "dotenv"

config()

export const Gmail_User = process.env.EMAIL_USER
export const Gmail_Password = process.env.EMAIL_PASSWORD