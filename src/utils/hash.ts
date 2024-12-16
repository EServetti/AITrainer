import { genSaltSync, hashSync } from "bcryptjs"; 

export function createHash(password: string) {
    try {
        const salt = genSaltSync(10);
        const hashedPass = hashSync(password, salt);
        return hashedPass;
    } catch (error) {
        throw error;
    }
}
