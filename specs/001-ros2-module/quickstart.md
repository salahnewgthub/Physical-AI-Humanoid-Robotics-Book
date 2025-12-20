# Quickstart Guide: Physical AI & Humanoid Robotics Book

## Prerequisites

- Node.js v18 or higher
- npm or yarn package manager
- Git
- Basic knowledge of Markdown and JavaScript (helpful but not required)

## Setup Instructions

### 1. Clone and Initialize
```bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Install dependencies
npm install
# OR
yarn install
```

### 2. Start Development Server
```bash
# Start the development server
npm start
# OR
yarn start

# This will start the server at http://localhost:3000
```

### 3. Project Structure Overview
```
docs/
├── docs/                 # Documentation content
│   ├── module-1/         # Module 1 content
│   │   ├── chapter-1-ros2-foundations.md
│   │   └── chapter-2-python-ai-control.md
│   └── ...
├── src/                  # Custom components and pages
├── static/               # Static assets
├── docusaurus.config.js  # Site configuration
├── sidebars.js           # Navigation sidebar
└── package.json          # Project dependencies
```

### 4. Adding New Content
```bash
# Create a new markdown file in the appropriate module directory
# Example: docs/docs/module-1/new-chapter.md

# Update the sidebar configuration in sidebars.js
```

### 5. Build for Production
```bash
# Build the static site
npm run build
# OR
yarn build

# The output will be in the build/ directory
```

### 6. Deploy
```bash
# Deploy to GitHub Pages (if configured)
npm run deploy
# OR
yarn deploy
```

## Key Configuration Files

- `docusaurus.config.js`: Main site configuration (title, theme, plugins)
- `sidebars.js`: Navigation structure and organization
- `src/css/custom.css`: Custom styling overrides
- `static/`: Images, documents, and other static assets

## Content Creation Guidelines

1. Use Docusaurus-compatible Markdown
2. Include proper frontmatter in each document
3. Follow the established module/chapter structure
4. Keep code examples minimal and illustrative
5. Ensure content is accessible to Python developers with no ROS experience