import sqlite3

conn = sqlite3.connect("users.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    age INTEGER,
    state TEXT,
    income INTEGER,
    category TEXT,
    occupation TEXT,
    is_student INTEGER,
    preferred_language TEXT
)
""")

conn.commit()

def get_user(user_id: str):
    cursor.execute("SELECT * FROM users WHERE user_id=?", (user_id,))
    row = cursor.fetchone()
    if not row:
        return None
    keys = [d[0] for d in cursor.description]
    return dict(zip(keys, row))

def upsert_user(user_id: str, data: dict):
    existing = get_user(user_id)
    if existing:
        for k, v in data.items():
            if v is not None:
                existing[k] = v
        data = existing

    cursor.execute("""
    INSERT OR REPLACE INTO users VALUES (?,?,?,?,?,?,?,?)
    """, (
        user_id,
        data.get("age"),
        data.get("state"),
        data.get("income"),
        data.get("category"),
        data.get("occupation"),
        int(data.get("is_student", 0)),
        data.get("preferred_language", "en")
    ))
    conn.commit()
