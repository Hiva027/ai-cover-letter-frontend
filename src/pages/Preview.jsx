import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Feedback from "../components/Feedback";
import "../Preview.css";
import bgimage from "../assets/Myjpeg.jpeg";

const Preview = ({ coverLetter, setCoverLetter }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verified } = location.state || {};

  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (type) => {
    if (!coverLetter || !coverLetter.trim()) {
      alert("No cover letter to download!");
      return;
    }

    setDownloading(true);

    try {
      const endpoint =
        type === "pdf"
          ? "https://ai-cover-letter-backend-kdx8.onrender.com/download_pdf"
          : "https://ai-cover-letter-backend-kdx8.onrender.com/download_docx";

      const response = await axios.post(
        endpoint,
        { text: coverLetter },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `cover_letter.${type}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download cover letter. Try again.");
    } finally {
      setDownloading(false);
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
        Your cover letter has been generated. You can edit and download it below!
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
            <button onClick={() => handleDownload("docx")} disabled={downloading}>
              {downloading ? (
                <div className="spinner-container">
                  <div className="spinner"></div>
                  <span>Downloading...</span>
                </div>
              ) : (
                "Download DOCX"
              )}
            </button>
            <button onClick={() => handleDownload("pdf")} disabled={downloading}>
              {downloading ? (
                <div className="spinner-container">
                  <div className="spinner"></div>
                  <span>Downloading...</span>
                </div>
              ) : (
                "Download PDF"
              )}
            </button>
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
