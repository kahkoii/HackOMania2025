# HackOMania 2025 Project

## Project Setup

### Frontend

1. Navigate into frontend directory
   `cd frontend`
2. Install yarn files (make sure you have npm and yarn installed)
   `yarn install`
3. Run application
   `yarn start`

### Backend
1. `cd backend`
2. Setup python environment
   `python -m venv venv`
   `venv\Scripts\activate`
3. Install python libraries
   `pip install -r requirements.txt`
4. Run backend server
   `python main.py`
5. Run Ollama in a Docker Container
`docker run --rm --name ollama -d -p 11434:11434 ollama/ollama`
6. Download LLaVA Inside the Container
`docker exec -it ollama ollama pull llava`

## Instructions

### Installing new Python libraries

Make sure you are already inside the python venv then type
`pip freeze > requirements.txt`

### Team Members

Kah Ho - @kahkoii
Dong Kiat - @dongkiat
Jeya - @appdevin
Tze Xuan - @tze-xuan
