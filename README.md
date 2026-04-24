<div align="center">

# 🔗 LinkChain — v1.1

**A full-stack, AI-powered Link in Bio platform built with React.js**  
Manage your social links, personalize your profile, and share everything — all from one beautiful page.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://linkchain.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Krupesh17/Link_In_Bio_Application_1.1)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)

</div>

---

## 📌 Overview

**LinkChain** is a Linktree-style web application that lets users create a personalized, shareable profile page featuring all their important links. It features secure authentication, full profile customization, click analytics, and AI-powered utilities — all backed by Supabase and deployed on Vercel.

---

## ✨ Features

### 🔐 Authentication
- Secure sign up / log in powered by **Supabase Auth**
- Session management handled seamlessly on the client

### 🔗 Link Management
- Add, edit, reorder, and delete links from your profile
- Supports any URL — social media, portfolio, shop, and more

### 🎨 Profile Customization
- Upload and update your **profile avatar**
- Edit your **display name**, **username**, and **bio**
- Choose from **custom themes** including a sleek **dark mode**

### 📊 Analytics
- Track **click counts** on individual links
- View **profile view stats** to understand your audience reach

### 🌐 Shareable Public Page
- Every user gets a unique public profile URL
- Fully responsive and ready to share across any platform

### 🤖 AI-Powered Features *(powered by Gemini AI API)*
- **Bio Generator** — Auto-generate a compelling bio based on your name, interests, and role
- **Smart Profile Picture Crop** — Intelligently crops and centers your avatar using Gemini's vision capabilities

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React.js 18 + Vite |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | Shadcn UI |
| **State Management** | Redux Toolkit |
| **Server State / Caching** | TanStack Query (React Query) |
| **Backend & Database** | Supabase (PostgreSQL + Auth + Storage) |
| **AI Integration** | Google Gemini AI API |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- A [Supabase](https://supabase.com) project
- A [Google Gemini API](https://aistudio.google.com/) key

### 1. Clone the Repository

```bash
git clone https://github.com/Krupesh17/Link_In_Bio_Application_1.1.git
cd Link_In_Bio_Application_1.1
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components
├── features/        # Redux slices and feature modules
├── hooks/           # Custom React hooks
├── lib/             # Supabase client & utility functions
├── pages/           # Route-level page components
├── services/        # API calls and TanStack Query hooks
├── store/           # Redux store configuration
└── main.jsx         # App entry point
```

---

## 🌍 Deployment

This project is deployed on **Vercel**. To deploy your own instance:

1. Push the repository to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add your environment variables in the Vercel project settings
4. Deploy — Vercel handles the rest automatically

---

## 📸 Screenshots

![Dashboard](https://github.com/user-attachments/assets/46277adf-0323-4a08-bb5f-345894c73817)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open an [issue](https://github.com/Krupesh17/Link_In_Bio_Application_1.1/issues) or submit a pull request.

---

## 👤 Author

**Krupesh**  
Frontend Developer · React.js Enthusiast · Based in India

[![GitHub](https://img.shields.io/badge/GitHub-Krupesh17-181717?style=flat&logo=github)](https://github.com/Krupesh17)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with ❤️ using React.js, Supabase, and Gemini AI</sub>
</div>
