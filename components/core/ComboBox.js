import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

export default function ComboBox({
  label,
  data,
  value,
  onChange,
  min,
  placeholder,
}) {
  const [query, setQuery] = useState("");

  const filteredEntry =
    query === ""
      ? data
      : data.filter((entry) => {
          return entry.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="bg-gray-50  font-sans z-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t border-gray-100">
      <div className="hidden lg:block text-sm font-medium text-gray-500">
        {label}
      </div>
      <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <Combobox value={value} onChange={onChange}>
          <div className="relative w-full  text-left sm:text-sm p-0">
            <Combobox.Input
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              className="font-sans w-full rounded -mt-2 -mb-3 border border-solid border-gray-300 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
              autoComplete="off"
              placeholder={placeholder}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 ">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          {query.length >= min && (
            <Combobox.Options
              className="w-72 absolute z-50 -mt-0 ml-2 max-h-60 overflow-auto rounded-lg bg-white py-1 
        text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {filteredEntry.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredEntry.map((entry) => (
                  <Combobox.Option
                    key={entry.id}
                    value={entry}
                    className={({ active }) =>
                      `font-sans relative cursor-default select-none px-4 py-2 w-full ${
                        active ? "bg-indigo-400 text-white" : "text-gray-900"
                      }`
                    }
                  >
                    {entry.name}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          )}
        </Combobox>
      </div>
    </div>
  );
}
