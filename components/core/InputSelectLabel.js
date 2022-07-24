const InputSelectLabel = ({ label, value, onChange, data, placeholder }) => (
  <div className="bg-gray-50  font-mono px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t border-gray-100">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      <select
        className="form-select appearance-none
      block
      w-full
      px-2
      py-2
      text-sm
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      -mt-2
      -ml-0
      -mb-3
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        aria-label="Default select example"
        value={value}
        onChange={onChange}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {data.map((dataitem) => (
          <option key={dataitem.id} value={dataitem.id}>
            {dataitem.name}
          </option>
        ))}
      </select>
    </dd>
  </div>
);

export default InputSelectLabel;
