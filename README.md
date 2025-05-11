# Logos

A collaborative markdown editor with AI-powered formatting capabilities.

## Overview

Logos is a real-time collaborative markdown editor designed to simplify document creation and editing. It leverages AI to enhance formatting and provides a seamless collaboration experience.

## Features

- **Real-time Collaboration**: Edit documents simultaneously with team members
- **Markdown Support**: Full markdown syntax support with live preview
- **AI-Powered Formatting**: Intelligent suggestions for better document structure
- **Version History**: Track changes and revert to previous versions
- **Secure Sharing**: Granular permission controls for document access

## Technology Stack

### Frontend
- React with TypeScript
- TailwindCSS for styling
- Yjs for real-time collaboration
- React Router for routing
- React Context API for state management

### Backend
- Supabase for database, auth, and storage
- PostgreSQL for database
- Node.js for WebSocket server
- AWS for hosting

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Docker (for local development)

### Installation

1. Clone the repository
```bash
git clone https://github.com/jrkphani/logos.git
cd logos
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server
```bash
npm run dev
```

## Project Structure

```
logos/
├── frontend/           # React frontend application
├── infrastructure/     # AWS CloudFormation templates
├── scripts/            # Utility scripts
├── supabase/           # Supabase configuration and migrations
│   └── migrations/     # Database migrations
└── docs/               # Documentation
```

## Development

This project follows a task-based development approach using Task Master. To view the current tasks:

```bash
npx task-master-ai list
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/jrkphani/logos](https://github.com/jrkphani/logos)
