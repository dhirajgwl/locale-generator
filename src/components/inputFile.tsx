"use client";

import React, { useState } from "react";
import Modal from "./modal";

type InputFileProps = {
  setJsonData: React.Dispatch<React.SetStateAction<string | undefined>>;
  jsonData: string | undefined;
};

const InputFile: React.FC<InputFileProps> = ({ setJsonData, jsonData }) => {
  // const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Check if a file was selected
    if (!file) {
      setError("No file selected");
      return;
    }

    // Check if the selected file is a JSON file
    if (file.type !== "application/json") {
      setError("Please select a valid JSON file");
      return;
    }

    const reader = new FileReader();

    // Read the file as text
    reader.onload = (e) => {
      try {
        // Parse the JSON data
        const data = JSON.parse(e?.target?.result as string);
        setJsonData(data);

        setError(""); // Clear any previous error
      } catch (err) {
        setError(
          "Error parsing JSON: " + (err instanceof Error ? err.message : "")
        );
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {jsonData && (
        <>
          <button
          type="button"
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(true)
            }}
          >
            View JSON Data
          </button>
        </>
      )}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <h3>Parsed JSON Data:</h3>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      </Modal>
    </div>
  );
};

export default InputFile;
