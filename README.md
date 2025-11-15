# Your Node.js DevSecOps Project

This repository hosts a simple Express.js application designed specifically for demonstrating a DevSecOps CI/CD pipeline. The application contains **deliberate security vulnerabilities** to test and validate the effectiveness of various security scanning tools (SAST, SCA, DAST, etc.).

## Deliberate Vulnerabilities Included:

1.  **Static Application Security Testing (SAST) Target:**
    * **Vulnerability:** Cross-Site Scripting (XSS) on the `/hello` endpoint (See `server.js`).
    * **SAST Tool Target:** NJSSCAN is expected to flag this.

2.  **Software Composition Analysis (SCA) Target:**
    * **Vulnerability:** Use of the outdated and vulnerable `lodash@4.17.20` (See `package.json`).
    * **SCA Tool Target:** Trivy is expected to flag this.

## Local Testing

1. Run `npm install`
2. Run `npm run dev`
3. Test XSS: `http://localhost:3000/hello?name=<script>alert('XSS')</script>`