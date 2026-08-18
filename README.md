# SE Learn V3 — Deployment Ready

A mobile-friendly Software Engineering learning app with an Express backend and an AI Tutor endpoint.

## Run locally

1. Install Node.js 18+.
2. Open this project folder in a terminal.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Add your OpenAI API key to `.env`.
6. Run `npm start`.
7. Open `http://localhost:3000`.

## Deploy

Use any Node.js web-service host that supports:
- Node.js 18+
- `npm install`
- `npm start`
- environment variables

Set these environment variables in the host:
- `OPENAI_API_KEY` — your server-side OpenAI API key
- `OPENAI_MODEL` — optional; defaults to `gpt-5.6-luna`
- `PORT` — usually supplied automatically by the host

Do NOT put the API key in `public/index.html` or browser JavaScript.

## Important

The current app stores basic progress in the browser's localStorage. It does not yet have accounts or a server database.

The AI Tutor uses the OpenAI Responses API through the server so the API key is not exposed to the browser.
