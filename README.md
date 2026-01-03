# Government AI Chatbot (Backend)

A TypeScript Express backend that integrates LangChain with an Ollama-based LLM, Google OAuth authentication, and MongoDB-based user storage and memory for chat conversations.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Running](#running)
- [API](#api)
- [Architecture](#architecture)
- [LangChain & LLM](#langchain--llm)
- [Memory](#memory)
- [Troubleshooting](#troubleshooting)
- [Development & Testing](#development--testing)
- [Contributing](#contributing)
- [License](#license)

---

## Quick Start ✅

Prerequisites:
- Node.js (recommend 18+)
- MongoDB instance (local or remote)
- Optional: Ollama service if using a local model (or remote Ollama endpoint)

Install:

```bash
npm install
```

Create a `.env` file in the project root (see variables below).

Run in development:

```bash
# start server in dev mode
npx ts-node-dev src/server.ts
```

The server listens by default on port 4000 (or `PORT` env var).

---

## Environment Variables (required) ⚙️

Create a `.env` file with these values:

```
PORT=4000
MONGO_URI=mongodb://...         # MongoDB connection string
JWT_SECRET=your_jwt_secret     # used for auth tokens
OLLAMA_BASE_URL=http://localhost:11434  # optional, default used in config
OLLAMA_MODEL=qwen3             # optional, default used in config
```

Notes:
- The server will throw an error at startup if `MONGO_URI` is missing.
- `JWT_SECRET` must be set for authentication and token signing.

### Provisioning MongoDB & Google OAuth (quick steps)

MongoDB (Atlas) quick guide:
1. Sign up at https://www.mongodb.com/cloud/atlas and create a free cluster.
2. Create a database user and password (under Database Access).
3. In Network Access, add your development IP (or 0.0.0.0/0 for testing).
4. Get the connection string from "Connect" → "Connect your application" and set it as `MONGO_URI` in `.env`.

Google OAuth quick guide:
1. Go to https://console.cloud.google.com/apis/credentials and create an OAuth 2.0 Client ID.
2. Configure the authorized origins / redirect URIs as needed for your front-end.
3. Use the ID token from the client to call `POST /api/auth/google` (server verifies via Google's tokeninfo endpoint).

If you want, I can add step-by-step screenshots or an automated script to provision a test Atlas cluster for the hackathon.

---

## Running

Development (watch):

```bash
npx ts-node-dev src/server.ts
```

Build & run:

```bash
npx tsc
node dist/server.js
```

Add helpful npm scripts to `package.json` if desired (e.g., `dev`, `build`, `start`).

---

## API 📡

All endpoints are prefixed with `/api`.

### POST /api/auth/google

Authenticate a user using the Google ID token.

Request body:
```json
{ "idToken": "<google-id-token>" }
```

Response:
```json
{ "token": "<jwt>", "user": { ... } }
```

### POST /api/chat

Requires Authorization header: `Bearer <token>`

Request body:
```json
{ "input": "Hello" }
```

Response:
```json
{ "response": "<ai text>" }
```

Sample curl (chat):
```bash
curl -X POST http://localhost:4000/api/chat \
  -H "Authorization: Bearer <jwt>" \
  -H "Content-Type: application/json" \
  -d '{ "input": "Hello" }'
```

### User profile

- `GET /api/user/me` — returns current user (requires Authorization header)
- `POST /api/user/profile` — update profile fields (requires Authorization header)

---

## Architecture & Key Components 🔧

src/ (main code)

- `app.ts` — Express app setup
- `server.ts` — Startup, DB connection
- `routes.ts` — Registers route modules

config/
- `env.ts` — loads .env
- `db.ts` — connects to MongoDB
- `oauth.ts` — Google token verification
- `ollama.ts` — Ollama model & base URL config

langchain/
- `llm.ts` — Chat model (Ollama)
- `prompts.ts` — `ChatPromptTemplate` definitions
- `chains.ts` — chain composition (runnable sequence)

modules/
- `auth/` — google login, JWT creation
- `chat/` — controller, service (chat logic)
- `memory/` — short-term & long-term memory implementations
- `user/` — Mongoose `User` model + profile endpoints

middleware/
- `auth.middleware.ts` — extracts & verifies JWT from header

---

## LangChain & LLM 💬

This project uses `@langchain/core` and `@langchain/community` with an `Ollama` chat model configured in `src/langchain/llm.ts`.

Prompts are defined in `src/langchain/prompts.ts` using `ChatPromptTemplate.fromMessages` and expect `user_name` and `user_age` variables.

---

## Memory

- **Short-term memory** is persisted to MongoDB in the `ShortTermMessage` collection. Short-term messages (chat history) are stored per user and used by LangChain in the conversation chain. The implementation lives in `src/modules/memory/shortTerm.memory.ts` and the Mongoose model in `shortTerm.model.ts`.

- **Long-term memory** is stored on the `User` document under `longTermMemory.chatSummaries` and is appended with brief conversation summaries after each chat (see `src/modules/memory/longTerm.memory.ts`).

---

## Troubleshooting ⚠️

- "Missing value for input variable `user_name`": ensure `chatPrompt.formatMessages()` is called with `user_name`/`user_age` (not `name`/`age`).
- DB connection errors: verify `MONGO_URI` and network access.
- JWT errors: verify `JWT_SECRET` is set and tokens are valid.

---

## Development & Testing 🧪

- TypeScript is configured with `strict: true` (see `tsconfig.json`).
- Add tests and a test runner (e.g., Jest) as needed.
- Consider adding npm scripts to simplify dev flow (e.g., `dev`, `lint`, `test`).

---

## Contributing

Contributions are welcome. Please open an issue or PR describing your change.

---

## License

This project uses the `ISC` license (see `package.json`).

---

If you'd like, I can also:

- Add `dev`/`build` scripts to `package.json`.
- Add an example Postman collection or OpenAPI spec for endpoints.
- Extend README with design diagrams or memory model details.

Tell me which additions you'd like next and I'll update the README. ✨