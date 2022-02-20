import jwt from "jsonwebtoken";

const signAccessToken = (id: string) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "2h" });
  return accessToken;
};

const verifyJwt = (accessToken: string) => {
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_KEY);
  } catch (error) {
    // Validation Failed
  }
};

const decodeJwt = (cachedToken: string) => {
  const decodedJwt = jwt.decode(cachedToken, { complete: true });
};
