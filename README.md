# Hirly AI - Interview Question Platform

This web application is designed to streamline the job application process. Companies can post job openings, applicants can respond to interview questions, and the platform provides ratings for the answers through an integrated LLM. Admins can review the responses and ratings to make informed hiring decisions. This platform has been developed as a white label solution for a specific company.

## Hosted Link 

- https://hirly-ai-bethmi.netlify.app

## Technology stack
   ```markdown
    ✅ Frontend: React TS
    ✅ Backend: Node Express TS
    ✅ Database: MongoDB
    ✅ Fine-tuning: OpenAI
    ✅ Authentication: Clerk
    ✅ Styling: Tailwind Shadcn
   ```

## Features

![home](./Screenshots/Screenshot%20from%202024-07-15%2019-26-21.png)

![home](./Screenshots/Screenshot%20from%202024-07-15%2019-26-37.png)
- **Job Posting:** Admins can create and manage job listings.
- **Interview Questions:** Applicants can answer interview questions posted for job openings.

![home](./Screenshots/Screenshot%20from%202024-07-15%2019-28-01.png)
- **LLM Rating:** Integrated LLM provides ratings for applicants' answers.

![home](./Screenshots/Screenshot%20from%202024-07-15%2019-28-27.png)
- **Admin Dashboard:** Admins can view applicant responses and LLM ratings.
- **User Authentication:** Secure login and registration using Clerk.
- **Responsive Design:** Clean and responsive user interface styled with Tailwind.

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/bethmij/Hirly-AI.git

2. **Install dependencies:**
   ```bash
   npm install

3. **Set up environment variables:**
   Create a .env file in the root directory and add the necessary environment variables.
   ```bash
   MONGO_URI=your_mongodb_uri
   OPENAI_API_KEY=your_openai_api_key
   CLERK_API_KEY=your_clerk_api_key

4. **Run the application:**
   ```bash
   npm start