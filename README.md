# Physical AI & Humanoid Robotics Book

This repository contains the source code and documentation for the Physical AI & Humanoid Robotics book, a comprehensive guide that explores how artificial intelligence connects to humanoid robot bodies through middleware systems like ROS 2, enabling sensing, decision-making, and actuation.

## About This Book

This book is designed for AI engineers and Python developers who are new to robotics and ROS 2. Each module builds upon the previous to provide a solid foundation in connecting AI intelligence to physical robot systems.

### Modules

- **Module 1**: The Robotic Nervous System (ROS 2) - Understanding ROS 2 as middleware connecting AI to humanoid robot bodies

## Technology Stack

- **Framework**: Docusaurus v3.x
- **Language**: Markdown for documentation, Python examples
- **Middleware**: ROS 2 (Robot Operating System 2)
- **Target Audience**: AI engineers and Python developers new to robotics

## Setup Instructions

### Prerequisites

- Node.js v18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Physical-AI-Humanoid-Robotics-Book
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm start
```

This will start a local development server and open the documentation in your default browser at `http://localhost:3000`.

### Building for Production

To build the static site:

```bash
npm run build
```

The built site will be available in the `build/` directory and can be deployed to any static hosting service.

### Project Structure

```
Physical-AI-Humanoid-Robotics-Book/
├── docs/                 # Documentation content
│   ├── intro.md          # Introduction page
│   └── module-1/         # Module 1 content
│       ├── chapter-1-ros2-foundations.md
│       └── chapter-2-python-ai-control.md
├── src/                  # Custom React components and pages
│   └── pages/
│       └── index.js      # Home page redirect
├── static/               # Static assets
├── docusaurus.config.js  # Docusaurus configuration
├── sidebars.js           # Navigation sidebar configuration
├── package.json          # Project dependencies and scripts
└── README.md             # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Docusaurus](https://docusaurus.io/)
- Focuses on ROS 2 as the middleware for connecting AI to humanoid robots
- Designed for Python developers new to robotics
