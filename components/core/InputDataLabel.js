const InputDataLabel = ({ value, label }) => (
  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-t  font-sans border-gray-100">
    <dt className="hidden lg:block text-sm font-medium text-gray-500">
      {label}
    </dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      {value}
    </dd>
  </div>
);

export default InputDataLabel;
