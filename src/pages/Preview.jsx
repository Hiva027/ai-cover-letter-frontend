import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Feedback from "../components/Feedback";
import "../Preview.css";
import bgimage from "../assets/Myjpeg.jpeg";

const Preview = ({ coverLetter, setCoverLetter, verified }) => {
  const navigate = useNavigate();

  const handleDownload = async (format) => {
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/download_${format}`,
        { text: coverLetter },
        { responseType: "blob" } // important for file download
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `cover_letter.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove(); // remove the link after clicking
    } catch (err) {
      console.error(err);
      alert("Download failed. Please try again.");
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
        Your Cover letter has been generated and you can view, edit and
        download here!
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
          {/* Download buttons */}
          <div className="download-buttons">
            <button onClick={() => handleDownload("docx")}>Download DOCX</button>
            <button onClick={() => handleDownload("pdf")}>Download PDF</button>
          </div>

          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Feedback component below the textarea */}
      <div className="feedback-container">
        <Feedback />
      </div>
    </div>
  );
};

export default Preview;
