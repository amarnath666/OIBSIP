import jwt from "jsonwebtoken";

export const generateLogToken = (user) => {
  return jwt.sign(
    {
      _id:user._id,
      name:user.name,
      email:user.email,
    },
    process.env.JWT_PASS || "****",
    {
      expiresIn: "10d",
    }
  );
};
