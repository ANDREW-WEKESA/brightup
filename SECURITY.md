# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in BrightUp, please send an email to:
**security@brightup.app** (or create a private security advisory on GitHub)

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will respond within 48 hours and work with you to address the issue promptly.

## Security Measures

BrightUp implements several security measures:

### Authentication
- Google OAuth 2.0 integration
- Password-based authentication with hashing
- Session management via localStorage
- Protected routes requiring authentication

### Data Protection
- No sensitive data stored server-side
- Client-side encryption for premium status
- HTTPS enforced in production
- CORS configured properly

### Input Validation
- All user inputs sanitized
- SQL injection prevention (no SQL in v1)
- XSS prevention through React's built-in protections
- Rate limiting on API endpoints

### Best Practices
- Dependencies regularly updated
- No hardcoded secrets in code
- Environment variables for sensitive config
- Secure headers in production

## Known Limitations

### V1 Architecture
- localStorage-based auth (not suitable for high-security applications)
- No backend session management
- No email verification
- No password reset flow

These limitations are acceptable for an educational tool but should be addressed before handling sensitive user data.

## Planned Improvements

- [ ] Backend session management with JWT
- [ ] Database for user accounts
- [ ] Password hashing (bcrypt)
- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] Password reset via email
- [ ] Security headers (CSP, HSTS)
- [ ] Regular security audits

## Responsible Disclosure

We follow responsible disclosure practices:
1. You report the vulnerability privately
2. We acknowledge within 48 hours
3. We work together on a fix
4. We release a patch
5. We publicly disclose after users have had time to update

Thank you for helping keep BrightUp secure!
