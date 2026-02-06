import { exportPKCS8, exportSPKI, importJWK,JWK } from "jose";

const privateJWK=(JSON.parse(Bun.env.PRIVATE_JWT_KEY as string)) as JWK
const publicJWK=(JSON.parse(Bun.env.PUBLIC_JWK_KEY as string)) as JWK

export async function loadEd25519Keys() {
    const privatekey= await importJWK(privateJWK,'EdDSA',{extractable:true})
    const publickey= await importJWK(publicJWK,'EdDSA',{extractable:true})

    const privatePEM = await exportPKCS8(privatekey!);
    const publicPEM = await exportSPKI(publickey!);

    return {privatePEM,publicPEM};
}