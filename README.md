# CNN Visualizer

A powerful web application that visualizes Convolutional Neural Network (CNN) feature maps and layer activations in real-time. This tool helps researchers, students, and machine learning enthusiasts understand how CNNs process and interpret images through different layers of the network.

## Features

- Real-time visualization of CNN feature maps
- Interactive layer exploration
- Dynamic feature map rendering
- Modern and intuitive user interface
- Built with Next.js and TypeScript for optimal performance

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (v9 or higher)

## Getting Started

1. Clone the repository:

```bash
git clone [your-repository-url]
cd cnn_visualizer
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:

```
NEXT_PUBLIC_API_URL=your_backend_api_url
```

4. Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run start` - Runs the production build
- `npm run lint` - Runs ESLint for code quality checks

## Tech Stack

- **Frontend Framework**: Next.js 15.3.1
- **Language**: TypeScript
- **UI Components**: React 19
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Canvas Rendering**: Konva.js
- **Flow Visualization**: @xyflow/react

## Project Structure

```
cnn_visualizer/
├── app/              # Next.js app directory
├── components/       # React components
├── hooks/           # Custom React hooks
├── libs/            # Utility functions and libraries
├── public/          # Static assets
├── stores/          # State management
└── types/           # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
