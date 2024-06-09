import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { createOrderSampah } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

const CreateOrder = ({ text = "Create Order" }) => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const calendarRef = useRef();

  const handleAction = async () => {
    setShowCalendar(false);

    if (!startDate) {
      alert("Choose correct date!");
      return;
    }

    const sampah = await createOrderSampah(startDate);

    if (!sampah) {
      alert("Failed to create order!");
      return;
    }

    navigate(0);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
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

  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="text-header text-white text-base font-medium"
      >
        {text}
      </button>

      {showCalendar && (
        <div
          className="absolute z-10 mt-2 p-4 bg-white border border-primary-green rounded-md shadow-lg flex flex-col items-center"
          ref={calendarRef}
        >
          <h2 className="text-xl mb-4 text-primary-green">Choose Date</h2>
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
          <button
            onClick={handleAction}
            className="text-header text-base text-white mt-4 disabled:bg-gray-800 disabled:opacity-80 disabled:cursor-not-allowed"
            disabled={startDate == null}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateOrder;
