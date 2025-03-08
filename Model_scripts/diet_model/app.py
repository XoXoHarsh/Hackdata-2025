from unsloth import FastLanguageModel
from transformers import TextStreamer, AutoTokenizer

def main():
    # Load the model and tokenizer
    model_path = "/lora_model"  # Replace with the actual path to your saved model
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name=model_path,
        max_seq_length=2048,
        dtype=None,  # or torch.float32 for CPU
        load_in_4bit=True,  # Adjust if your model wasn't saved in 4-bit
    )
    
    # Remove or comment out the following line to enable CPU usage.
    # model.to('cuda')  
    
    FastLanguageModel.for_inference(model)  # Enable native 2x faster inference

    # Get user input
    user_input = input("Enter your question: ")

    # Prepare the input for the model
    messages = [{"role": "user", "content": user_input}]
    input_ids = tokenizer.apply_chat_template(
        messages, add_generation_prompt=True, return_tensors="pt"
    )  # Remove .to("cuda") for CPU

    # Generate response
    text_streamer = TextStreamer(tokenizer, skip_prompt=True)
    _ = model.generate(
        input_ids,
        streamer=text_streamer,
        max_new_tokens=128,
        pad_token_id=tokenizer.eos_token_id,
    )

if __name__ == "__main__":
    main()