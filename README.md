# Node + Express Service to Send Email

This is a simple API sample in Node.js with express.js to send email using nodemailer.

## Getting Started

First step is to install dependencies.

```sh
npm install
```
and then your setup enviorment with copy dotenv to .env and provide your email credentials.

Server should run automatically when starting a workspace. To run manually, run:
```sh
npm run dev
```
Create request using curl :
```sh
curl -X POST http://localhost:3000/send-email \
-H "Content-Type: application/json" \
-d '{"name": "Receiver Name", "subject": "Email Subject", "email": "email@receiver.com", "message": "Hello There..."}'
```