# LifeStyle – AI-Powered Scalable Health Assistant

*A lightweight, scalable AI chatbot for proactive health and lifestyle management.*

## Project Overview

LifeStyle is an AI-powered mobile application designed to seamlessly integrate healthcare and lifestyle management.  
Instead of relying on large, resource-intensive LLMs, it uses multiple small, fine-tuned LLMs, each specialized in:  

- Exercise & Fitness
- Mental Well-being  
- Diet & Nutrition  
- General Questions

The chatbot efficiently routes queries to the appropriate LLM using a classifier, making responses faster, accurate, and more affordable.  

![diagram-export-3-9-2025-12_07_38-AM](https://github.com/user-attachments/assets/8aba931d-8cb8-4729-8662-46afe71a580d)

### Key Features

- **Lightweight and fast** – Uses small, task-specific LLMs instead of massive AI models.
- **Scalable microservices architecture** – Built with FastAPI and Docker.
- **Real time Alerts** - Real time alerts to get you to stop from over using unhealthy apps.

---

## Tech Stack  

### Frontend (Mobile App) – React Native

- **React Native (TypeScript)** – Cross-platform mobile framework  
- **Expo (TypeScript)** – Simplifies React Native development
- **StyleSheets** - To style the components.

### Backend – Python (FastAPI + Microservices)

- **FastAPI** – High-performance API framework  
- **Docker** – To run Containerized model
- **Node** - Authentication and metric collection
- **FireBase FCM** - Real time notifications and alerts

### AI & Machine Learning

- **Ollama** – Running small LLMs locally  
- **Fine-tuned llama3-8b** – Custom-trained on health topics
- **Unsloth** - For finetuning the llama3 model.

---

## Project Structure

```bash
Hackdata-2025
├── LifeStyle_App/          # React Native mobile app
│   ├── app/
│   ├── assets/
│   ├── utils/
│   ├── cache.ts
│   ├── package.json
│   ├── ...
├── Chat_Server/            # FastAPI Server
│   ├── Datasets/           # Synthectic Datasets used to fine-tune the models 
│   ├── Training_Scripts/   # Scripts used to train models
│   ├── app.py              # Main file to start the fastapi server
│   ├── requirements.txt
│   ├── ...
├── Mimic_Server/           # A server to handle stuff like a normal healthapp server
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── app.js
│   │   ├── index.js        # Main file to start node server
│   │   ├── ...
│   ├── package.json
│   ├── ...
└── README.md
```

## How to run

Coming Soon
