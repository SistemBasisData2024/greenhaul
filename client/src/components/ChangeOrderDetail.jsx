import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { formatDate, formatToPostgresTimestamp } from "../utils/index";
import { changeOrderSampah, convertSampah } from "../actions/adminAction";

const ChangeOrderDetail = ({ statusOrder, berat, tanggal }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [status, setStatus] = useState("");
  const [beratSampah, setBeratSampah] = useState(0);

  const [startDate, setStartDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const calendarRef = useRef();

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setStatus(statusOrder);
    setBeratSampah(berat);
    setStartDate(new Date(tanggal));
  }, [statusOrder, berat, tanggal]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "SAMPAH BERHASIL DIKONVERSI MENJADI KOIN") {
      const a = await convertSampah(id);

      if (!a) {
        alert("Failed to convert!");

        return;
      }

      navigate("/admin/order-sampah");

      return;
    }

    const d = await changeOrderSampah(
      id,
      status,
      formatToPostgresTimestamp(startDate),
      beratSampah
    );

    if (!d.result) {
      alert("Failed to change!");
      return;
    }

    navigate(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center border-2 border-primary-green px-4 py-2 mt-6 rounded-lg"
    >
      <div className="grid grid-cols-2 w-full mb-4">
        <label htmlFor="status" className="text-start font-semibold">
          STATUS PESANAN
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-green"
        >
          <option value="">Pilih Status</option>
          <option value="PESANAN SELESAI">PESANAN SELESAI</option>
          <option value="SAMPAH BERHASIL DIKONVERSI MENJADI KOIN">
            BERHASIL KONVERSI
          </option>
          <option value="SAMPAH SEDANG DIHITUNG">SEDANG DIHITUNG</option>
          <option value="TUKANG SEDANG MENUJU ALAMAT">MENUJU ALAMAT</option>
          <option value="TUKANG TELAH MENGANGKUT SAMPAH">
            SAMPAH SUDAH DIANGKUT
          </option>
          <option value="PESANAN DIPROSES">PESANAN DIPROSES</option>
        </select>
      </div>

      <div className="grid grid-cols-2 w-full mb-4">
        <label htmlFor="number" className="text-start font-semibold">
          BERAT (kg)
        </label>
        <input
          id="number"
          type="number"
          min={0}
          value={beratSampah || 0}
          onChange={(e) => {
            setBeratSampah(e.target.value);
          }}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-green"
        />
      </div>

      <div className="relative grid grid-cols-2 w-full mb-4">
        <label className="text-start font-semibold">TANGGAL</label>
        <button
          type="button"
          onClick={toggleCalendar}
          className="w-full px-3 py-2 border bg-white rounded-md focus:outline-none focus:ring focus:ring-primary-green text-left"
        >
          {startDate
            ? formatToPostgresTimestamp(new Date(startDate))
            : "Select a Date"}
        </button>

        {showCalendar && (
          <div
            className="absolute z-10 mt-2 bg-white border border-primary-green rounded-md shadow-lg p-4"
            ref={calendarRef}
          >
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              inline
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              minDate={new Date()}
              calendarClassName="custom-calendar"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-primary-green text-white px-4 py-2 rounded-md mt-4"
        disabled={!status || !beratSampah || !startDate}
      >
        Submit
      </button>
    </form>
  );
};

export default ChangeOrderDetail;
