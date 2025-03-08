FROM debian:bookworm-slim

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Install required dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    vim \
    ca-certificates \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | sh

# Create a directory for the model files
WORKDIR /app

# Copy setup script
COPY setup.sh /app/setup.sh
RUN chmod +x /app/setup.sh

# Set the default model name (can be overridden with --build-arg)
ARG MODEL_NAME="XoXoHarsh/diet-assistant-llama3"
ENV MODEL_NAME=$MODEL_NAME

# Create a directory for our models
RUN mkdir -p /app/models

# Set up the entrypoint
ENTRYPOINT ["/app/setup.sh"]

# Expose the Ollama API port
EXPOSE 11434