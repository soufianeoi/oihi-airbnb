# Contributing to Oihi AirBNB

Thank you for your interest in contributing! Every contribution helps make this project better.

## How to Contribute

### 1. Fork the Repository
```bash
git clone https://github.com/soufianeoi/oihi-airbnb.git
cd oihi-airbnb
```

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/add-dark-mode` - New features
- `fix/map-not-loading` - Bug fixes
- `docs/update-readme` - Documentation
- `refactor/optimize-search` - Code improvements

### 3. Make Your Changes
- Follow the existing code style
- Add JSDoc comments to new functions
- Keep commits atomic and message clear

### 4. Test Your Changes
```bash
# Backend
cd oihi-airbnb-backend
npm install
node server.js

# Frontend (new terminal)
cd oihi-airbnb-frontend
npm install
npm start
```

### 5. Commit & Push
```bash
git add .
git commit -m "feat: add dark mode toggle"
git push origin feature/your-feature-name
```

### 6. Open a Pull Request
- Go to the original repo on GitHub
- Click "New Pull Request"
- Select your branch
- Describe what you changed and why

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Google Maps API key (for Maps features)

### Environment Variables
```bash
# Backend
cp oihi-airbnb-backend/.env.example oihi-airbnb-backend/.env
# Edit .env with your API keys

# Frontend
cp oihi-airbnb-frontend/.env.example oihi-airbnb-frontend/.env
# Edit .env with your API keys
```

## Code Style

### JavaScript
- Use `const`/`let`, never `var`
- Use arrow functions for callbacks
- Destructure when possible
- Add JSDoc to every function

### React Components
- One component per file
- Use hooks for state management
- Extract logic to custom hooks
- Use barrel exports (index.js)

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance

## Reporting Issues

When reporting bugs, please include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Screenshots (if applicable)
5. Your environment (OS, browser, Node version)

## Feature Requests

Open an issue with:
- Clear title
- Description of the feature
- Use cases
- Possible implementation ideas

## Code of Conduct

Be respectful, inclusive, and constructive. We're here to learn and build together.

## Questions?

Open a discussion or reach out at hello@oihi-airbnb.com