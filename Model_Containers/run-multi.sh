#!/bin/bash
set -e

# Create necessary directories
mkdir -p ./models/model1 ./models/model2 ./models/model3 ./models/model4

# Parse command line arguments for model names
# Format: ./run-multi.sh model1_name model2_name model3_name model4_name

# Set defaults and overrides from command line
MODEL1_NAME=${1:-"XoXoHarsh/diet-assistant-llama3"}
MODEL2_NAME=${2:-"XoXoHarsh/stress-assistant-llama3"}
MODEL3_NAME=${3:-"XoXoHarsh/exercise-assistant-llama3"}
# MODEL4_NAME=${4:-"XoXoHarsh/diet-assistant-llama3"}

# Set environment variables for docker-compose
export MODEL1_NAME=$MODEL1_NAME
export MODEL2_NAME=$MODEL2_NAME
export MODEL3_NAME=$MODEL3_NAME
# export MODEL4_NAME=$MODEL4_NAME

# Create helpful local names based on the repository names
export MODEL1_LOCAL_NAME=$(basename $MODEL1_NAME)
export MODEL2_LOCAL_NAME=$(basename $MODEL2_NAME)
export MODEL3_LOCAL_NAME=$(basename $MODEL3_NAME)
# export MODEL4_LOCAL_NAME=$(basename $MODEL4_NAME)

# Set quantization types (you can modify these or add command line args for them)
export MODEL1_TYPE="q4_k_m"
export MODEL2_TYPE="q4_k_m"
export MODEL3_TYPE="q4_k_m"
# export MODEL4_TYPE="q4_k_m"

echo "Starting Docker containers with the following models:"
echo "Model 1: $MODEL1_NAME (as $MODEL1_LOCAL_NAME) on port 11434"
echo "Model 2: $MODEL2_NAME (as $MODEL2_LOCAL_NAME) on port 11435"
echo "Model 3: $MODEL3_NAME (as $MODEL3_LOCAL_NAME) on port 11436"
# echo "Model 4: $MODEL4_NAME (as $MODEL4_LOCAL_NAME) on port 11437"

# Start the containers
docker-compose up -d

echo "All containers started!"
echo
echo "You can access the models at:"
echo "Model 1: http://localhost:11434"
echo "Model 2: http://localhost:11435"
echo "Model 3: http://localhost:11436"
# echo "Model 4: http://localhost:11437"
echo
echo "Example API call for Model 1:"
echo "curl http://localhost:11434/api/chat -d '{\"model\":\"$MODEL1_LOCAL_NAME\",\"messages\":[{\"role\":\"user\",\"content\":\"What are healthy breakfast options?\"}]}'"
echo
echo "To check container logs:"
echo "docker-compose logs -f"