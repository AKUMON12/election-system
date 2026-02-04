This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

# **Project Brief Description**

**VoterStream** is a high-integrity, real-time electronic voting platform built with **Next.js 15** and **MongoDB Atlas**. It solves the "Double Voting" problem through strict state management and provides an automated ballot generation system. Designed for academic and organizational elections, it features a robust API layer that handles voter authentication, candidate positioning, and secure vote casting with a focus on data integrity.

---

### **GitHub README.md Template**

````markdown
# 🗳️ VoterStream: Next-Gen Election Management System

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

VoterStream is a secure, scalable, and modern voting solution designed to streamline the democratic process. From voter eligibility verification to automated result tallying, VoterStream ensures every vote is counted once and only once.

## 🚀 Key Features

* **Secure Authentication:** Validates Voter ID and Password against an encrypted cloud database.
* **One-Vote Integrity:** Automatic `voted` flag flipping to prevent multiple ballot submissions.
* **Dynamic Ballots:** Candidates are dynamically linked to positions (President, Senator, etc.) using MongoDB Object Relations.
* **Strict Typing:** Built with TypeScript to ensure data consistency across the API.
* **Database Seeding:** Integrated setup routes for rapid deployment and testing environments.

## 📂 System Architecture & File Structure

```text
voterstream/
├── app/
│   ├── api/                   # Serverless Route Handlers
│   │   ├── vote/              # POST: Handles ballot submission
│   │   ├── candidates/        # GET: Lists all eligible candidates
│   │   ├── setup/             # GET: Database initializer (Seeder)
│   │   └── voters/            # GET/POST: Voter management
│   ├── lib/
│   │   └── mongodb.ts         # Singleton MongoDB Connection (Thread Safe)
│   └── layout.tsx             # Global UI Wrapper
├── public/                    # Candidate photos and static assets
├── .env.local                 # Secure Connection Strings
├── next.config.ts             # Framework Configuration
└── package.json               # Dependencies & Scripts

````

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** MongoDB Atlas (NoSQL)
- **Language:** TypeScript
- **Testing:** Postman API Testing
- **Deployment:** Vercel (Recommended)

## 🏗️ Data Relationship Model

- **Voters:** Tracks status (`voterStat`) and voting history (`voted`).
- **Positions:** Defines the number of allowable winners per office.
- **Candidates:** Linked to specific Positions via `posID`.
- **Votes:** Immutable records of choices linked to Voter IDs.

## 🚦 Getting Started

1. **Clone & Install:**

```bash
npm install

```

2. **Configure Environment:**
   Create a `.env.local` file and add your MongoDB URI:

```text
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/election_db

```

3. **Initialize Database:**
   Run the development server and visit `/api/setup` to seed your initial data.

---

Developed with ❤️ for the Capstone Project 2025.

```

---

### **Final Tip before you go:**
When you come back, the first thing we’ll do is run that **Setup** route one more time to make sure your database has the new **Candidates** we added to the code.

**Whenever you're ready to continue, would you like me to show you how to build the "Live Results" dashboard using MongoDB Aggregations?**

```
