import { useState } from "react";

import { register } from "../../../actions/adminAction";
import { isValidEmail } from "../../../utils";

const AdminRegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleAction = async () => {
    let emailError = "";
    let passwordError = "";

    if (!isValidEmail(email)) {
      emailError = "Invalid email address";
    }

    if (password.length < 8) {
      passwordError = "Password must be at least 8 characters long";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setLoading(true);

    const data = await register(email, password);

    if (data.result == null) {
      const msg = data.message.toLowerCase() || "";

      if (msg.contains("email") || msg.contains("account")) {
        setErrors({ email: msg, password: "" });
        return;
      }

      if (msg.contains("password")) {
        setErrors({ email: "", password: msg });
        return;
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-green">
      <div className="text-header text-2xl mb-4 font-bold">
        ADMIN AUTHENTICATION
      </div>

      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-green">Register</h2>
        </div>

        <form className="flex flex-col gap-4 text-primary-green">
          <div>
            <label className="">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
              className={`mt-1 block w-full p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-primary-green focus:border-primary-green`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
              className={`mt-1 block w-full p-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-primary-green focus:border-primary-green`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            <p
              className={cn(
                "mt-2 ml-1 cursor-pointer hover-underline-animation w-fit text-sm after:mt-0.5 after:h-[1px]",
                showPassword ? "after:w-full" : ""
              )}
              onClick={() => setShowPassword(!showPassword)}
            >
              Show Password
            </p>
          </div>

          <button
            type="button"
            className="button font-bold self-center"
            onClick={handleAction}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
