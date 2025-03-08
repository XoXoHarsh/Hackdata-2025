# LifeStyle – AI-Powered Scalable Health Assistant
*A lightweight, scalable AI chatbot for proactive health and lifestyle management.*

## Project Overview  
LifeStyle is an AI-powered mobile application designed to seamlessly integrate healthcare and lifestyle management.  
Instead of relying on large, resource-intensive LLMs, it uses multiple small, fine-tuned LLMs, each specialized in:  
- Exercise & Fitness  
- Mental Well-being  
- Diet & Nutrition  
- Sleep Hygiene  
- Social Connectivity  

The chatbot efficiently routes queries to the appropriate LLM using a classifier, making responses faster, accurate, and more affordable.  

![diagram-export-3-9-2025-12_07_38-AM](https://github.com/user-attachments/assets/8aba931d-8cb8-4729-8662-46afe71a580d)

### Key Features  
- **Lightweight and fast** – Uses small, task-specific LLMs instead of massive AI models.   
- **Scalable microservices architecture** – Built with FastAPI and Docker.  


---

## Tech Stack  

### Frontend (Mobile App) – React Native  
- **React Native (TypeScript)** – Cross-platform mobile framework  
- **React Navigation** – Smooth screen transitions  


### Backend – Python (FastAPI + Microservices)  
- **FastAPI** – High-performance API framework  
- **Docker & Kubernetes** – Containerized deployment  

### AI & Machine Learning  
- **Ollama** – Running small LLMs locally  
- **Fine-tuned LLMs** – Custom-trained on health topics  
- **Multi-container LLM Deployment** – Multiple Docker containers for different models  

---

## Project Structure  
```bash
LifeStyle
├── frontend/               # React Native mobile app
│   ├── src/
│   ├── components/
│   ├── screens/
│   ├── api/
│   ├── assets/
│   ├── App.tsx
│   ├── package.json
│   ├── ...
├── backend/                # FastAPI microservices
│   ├── services/
│   │   ├── chatbot/
│   │   ├── user/
│   │   ├── translation/
│   ├── database/
│   ├── main.py
│   ├── requirements.txt
│   ├── ...
├── llm-service/            # Small LLMs & model routing
│   ├── ollama-config/
│   ├── fine-tuning/
│   ├── model-deployment/
├── docker/                 # Docker setup for microservices
│   ├── Dockerfile
│   ├── docker-compose.yml
└── README.md
