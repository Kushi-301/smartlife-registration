# SmartLife Foundation - Registration Form

A modern, responsive registration form with real-time database integration.

## 🚀 Quick Start

### 1. Clone the Repository

git clone https://github.com/Kushi-301/smartlife-registration.git
cd smartlife-registration

text

### 2. Install Dependencies

npm install

text

### 3. Set Up Environment Variables

cp .env.example .env.local

text

The `.env.local` file already has the correct Convex URL - no changes needed!

### 4. Start the App

npx vite

text

### 5. Open in Browser

Go to: [**http://localhost:5173**](http://localhost:5173)

That's it! The form is now working and connected to the database.

---

## 📊 View Registration Data (Admin Only)

Only the project owner can view submitted registrations:

1. Go to: https://dashboard.convex.dev
2. Log in with your GitHub account
3. Select the project
4. Click "Data" → "registrations"

Or use command line:

npx convex dashboard

text

---

## 🏗️ Project Structure

smartlife-registration/
├── src/
│ ├── components/
│ │ ├── RegistrationForm.tsx # Main form
│ │ └── RegistrationForm.css # Styles
│ ├── App.tsx
│ └── main.tsx
├── convex/
│ ├── schema.ts # Database schema
│ └── registrations.ts # Backend functions
├── .env.local # Your config (not in git)
├── .env.example # Template config
└── package.json

text

---

## 🔒 Security Note

- ✅ Anyone can **submit** registrations through the form
- ✅ Anyone can **clone and run** the project
- ❌ Only project owner can **view** registration data
- ❌ Database credentials are not exposed

---

## 🛠️ Tech Stack

- React + TypeScript
- Vite
- Convex (Backend & Database)
- React Hook Form + Zod (Validation)

---

## 📝 License

MIT License

---

**Questions?** Open an issue or contact the maintainer.
