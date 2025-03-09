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

![image](https://github.com/user-attachments/assets/a90a9159-f7cf-4985-b978-88742d512555)

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
- **Unsloth** - For finetuning the llama3-8b and tinyllama model.

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
├── Model_Containers/
|   ├── docker-compose.yml
|   ├── Dockerfile        # Scripts to run the models in containers
└── README.md
```

## Hugging face
``` sh
https://huggingface.co/XoXoHarsh
```

## How to run

``` sh
git clone https://github.com/XoXoHarsh/Hackdata-2025.git
```

## Chat_Server

```sh
pip install -r requirements.txt
pyhton app.py
```
### Traning Scripts
```sh
Datasets: The project includes four datasets—Classification_dataset.csv, diet_dataset.csv, excercise_dataset.csv, and stress_dataset.csv—used for training and classification.

Notebooks: Finetuning.ipynb consolidates multiple scripts for fine-tuning, and classification.ipynb handles text classification.
```

## LIfeStyle_App
``` sh
npm i
npx expo start
```
### env
```sh
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY
EXPO_PUBLIC_API_URL=YOUR_PUBLIC_API__URL
EXPO_PUBLIC_CHAT_SERVER=YOUR_PUBLIC_CHAT_SERVER_URL
```

## MIMIC SERVER

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [MongoDB](https://www.mongodb.com/) (Use MongoDB Atlas or local installation)

``` sh
cd Mimic_Server
cd src
nodemon index.js
````
## env
``` sh
PORT=8000
MONGODB_URI= YOUR_MONGODB_URL
ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET
ACCESS_TOKEN_EXPIRY=2d
```
## App Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/afbc6bd7-1c88-4e90-bbe0-c80aa89747e1" width="45%" style="margin-right: 10px;">
  <img src="https://github.com/user-attachments/assets/ec03388b-8c5d-4712-89eb-793466d337cb" width="45%">
</p>








