import jwt from "jsonwebtoken";

export const generateJwt = (id: string, email: string) => {
  const userJwt = jwt.sign(
    {
      id: id,
      email: email,
    },
    process.env.JWT_KEY!,
  );

  return userJwt;
};
