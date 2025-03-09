FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Install required dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    ca-certificates \
    gnupg \
    lsb-release \
    git \
    python3 \
    python3-pip \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://ollama.com/install.sh | sh

# Set the default shell
SHELL ["/bin/bash", "-c"]

# Copy a script to print environment variables
COPY print_env.sh /print_env.sh
RUN chmod +x /print_env.sh

# Expose Ollama's default port
EXPOSE 11434

# Run the script when the container starts
CMD ["/print_env.sh"]