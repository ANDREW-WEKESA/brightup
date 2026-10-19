# Third-Party Licenses and Attributions

BrightUp uses open-source libraries and resources. This document provides attribution and license information for these dependencies.

---

## Runtime Dependencies

### Backend (Server)

#### Express
- **License:** MIT
- **Copyright:** TJ Holowaychuk and contributors
- **Purpose:** Web application framework
- **URL:** https://expressjs.com/

#### Mongoose
- **License:** MIT
- **Copyright:** Automattic
- **Purpose:** MongoDB object modeling
- **URL:** https://mongoosejs.com/

#### bcryptjs
- **License:** MIT
- **Copyright:** Nevarez dcodeIO
- **Purpose:** Password hashing
- **URL:** https://github.com/dcodeIO/bcrypt.js

#### jsonwebtoken
- **License:** MIT
- **Copyright:** Auth0
- **Purpose:** JWT authentication
- **URL:** https://github.com/auth0/node-jsonwebtoken

#### cors
- **License:** MIT
- **Copyright:** Troy Goode
- **Purpose:** Cross-origin resource sharing
- **URL:** https://github.com/expressjs/cors

#### dotenv
- **License:** BSD-2-Clause
- **Copyright:** Scott Motte
- **Purpose:** Environment variable management
- **URL:** https://github.com/motdotla/dotenv

#### express-rate-limit
- **License:** MIT
- **Copyright:** Nathan Friedly
- **Purpose:** API rate limiting
- **URL:** https://github.com/nfriedly/express-rate-limit

#### helmet
- **License:** MIT
- **Copyright:** Adam Baldwin and contributors
- **Purpose:** Security headers
- **URL:** https://helmetjs.github.io/

### Frontend (Client)

#### React
- **License:** MIT
- **Copyright:** Facebook, Inc. and contributors
- **Purpose:** UI library
- **URL:** https://reactjs.org/

#### React Router
- **License:** MIT
- **Copyright:** Remix Software Inc.
- **Purpose:** Client-side routing
- **URL:** https://reactrouter.com/

#### Axios
- **License:** MIT
- **Copyright:** Matt Zabriskie
- **Purpose:** HTTP client
- **URL:** https://axios-http.com/

#### Vite
- **License:** MIT
- **Copyright:** Evan You
- **Purpose:** Build tool and dev server
- **URL:** https://vitejs.dev/

#### Lucide React
- **License:** ISC
- **Copyright:** Lucide Contributors
- **Purpose:** Icon library
- **URL:** https://lucide.dev/

---

## Development Dependencies

### Testing

#### Jest
- **License:** MIT
- **Copyright:** Facebook, Inc.
- **Purpose:** JavaScript testing framework
- **URL:** https://jestjs.io/

#### Vitest
- **License:** MIT
- **Copyright:** Anthony Fu
- **Purpose:** Vite-native testing framework
- **URL:** https://vitest.dev/

#### React Testing Library
- **License:** MIT
- **Copyright:** Kent C. Dodds
- **Purpose:** React component testing
- **URL:** https://testing-library.com/

#### Supertest
- **License:** MIT
- **Copyright:** TJ Holowaychuk
- **Purpose:** HTTP assertions
- **URL:** https://github.com/visionmedia/supertest

### Code Quality

#### ESLint
- **License:** MIT
- **Copyright:** Nicholas C. Zakas and contributors
- **Purpose:** JavaScript linting
- **URL:** https://eslint.org/

#### Prettier
- **License:** MIT
- **Copyright:** James Long and contributors
- **Purpose:** Code formatting
- **URL:** https://prettier.io/

---

## Infrastructure

### MongoDB
- **License:** Server Side Public License (SSPL)
- **Purpose:** Database
- **URL:** https://www.mongodb.com/

### Node.js
- **License:** MIT
- **Copyright:** Node.js contributors
- **Purpose:** Runtime environment
- **URL:** https://nodejs.org/

### Nginx
- **License:** 2-clause BSD license
- **Copyright:** Igor Sysoev and Nginx, Inc.
- **Purpose:** Web server and reverse proxy
- **URL:** https://nginx.org/

### Docker
- **License:** Apache 2.0
- **Copyright:** Docker, Inc.
- **Purpose:** Containerization
- **URL:** https://www.docker.com/

---

## Third-Party Services

### Google OAuth 2.0
- **Terms:** https://developers.google.com/terms
- **Purpose:** Authentication
- **Provider:** Google LLC

### Google Analytics
- **Terms:** https://marketingplatform.google.com/about/analytics/terms/
- **Purpose:** Usage analytics
- **Provider:** Google LLC

### Stripe
- **Terms:** https://stripe.com/legal
- **Purpose:** Payment processing
- **Provider:** Stripe, Inc.

---

## Fonts and Icons

### System Fonts
- Uses system-native fonts (Inter, SF Pro, Segoe UI, Roboto)
- No additional licensing required

### Lucide Icons
- **License:** ISC
- **Copyright:** Lucide Contributors
- **URL:** https://lucide.dev/license

---

## Educational Content

### Computer Science Terminology
The definitions and educational content in BrightUp are:
- Original works created by our team
- Derived from public domain sources
- Synthesized from standard CS textbooks and curricula
- Reviewed and verified for accuracy

**Sources include:**
- Introduction to Algorithms (CLRS)
- Computer Networks (Tanenbaum)
- Operating System Concepts (Silberschatz)
- The Pragmatic Programmer
- Various online educational resources (Wikipedia, MDN, etc.)

All content is used for educational purposes under fair use principles.

---

## License Compliance

BrightUp complies with all applicable open-source licenses:

### MIT License Terms
Permission is granted to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies, with the condition that the license notice and copyright notice are included.

### BSD License Terms
Redistribution requires including the copyright notice and disclaimer.

### Apache 2.0 License Terms
Requires including the NOTICE file and license in distributions.

### SSPL (MongoDB)
Used in compliance with terms for application use.

---

## Disclaimer

This attribution list is provided in good faith but may not be exhaustive. If you believe any attribution is missing or incorrect, please contact us at legal@brightup.com.

---

## Full License Texts

Full license texts for all dependencies can be found in:
- `node_modules/[package]/LICENSE` files
- Individual package repositories
- Package.json license fields

---

**Last Updated:** January 19, 2026

---

## How to View Package Licenses

### Server Dependencies
```bash
cd server
npm list --depth=0
npm view <package-name> license
```

### Client Dependencies
```bash
cd client
npm list --depth=0
npm view <package-name> license
```

---

Thank you to all open-source contributors who make BrightUp possible! 🎉
