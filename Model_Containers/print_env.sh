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
MODEL_FILE="$MODEL_FILENAME"
wget -O "$MODEL_FILE" "$MODEL_URL"

# Check file size
if [ -f "$MODEL_FILENAME" ]; then
  FILE_SIZE=$(du -h "$MODEL_FILENAME" | cut -f1)
  echo "Download complete. File size: $FILE_SIZE"
  
  # Continue with the rest of your script for Ollama setup
  # ...
  echo "Creating Modelfile..."
    cat > Modelfile << EOF
FROM $MODEL_FILENAME
PARAMETER stop "<|end_of_text|>"
PARAMETER stop "### Instruction:"
PARAMETER temperature 0.7
TEMPLATE """{{ if .System }}{{ .System }}{{ end }}### Instruction:
{{ .Prompt }}

### Response:
"""
EOF

    echo "Model file created"
    echo "Model file content:"
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
    ollama create $MODEL_NAME -f Modelfile

    # Keep the container running
    echo "Model ready for use. Container will keep running."
    echo "You can use: ollama run $MODEL_NAME"
    tail -f /dev/null
else
  echo "Error: Failed to download model"
  exit 1
fi