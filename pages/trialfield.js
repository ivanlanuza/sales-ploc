import { useState } from "react";
import DatePicker from "react-datepicker";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function App() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <ReactDatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  );
}
