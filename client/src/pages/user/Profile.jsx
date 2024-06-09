import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { changeProfile, getProfile } from "../../actions/userActions";
import { isValidEmail } from "../../utils";

const Profile = () => {
  const navigate = useNavigate();

  const [oldEmail, setOldEmail] = useState("");
  const [oldNama, setOldNama] = useState("");
  const [oldAlamat, setOldAlamat] = useState("");

  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [koin, setKoin] = useState(0);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    nama: "",
    alamat: "",
  });

  const fetchProfile = async () => {
    const pr = await getProfile();

    if (!pr) {
      // navigate("/user/dashboard");
      return;
    }

    setOldAlamat(pr.alamat);
    setOldNama(pr.nama);
    setOldEmail(pr.email);

    setEmail(pr.email);
    setNama(pr.nama);
    setAlamat(pr.alamat);
    setKoin(pr.jumlah_koin);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAction = async () => {
    let emailError = "";

    if (!isValidEmail(email)) {
      emailError = "Invalid email address";
    }

    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setLoading(true);

    const d = await changeProfile(nama, alamat, email);

    if (!d) {
      alert("Failed to change profile");
      return;
    }

    setLoading(false);

    navigate(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-green px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-green">
            User Profile
          </h2>
        </div>

        <div>
          <h1>Koin: </h1>

          <h1>{koin}</h1>
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

          <button
            type="button"
            className="button font-bold self-center disabled:bg-slate-500"
            disabled={
              alamat == oldAlamat && email == oldEmail && nama == oldNama
            }
            onClick={handleAction}
          >
            {loading ? "Loading..." : "Save Changes"}
          </button>
        </form>

        <button
          type="button"
          className="button font-bold self-center block mx-auto disabled:bg-slate-500"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;
