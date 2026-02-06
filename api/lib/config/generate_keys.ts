import {exportJWK,generateKeyPair} from 'jose'

(async()=>{
    const {publicKey,privateKey}= await generateKeyPair('Ed25519',{extractable:true})
    const jwk_Private= await exportJWK(privateKey)
    const jwk_Public= await exportJWK(publicKey)

    console.log('PRIVATE_JWT_KEY',JSON.stringify(jwk_Private))
    console.log('PUBLIC_JWK_KEY',JSON.stringify(jwk_Public))
})();