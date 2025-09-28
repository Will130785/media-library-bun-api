import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)
const alg = 'HS256'

export const signJWT = async (userId: string) => {
  console.log('STORING USER ID', userId)
  const jwt = await new SignJWT({ 'urn:example:claim': true, userId })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('2h')
    .sign(secret)
  return jwt
}

export const verifyJWT = async (jwtPayload: string) => {
  const jwtVerified = await jwtVerify(jwtPayload, secret)
  return jwtVerified
}
