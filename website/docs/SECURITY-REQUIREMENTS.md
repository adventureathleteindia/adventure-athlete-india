# Security Requirements

## Overview

This document tracks security requirements for the Adventure Athlete India website, particularly for the admin panel when built.

---

## Current Website (Public Pages)

**Status:** Low risk - public marketing content only

**Built-in Protections:**
- Next.js automatic XSS escaping
- React's safe rendering
- Whitelisted image domains in `next.config.ts`

**To Add Before Production:**
- [ ] Content Security Policy (CSP) headers
- [ ] HTTPS enforcement
- [ ] Security headers (X-Frame-Options, X-Content-Type-Options)

---

## Admin Panel Security (MUST HAVE - Future)

### Authentication Gates

| Gate | Purpose | Implementation |
|------|---------|----------------|
| **Login** | Verify identity | Email/password or OAuth (Google) |
| **Session** | Maintain auth state | Secure HTTP-only cookies, short expiry |
| **2FA** | Extra protection | TOTP (Google Authenticator) - recommended |

### Authorization

- Single admin role initially (Atul only)
- Role-based access if team grows later

### Security Checklist for Admin Panel

**Authentication:**
- [ ] Secure password hashing (bcrypt, argon2)
- [ ] Rate limiting on login attempts (prevent brute force)
- [ ] Account lockout after failed attempts
- [ ] Secure session management (HTTP-only, Secure, SameSite cookies)
- [ ] Session timeout (auto-logout after inactivity)

**API Security:**
- [ ] CSRF protection on all mutations
- [ ] Input validation and sanitization
- [ ] SQL injection prevention (use parameterized queries/ORM)
- [ ] Request rate limiting

**Data Protection:**
- [ ] Encrypt sensitive data at rest
- [ ] HTTPS only (TLS 1.3)
- [ ] Secure headers configured
- [ ] No sensitive data in URLs or logs

**Audit & Monitoring:**
- [ ] Login attempt logging
- [ ] Admin action audit trail
- [ ] Error monitoring (without exposing stack traces)

### Recommended Tech Stack for Admin

| Component | Option | Why |
|-----------|--------|-----|
| Auth | NextAuth.js | Built for Next.js, handles sessions securely |
| Database | PostgreSQL + Prisma | Type-safe, prevents SQL injection |
| Hosting | Vercel | Automatic HTTPS, DDoS protection |

### Environment Variables (Never Commit)

```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=     # if using OAuth
GOOGLE_CLIENT_SECRET=
```

---

## Contact Form Security (When Added)

- [ ] CAPTCHA or honeypot (prevent spam)
- [ ] Rate limiting (max submissions per IP)
- [ ] Input sanitization
- [ ] Email validation

---

## Notes

- Keep this document updated as features are added
- Review before each major feature deployment
- Security is not optional - implement all MUST HAVEs before admin goes live
