import React, { useState } from "react";
import { BsSearch } from 'react-icons/bs'

function SearchBar() {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="flex items-center">
      {showInput && (
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-lg"
        />
      )}
      <button
        onClick={() => setShowInput(!showInput)}
        className="p-2  rounded-lg  focus:outline-none focus:ring-2 "
      >
        <BsSearch className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

export default SearchBar;