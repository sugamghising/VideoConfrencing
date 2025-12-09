# Video Conferencing App

A modern, feature-rich video conferencing application built with Next.js 15, Stream Video SDK, and Clerk authentication. This app provides a seamless experience for scheduling, joining, and managing virtual meetings with real-time video, audio, and screen sharing capabilities.

## Features

- 🎥 **Real-time Video Conferencing** - High-quality video and audio calls powered by Stream Video SDK
- 🔐 **Secure Authentication** - User authentication and management with Clerk
- 📅 **Meeting Scheduling** - Schedule upcoming meetings with custom descriptions
- 🏠 **Personal Meeting Room** - Each user gets a dedicated meeting room with a permanent link
- 📝 **Meeting Management** - View upcoming, previous, and recorded meetings
- 🎬 **Recording Playback** - Access and replay recorded meeting sessions
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI** - Clean, intuitive interface built with Tailwind CSS and Radix UI

## Tech Stack

- **Framework**: Next.js 15.3.2 (App Router)
- **Language**: TypeScript
- **Video SDK**: Stream.io Video React SDK
- **Authentication**: Clerk
- **Styling**: Tailwind CSS 4.1.8
- **UI Components**: Radix UI (Dialog, Dropdown Menu, Slot)
- **Date Picker**: React DatePicker
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast notifications)

## Project Structure

```
my-app/
├── actions/              # Server actions
│   └── stream.actions.ts
├── app/
│   ├── (auth)/          # Authentication routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (root)/          # Main application routes
│   │   ├── (home)/      # Home, previous, recordings, etc.
│   │   └── meeting/[id] # Dynamic meeting room
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── CallList.tsx    # Meeting list display
│   ├── MeetingRoom.tsx # Video call interface
│   ├── MeetingSetup.tsx # Pre-call setup
│   └── ...
├── constants/          # App constants
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── providers/         # Context providers
└── public/           # Static assets

```

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sugamghising/VideoConfrencing.git
cd VideoConferencing/my-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory and add the following:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stream.io Video SDK
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_ID=your_stream_secret_key

# App URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**To get your API keys:**

- **Clerk**: Sign up at [clerk.com](https://clerk.com) and create a new application
- **Stream.io**: Sign up at [getstream.io](https://getstream.io) and create a new video app

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Features Explained

### Authentication

Users can sign up and sign in using Clerk's secure authentication system. The app supports email/password authentication and social logins.

### Meeting Types

- **Instant Meeting** - Start a meeting immediately
- **Schedule Meeting** - Plan a meeting for a future date/time
- **Join Meeting** - Enter a meeting using a meeting ID
- **Personal Room** - Access your permanent meeting room

### Meeting Controls

- Toggle video on/off
- Toggle microphone on/off
- Share screen
- View participant list
- Chat functionality
- Leave/End call

### Meeting History

- **Upcoming** - View all scheduled meetings
- **Previous** - See past meetings
- **Recordings** - Access recorded sessions

## Deployment

The app can be deployed on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

For detailed deployment instructions, check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Links

- **Repository**: [github.com/sugamghising/VideoConfrencing](https://github.com/sugamghising/VideoConfrencing)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **Stream Video SDK**: [getstream.io/video/docs](https://getstream.io/video/docs)
- **Clerk Documentation**: [clerk.com/docs](https://clerk.com/docs)
