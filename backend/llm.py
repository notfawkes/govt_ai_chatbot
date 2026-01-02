import requests

OLLAMA_URL = "http://localhost:12434/api/generate"
MODEL_NAME = "qwen3"

def call_llm(prompt: str):
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.1,
            "top_p": 0.9,
            "num_predict": 400
        }
    }

    r = requests.post(OLLAMA_URL, json=payload, timeout=60)
    r.raise_for_status()
    return r.json()["response"]
