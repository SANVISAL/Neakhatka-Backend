import { randomBytes } from "crypto";

export function generateEmailVerication():string{
    return randomBytes(32).toString("hex")
}