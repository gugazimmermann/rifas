import { SignJWT, jwtVerify, JWTPayload } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
const REFRESH_SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET_KEY
);

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables.");
}

if (!REFRESH_SECRET_KEY) {
  throw new Error(
    "JWT_REFRESH_SECRET_KEY is not defined in environment variables."
  );
}

export const createToken = async (payload: JWTPayload, expiresIn: string) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(SECRET_KEY);
};

export const createRefreshToken = async (
  payload: JWTPayload,
  expiresIn: string = "7d"
) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(REFRESH_SECRET_KEY);
};

export const verifyToken = async (
  token: string
): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (e) {
    console.error("Token verification failed:", e);
    return null;
  }
};

export const verifyRefreshToken = async (
  token: string
): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, REFRESH_SECRET_KEY);
    return payload;
  } catch (e) {
    console.error("Refresh token verification failed:", e);
    return null;
  }
};
