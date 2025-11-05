import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Feedback from "../components/Feedback";
import "../Preview.css";
import bgimage from "../assets/Myjpeg.jpeg";

const Preview = ({
  coverLetter,
  setCoverLetter,
  verified,
  resumeFile,
  jobDescription,
  wordCount,
}) => {
  const navigate = useNavigate();

  const handleDownload = async (format) => {
    if (!resumeFile) {
      alert("Please upload your resume first!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_description", jobDescription);
    formData.append("word_count", wordCount);
    formData.append("format", format); // backend can use this to return correct file type

    try {
      const response = await axios.post(
        "https://ai-cover-letter-backend-kdx8.onrender.com/generate_cover_letter_file",
        formData,
        { responseType: "blob" } // important for binary files
      );

      // Create a temporary link to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `cover_letter.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download cover letter. Try again.");
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
      <h3>
        Your Cover Letter has been generated! You can view, edit, and download it here.
      </h3>

      {verified && (
        <div className="verification-status">
          ✅ Verified plagiarism-free and unique
        </div>
      )}

      <div className="preview-content">
        <textarea
          rows="20"
          cols="120"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />

        <div className="side-buttons">
          <div className="download-buttons">
            <button onClick={() => handleDownload("docx")}>Download DOCX</button>
            <button onClick={() => handleDownload("pdf")}>Download PDF</button>
          </div>

          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>
      </div>

      <div className="feedback-container">
        <Feedback />
      </div>
    </div>
  );
};

export default Preview;
