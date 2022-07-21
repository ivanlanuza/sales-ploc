const StackedSelectLabel = ({ label, value, onChange, data, placeholder }) => (
  <div className="justify-center p-0 m-0 mb-0 font-mono">
    <span className="ml-1 text-xs text-gray-400 font-light ">{label}</span>
    <div className="mb-2 xl:w-100">
      <select
        className="form-select appearance-none
        block
        w-full
        px-4
        py-3
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        text-sm
        rounded
        transition
        ease-in-out
        m-0
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
    </div>
  </div>
);

export default StackedSelectLabel;
