def classify_intent(text: str):
    text = text.lower()

    if any(x in text for x in ["i am", "my age", "i'm", "years old"]):
        return "PROFILE_PROVIDE"

    if any(x in text for x in ["change", "update"]):
        return "PROFILE_UPDATE"

    if any(x in text for x in ["scheme", "scholarship", "benefit"]):
        return "SCHEME_RECOMMENDATION"

    return "GENERAL_QUESTION"
