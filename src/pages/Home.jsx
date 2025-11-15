import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import bgimage from "../assets/space.jpg";

const Home = ({ setCoverLetter }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [wordCount, setWordCount] = useState(200);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => setResumeFile(e.target.files[0]);

  const handleGenerate = async () => {
    if (!resumeFile) {
      setError("Please upload a resume file.");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_description", jobDescription);
    formData.append("word_count", wordCount);

    try {
      const res = await axios.post(
        "https://ai-cover-letter-backend-kdx8.onrender.com/generate_cover_letter",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 120000, // 2 min timeout
        }
      );

      setCoverLetter(res.data.cover_letter);
      setVerified(true);

      // Pass all necessary data to Preview page
      navigate("/preview", {
        state: {
          coverLetter: res.data.cover_letter,
          resumeFile,
          jobDescription,
          wordCount,
          verified: true,
        },
      });
    } catch {
      setError("Error generating cover letter. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <h1>AI - Cover Letter Generator</h1>
      <p>
        Upload your resume and add a job description with your intended word count (optional). The result will be a
        plagiarism-free and professional cover letter.
      </p>

      <label>Upload your Resume (.docx / .pdf): </label>
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        disabled={loading}
      />

      <label>Job Description (optional):</label>
      <textarea
        rows="10"
        cols="100"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Write down the job description here..."
        disabled={loading}
      />

      <label>Word Count:</label>
      <input
        type="number"
        value={wordCount}
        min="100"
        max="400"
        onChange={(e) => setWordCount(e.target.value)}
        disabled={loading}
      />

      <button onClick={handleGenerate} disabled={loading} className="generate-btn">
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <span>Generating... Please wait</span>
          </div>
        ) : (
          "Generate Cover Letter"
        )}
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Home;

