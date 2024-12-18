import { compareSync, genSaltSync, hashSync } from "bcryptjs"; 

export function createHash(password: string) {
    try {
        const salt = genSaltSync(10);
        const hashedPass = hashSync(password, salt);
        return hashedPass;
    } catch (error) {
        throw error;
    }
}

export function compareHash(password: string, comparePass: string){
    const compared = compareSync(password, comparePass)
    return compared
}
