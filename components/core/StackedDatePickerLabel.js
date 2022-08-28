import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StackedDatePickerLabel = ({ selected, label, onChange }) => (
  <div className="justify-center p-0 m-0 mb-0 font-sans">
    <span className="ml-1 text-xs text-gray-400 font-light ">{label}</span>
    <ReactDatePicker
      selected={selected}
      onChange={onChange}
      className="form-control block
                    w-full
                    px-4
                    py-3
                    text-sm
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    mt-0
                    -ml-0
                    mb-3
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    z-0 
                    relative"
    />
  </div>
);

export default StackedDatePickerLabel;
