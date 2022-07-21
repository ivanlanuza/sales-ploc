const StackedTextBoxLabel = ({
  value,
  label,
  id,
  placeholder,
  type,
  onChange,
}) => (
  <div className="justify-center p-0 m-0 mb-0 font-mono">
    <span className="ml-1 text-xs text-gray-400 font-light ">{label}</span>
    <input
      type={type}
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
      m-0
      mb-4
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default StackedTextBoxLabel;
