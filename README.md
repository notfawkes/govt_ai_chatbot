# Government AI Chatbot (Backend)

A TypeScript Express backend that integrates LangChain with an Ollama-based LLM, Google OAuth authentication, and MongoDB-based user storage and memory for chat conversations

##Development:
npx ts-node-dev src/server.ts


## API 
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

### User profile

- `GET /api/user/me` — returns current user (requires Authorization header)
- `POST /api/user/profile` — update profile fields (requires Authorization header)

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

## Contributing

Contributions are welcome. Please open an issue or PR describing your change.
