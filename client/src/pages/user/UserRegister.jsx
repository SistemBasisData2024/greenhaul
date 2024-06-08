import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../../actions/userActions";
import { isValidEmail, cn } from "../../utils";

const UserRegister = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    nama: "",
    alamat: "",
  });
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

    const data = await register(email, password, nama, alamat);

    if (data == null) {
      // const msg = data.toLowerCase() || "";

      // if (msg.contains("email") || msg.contains("account")) {
      //   setErrors({ email: msg, password: "" });
      //   return;
      // }

      // if (msg.contains("password")) {
      //   setErrors({ email: "", password: msg });
      //   return;
      // }
      console.log(data);
      return;
    }

    setLoading(false);

    navigate("/user/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-green px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-green">Register</h2>
        </div>

        <form className="flex flex-col gap-4 text-primary-green">
          <div>
            <label className="">Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => {
                setNama(e.target.value);
                setErrors({ ...errors, nama: "" });
              }}
              className={`mt-1 block w-full p-2 border ${
                errors.nama ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-primary-green focus:border-primary-green`}
              required
            />
            {errors.nama && (
              <p className="text-red-500 text-sm">{errors.nama}</p>
            )}
          </div>

          <div>
            <label className="">Alamat</label>
            <input
              type="text"
              value={alamat}
              onChange={(e) => {
                setAlamat(e.target.value);
                setErrors({ ...errors, alamat: "" });
              }}
              className={`mt-1 block w-full p-2 border ${
                errors.alamat ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-primary-green focus:border-primary-green`}
              required
            />
            {errors.alamat && (
              <p className="text-red-500 text-sm">{errors.alamat}</p>
            )}
          </div>

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

        <Link
          to="/user/login"
          className="text-primary-green text-center mx-auto block"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default UserRegister;
