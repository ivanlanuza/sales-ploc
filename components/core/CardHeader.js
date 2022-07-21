const CardHeader = ({ title, subtitle }) => (
  <div className="px-4 py-5 sm:px-6 font-mono">
    <h3 className="text-lg leading-6 font-bold text-gray-900">{title}</h3>
    <p className="mt-1 max-w-2xl text-sm text-gray-500">{subtitle}</p>
  </div>
);

export default CardHeader;
