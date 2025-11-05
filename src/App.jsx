import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Preview from "./pages/Preview";

function App() {
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [wordCount, setWordCount] = useState(200);
  const [verified, setVerified] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              resumeFile={resumeFile}
              setResumeFile={setResumeFile}
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              wordCount={wordCount}
              setWordCount={setWordCount}
              setCoverLetter={setCoverLetter}
              setVerified={setVerified}
            />
          }
        />
        <Route
          path="/preview"
          element={
            <Preview
              coverLetter={coverLetter}
              setCoverLetter={setCoverLetter}
              verified={verified}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
