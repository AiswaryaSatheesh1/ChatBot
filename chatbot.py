import openai
import os

client = openai.OpenAI(api_key= os.getenv("CHATBOT_API_KEY")) 

chat_history = []

print("Welcome to AI Chatbot! Type 'exit' to quit.\n")

while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit"]:
        print("Goodbye! 👋")
        break

    chat_history.append({"role": "user", "content": user_input})

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "system", "content": "You are a helpful assistant."}, *chat_history]
    )

    reply = response.choices[0].message.content
    print(f"AI: {reply}\n")
    chat_history.append({"role": "assistant", "content": reply})
