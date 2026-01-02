session_memory = {}

def get_session(user_id: str):
    if user_id not in session_memory:
        session_memory[user_id] = {
            "last_intent": None,
            "missing_fields": [],
            "context": {}
        }
    return session_memory[user_id]
