import jsonwebtoken from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const generateToken = (payload) => {
  const token = jsonwebtoken.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jsonwebtoken.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};
