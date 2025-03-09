#!/bin/bash

# Print environment variables
echo "Environment Variables:"
env

# Extract the filename from the URL
MODEL_FILENAME="unsloth.Q4_K_M.gguf"
echo "Using model filename: $MODEL_FILENAME"

# Download with wget instead of curl for better handling of redirects
echo "Downloading model from Hugging Face..."
echo "URL: $MODEL_URL"
echo "Saving as: $MODEL_FILENAME"

# Try with wget which sometimes handles these downloads better
# MODEL_FILE="$MODEL_FILENAME"
# wget -O "$MODEL_FILE" "$MODEL_URL"

    cat Modelfile

    # Start Ollama service
    echo "Starting Ollama service..."
    ollama serve &
    sleep 3  # Give Ollama a moment to start up

    # Check Ollama version
    echo "Ollama Version:"
    ollama --version

    # Register the model with Ollama
    echo "Creating model in Ollama..."
    echo "Model Name: $MODEL_NAME"
    echo "Model Number: $MODEL_NUMBER"
    echo "./models/model$MODEL_NUMBER/Modelfile"
    pwd
    ls -al
    ollama create test -f "./models/model$MODEL_NUMBER/Modelfile"

    # Keep the container running
    echo "Model ready for use. Container will keep running."
    echo "You can use: ollama run $MODEL_NAME"
    tail -f /dev/null