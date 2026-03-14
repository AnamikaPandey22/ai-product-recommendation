import React, { useState } from "react";

function PreferenceInput({ onSearch }) {

  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;

    onSearch(input);
  };

  return (
    <div className="search-box">

      <input
        type="text"
        placeholder="I want a phone under $500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />

      <button onClick={handleSubmit}>
        Recommend
      </button>

    </div>
  );
}

export default PreferenceInput;