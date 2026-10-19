# Contributing to BrightUp

Thank you for considering contributing to BrightUp! This document outlines the process for contributing.

## How Can I Contribute?

### Reporting Bugs
- Use the GitHub issue tracker
- Include detailed steps to reproduce
- Include screenshots if applicable
- Specify your environment (OS, browser, version)

### Suggesting Enhancements
- Use the feature request template
- Explain the current limitation
- Describe your proposed solution
- Consider backwards compatibility

### Adding Content
We welcome contributions of new units and terms!

**Adding a New Unit:**
1. Create a new file in `server/src/data/`
2. Follow the existing unit structure:
```javascript
{
  id: 'unique-id',
  name: 'Course Name',
  description: 'Brief description',
  termCount: XX,
  terms: [
    { term: 'Term', definition: 'What question format definition?' },
    // ...
  ]
}
```
3. Import and add to `units.js`
4. Test locally
5. Submit a pull request

**Term Guidelines:**
- Definitions should be phrased as questions where possible
- Keep definitions concise (under 20 words ideally)
- Ensure accuracy - cite sources if needed
- Avoid duplicates across units

### Code Contributions

**Setup:**
```bash
# Clone the repository
git clone https://github.com/ANDREW-WEKESA/brightup.git
cd brightup

# Install dependencies
cd engine && npm install
cd ../server && npm install  
cd ../client && npm install

# Run tests
cd ../engine && npm test

# Start development servers
cd ../server && npm run dev
cd ../client && npm run dev
```

**Pull Request Process:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages (`git commit -m 'Add some AmazingFeature'`)
6. Push to your fork (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

**Coding Standards:**
- Follow existing code style
- Add comments for complex logic
- Update documentation as needed
- Ensure tests pass
- Keep commits atomic and focused

## Questions?
Feel free to open an issue for questions or clarifications!

## License
By contributing, you agree that your contributions will be licensed under the MIT License.
