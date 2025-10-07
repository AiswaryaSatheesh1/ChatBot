from transformers import AutoModelForCausalLM, AutoTokenizer

# Load model once
tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-small")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-small")

# Function to get AI response
def get_ai_reply(user_message: str) -> str:
    # Add end-of-sequence token
    input_text = user_message + tokenizer.eos_token

    # Convert text to tokens
    input_ids = tokenizer.encode(input_text, return_tensors="pt")

    # Generate model output
    output_ids = model.generate(
        input_ids,
        max_length=50,
        pad_token_id=tokenizer.eos_token_id
    )

    # Decode tokens back to text
    reply = tokenizer.decode(output_ids[0], skip_special_tokens=True)
    return reply
