const InputTextAreaLabel = ({
  value,
  label,
  id,
  placeholder,
  rows,
  onChange,
}) => (
  <div className="border-t border-gray-100 font-sans">
    <dl>
      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="hidden lg:block text-sm font-medium text-gray-500">
          {label}
        </dt>
        <dd className="mt-0 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <div className="form-group">
            <textarea
              className="form-control block
              w-full
              px-2
              py-2
              text-sm
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              -mt-2
              -ml-0
              -mb-3
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id={id}
              placeholder={placeholder}
              value={value}
              rows={rows}
              onChange={onChange}
            ></textarea>
          </div>
        </dd>
      </div>
    </dl>
  </div>
);

export default InputTextAreaLabel;
