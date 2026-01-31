# Resona

Resona is a modern, secure platform for anonymous feedback and messaging. It allows users to send and receive anonymous messages, fostering open communication without revealing identities. Built with cutting-edge web technologies, Resona emphasizes user privacy, ease of use, and innovative features like AI-powered message suggestions.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: Next.js API routes, MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **AI Integration**: Google Generative AI, AI SDK
- **Email Services**: Resend, React Email
- **Form Handling**: React Hook Form with Zod validation
- **Other Libraries**: Axios, Bcryptjs, Day.js, Lucide React, Sonner for notifications

## Features

- **Anonymous Messaging**: Send and receive messages without revealing your identity.
- **User Authentication**: Secure sign-up and sign-in with email verification.
- **AI-Powered Suggestions**: Generate creative message ideas using advanced AI models.
- **Dashboard**: Manage your messages, toggle message acceptance, and view received feedback.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Real-Time Updates**: Seamless user experience with modern UI components.
- **Email Notifications**: Automated verification and communication via email.

## Functionalities

- **User Registration and Verification**: Users can create accounts with email verification to ensure authenticity.
- **Message Sending**: Public profiles allow anonymous message submission.
- **Message Management**: Users can view, delete, and control incoming messages.
- **AI Message Suggestions**: Integrated AI to provide personalized message prompts.
- **Profile Customization**: Unique usernames for personalized public links.
- **Security**: Password hashing, secure API endpoints, and privacy-focused design.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- MongoDB database
- API keys for OpenAI, Google Generative AI, and Resend

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aguptashyam/Resona.git
   cd resona
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
   RESEND_API_KEY=your_resend_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To build the application for production:

```bash
npm run build
npm start
```

## Usage

1. **Sign Up**: Create an account and verify your email.
2. **Set Up Profile**: Choose a unique username for your public message link.
3. **Share Your Link**: Distribute your public profile URL (e.g., `/u/username`) to receive anonymous messages.
4. **Send Messages**: Visit others' profiles to send anonymous feedback.
5. **Manage Messages**: Access your dashboard to view and manage received messages.
6. **AI Suggestions**: Use the AI feature to generate message ideas.

