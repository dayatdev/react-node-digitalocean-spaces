import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const onClickHandler = (event) => {
    const data = new FormData();
    data.append("file", selectedFile);

    axios
      .post("http://localhost:8000/upload", data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText);
        toast.success("Success! File uploaded");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed! Something wrong, try again.");
      })
      .finally(() => {
        setSelectedFile(null);
      });
  };

  return (
    <div>
      <h1>React Node Image and Video Upload</h1>
      <div>
        <input type="file" name="file" onChange={onChangeHandler} />
        <button type="submit" onClick={onClickHandler} disabled={!selectedFile}>
          Upload
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
