#!/bin/bash
set -e

# Default values
MODEL_NAME=${MODEL_NAME:-"XoXoHarsh/diet-assistant-llama3"}
OLLAMA_MODEL_NAME=${OLLAMA_MODEL_NAME:-"diet-assistant"}
MODEL_TYPE=${MODEL_TYPE:-"q4_k_m"} # Use q4_k_m for smaller size, q8_0 for better quality

echo "Setting up Diet Assistant with model: $MODEL_NAME"
echo "Will use quantization: $MODEL_TYPE"

# Download the GGUF file from HuggingFace
MODEL_URL="https://huggingface.co/$MODEL_NAME/resolve/main/unsloth.$MODEL_TYPE.gguf"
MODEL_FILE="/app/models/unsloth.$MODEL_TYPE.gguf"

if [ ! -f "$MODEL_FILE" ]; then
    echo "Downloading model from $MODEL_URL..."
    wget -O "$MODEL_FILE" "$MODEL_URL"
    
    # Verify file was downloaded successfully
    if [ ! -f "$MODEL_FILE" ]; then
        echo "Error: Failed to download model file"
        exit 1
    fi
    
    echo "Model downloaded successfully"
else
    echo "Model file already exists, skipping download"
fi

# Create Modelfile
cat > /app/models/Modelfile << EOF
FROM $MODEL_FILE
PARAMETER stop "<|end_of_text|>"
PARAMETER stop "### Instruction:"
PARAMETER temperature 0.7
TEMPLATE """{{ if .System }}{{ .System }}{{ end }}### Instruction:
{{ .Prompt }}

### Response:
"""
EOF

# Create the model in Ollama
echo "Creating model in Ollama..."
cd /app/models
ollama create $OLLAMA_MODEL_NAME -f Modelfile

# Start Ollama server
echo "Starting Ollama server..."
ollama serve