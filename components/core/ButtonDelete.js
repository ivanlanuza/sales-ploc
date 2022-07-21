import { TrashIcon } from "@heroicons/react/outline";

const ButtonDelete = ({ onClick }) => (
  <button
    type="submit"
    className="  
      px-6
      py-2
      h-12
      text-white bg-red-900
      font-medium
      text-sm
      leading-tight
      uppercase
      rounded
      shadow-md
      float-right
      mb-4
      mr-2
      hover:bg-red-700 hover:shadow-lg
      focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-red`-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
    onClick={onClick}
  >
    <TrashIcon className="h-6 w-6 text-white" />
  </button>
);

export default ButtonDelete;
