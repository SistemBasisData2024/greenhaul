import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

const jwt = jsonwebtoken;

export const BaseApiResponse = (result, message) => ({
  result: result,
  message: message,
});

export const APIResponse = (res, code, result, message) =>
  res.status(code).json(BaseApiResponse(result, message));

export const isValidEmail = (email = "") =>
  !!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

export const hashPassword = async (password = "") => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

export const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
