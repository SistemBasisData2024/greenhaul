import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { formatDate } from "../utils/index";
import { changeOrderSampah } from "../actions/adminAction";

const ChangeOrderDetail = ({ statusOrder, berat, tanggal }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [status, setStatus] = useState(statusOrder);
  const [number, setNumber] = useState(berat);

  const [startDate, setStartDate] = useState(tanggal);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const d = await changeOrderSampah(id, status, tanggal, berat);

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
          <option value="BERHASIL KONVERSI">
            SAMPAH BERHASIL DIKONVERSI MENJADI KOIN
          </option>
          <option value="SEDANG DIHITUNG">SAMPAH SEDANG DIHITUNG</option>
          <option value="MENUJU ALAMAT">TUKANG SEDANG MENUJU ALAMAT</option>
          <option value="SAMPAH SUDAH DIANGKUT">
            TUKANG TELAH MENGANGKUT SAMPAH
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
          value={number}
          onChange={(e) => setNumber(e.target.value)}
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
          {startDate ? formatDate(new Date(startDate)) : "Select a Date"}
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
              minDate={new Date()}
              calendarClassName="custom-calendar"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-primary-green text-white px-4 py-2 rounded-md mt-4"
        disabled={!status || !number || !startDate}
      >
        Submit
      </button>
    </form>
  );
};

export default ChangeOrderDetail;
