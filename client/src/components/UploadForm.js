import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useAuth } from '../context/AuthContext';
import AuthForm from './AuthForm';

function UploadForm() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const resultRef = useRef(null);
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);

    if (!currentUser) {
      alert("Please log in to analyze your resume.");
      setShowAuthModal(true);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await axios.post('http://localhost:5000/analyze', formData);
      setTimeout(() => {
        setResult(response.data);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    const element = resultRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
    pdf.save('ATS_Report.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          🚀 AI Resume Analyzer
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Upload Resume</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files[0])}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Job Description</label>
            <textarea
              rows="6"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
              placeholder="Paste the job description here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </form>

        {loading && (
          <div className="mt-6 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full animate-pulse w-2/3 rounded-full transition-all duration-700"></div>
          </div>
        )}

        {result && (
          <motion.div
            ref={resultRef}
            className="mt-8 bg-green-50 border border-green-300 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-bold text-green-700">✅ ATS Score: {result.score}%</h2>
            <p className="mt-2 text-sm">
              <strong className="text-green-800">Matched Keywords:</strong> {result.matched_keywords.join(', ')}
            </p>
            <p className="mt-1 text-sm">
              <strong className="text-red-600">Missing Keywords:</strong> {result.missing_keywords.join(', ')}
            </p>
            <button
              onClick={handleDownload}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              📥 Download as PDF
            </button>
          </motion.div>
        )}

        {showAuthModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <AuthForm onSuccess={() => setShowAuthModal(false)} showClose={true} />
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
              >
                ✖
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default UploadForm;
