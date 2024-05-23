import bcrypt from "bcrypt";

export const BaseApiResponse = (result, message) => ({
  result: result,
  message: message,
});

export const isValidEmail = (email = "") =>
  !!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

export const hashPassword = async (password = "") => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
  const hash = await bcrypt.hash(password, salt);

  return hash;
};
