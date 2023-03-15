import crypto from "crypto"
const DbUrl = ""
const cryto_data = {
    salt : "37ac94fa1f23c26c5473",
    iterations : 1000,
    keylen : 32,
    digest : 'sha512'
}
const rateLimitterParams = {
     windowMs: 1 * 60 * 1000, // 1 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 1 minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}
export {DbUrl, cryto_data, rateLimitterParams}

