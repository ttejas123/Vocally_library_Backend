import { cryto_data } from "../Config/index.mjs";
import crypto from 'crypto'

const hashPassword = async(password)=> {

    const derivedKey = await new Promise((resolve, reject) => {
        crypto.pbkdf2(password, cryto_data.salt, cryto_data.iterations, cryto_data.keylen, cryto_data.digest, (err, key) => {
            if (err) reject(err);
            resolve(key)
        });
    });

    const hashedPassword = derivedKey.toString('hex');
    return hashedPassword;
}

export default hashPassword