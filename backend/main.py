from fastapi import FastAPI
from schemas import ChatRequest
from db import get_user, upsert_user
from memory import get_session
from intent import classify_intent
from llm import call_llm

app = FastAPI()

@app.post("/chat")
def chat(req: ChatRequest):
    user = get_user(req.user_id)
    session = get_session(req.user_id)

    intent = classify_intent(req.message)
    session["last_intent"] = intent

    # Profile capture (VERY basic for now)
    updates = {}

    if intent == "PROFILE_PROVIDE":
        msg = req.message.lower()
        if "year" in msg:
            age = int("".join(filter(str.isdigit, msg)))
            updates["age"] = age

        if "student" in msg:
            updates["is_student"] = True

        upsert_user(req.user_id, updates)
        return {"reply": "Profile updated successfully."}

    if not user:
        return {
            "reply": "Please tell me your age, state, and occupation to continue."
        }

    # Normal chat via LLM
    prompt = f"""
You are a government scheme chatbot.

User profile:
{user}

User message:
{req.message}

Reply concisely.
"""
    reply = call_llm(prompt)
    return {"reply": reply}
