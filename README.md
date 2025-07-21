# 📄 AI-Powered Resume Analyzer

A smart, full-stack web app that analyzes resumes using AI and gives **ATS-friendly scores**, keyword matches, improvement tips, and even allows **PDF export of a detailed report**.

---

## 🚀 Live Demo

🌐 [View Live App](https://resumeanalyzer-mu.vercel.app/))  
🧑‍💻 GitHub: [Utkarsh25022/Resume-Analyzer](https://github.com/Utkarsh25022/Resume-Analyzer)

---

## 🧠 Key Features

- 📂 **Upload Resume (PDF)**
- 📊 **AI-Based Resume Scoring**
  - ATS compatibility analysis
  - Keyword and skill matching
  - Formatting issues
- 📝 **Actionable Feedback**
- 📤 **Export as PDF Report**
- 🔐 **User Authentication**
  - Firebase Auth integration
- 🗂️ **History Management**
  - View previous analyses (MongoDB)
- 🌈 **Smooth UI/UX**
  - Tailwind CSS + Framer Motion

---

## ⚙️ Tech Stack

| Layer         | Technology Used                          |
|---------------|-------------------------------------------|
| **Frontend**  | React.js, Tailwind CSS, Framer Motion     |
| **Backend**   | Node.js, Express.js                      |
| **AI/ML**     | Python microservice (NLP, Spacy, sklearn) |
| **Database**  | MongoDB                                   |
| **Auth**      | Firebase Authentication                   |
| **PDF Export**| react-to-print / jsPDF                    |
| **Deployment**| Vercel (frontend), Render (backend)       |

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/Utkarsh25022/Resume-Analyzer.git
cd Resume-Analyzer

# Install frontend
cd client
npm install

# Install backend
cd ../server
npm install

# Set up .env files for Firebase, MongoDB, and API keys
# Run backend
node index.js

# Run frontend
cd ../client
npm start
/Resume-Analyzer
├── client/               # React frontend
│   ├── components/
│   ├── pages/
│   └── App.js
├── server/               # Node.js backend
│   ├── routes/
│   └── index.js
├── ml-service/           # Python resume analyzer
│   └── analyze.py
├── README.md
└── .env


🧠 AI Details (ML Microservice)
Text Extraction: PyMuPDF, pdfminer

Keyword Matching: Based on selected job role

Scoring: Length, skills, sections, formatting

NLP: Spacy, scikit-learn, nltk

📤 PDF Export Sample
Exports an ATS-style analysis report with:

Score

Section-wise feedback

Highlighted issues

Suggestions to improve

🛡️ Security & Auth
Firebase Authentication (Google/Email login)

MongoDB stores history tied to authenticated user

Frontend access restricted to signed-in users

📈 Future Enhancements
📌 Job-specific resume tailoring

📌 Resume template generator

📌 LinkedIn scraping for skill match

📌 ChatGPT-based resume feedback assistant
