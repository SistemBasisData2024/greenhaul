import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="mt-12 px-4 pt-4 w-full flex flex-col items-center justify-center">
        <h1 className="text-primary-green font-black text-3xl">GREENHAUL</h1>

        <p className="text-justify text-primary-green mt-4">
          Recycle Rewards Aplikasi berbasis web menggunakan framework Node.js
          yang memungkinkan pengguna untuk memesan pengangkut sampah yang akan
          mengangkut sampah daur ulang mereka dan mendapatkan imbalan berupa
          koin aplikasi yang nantinya dapat ditukarkan dengan produk-produk daur
          ulang pada website. Sistem login terdiri dari pengangkut dan pengguna.
          Pengangkut dapat mengubah jadwal pengangkutan, pengguna dapat memesan
          jadwal pengangkutan.
        </p>

        <Link to={"/user/register"} className="text-header font-bold mt-4">
          CONTRIBUTE NOW
        </Link>
      </div>

      <section id="features" className="p-10 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-green mb-8">
            Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4 border border-primary-green rounded-lg shadow-sm hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-primary-green">
                Order Waste
              </h3>

              <p className="text-gray-800">
                Count your waste and order us to pick up your wastes.
              </p>
            </div>

            <div className="p-4 border  border-primary-green rounded-lg shadow-sm hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-primary-green">
                Find Products
              </h3>

              <p className="text-gray-800">
                Browse through a wide range of products and pick your favorite.
              </p>
            </div>

            <div className="p-4 border  border-primary-green rounded-lg shadow-sm hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-primary-green">
                Register & Participate
              </h3>

              <p className="text-gray-800">
                Join us contributing to the effort of improving the climate
                change problems.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
