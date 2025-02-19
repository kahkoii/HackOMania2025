# HackOMania 2025 Project

## Project Description

Our project is an AI-powered recipe builder, a feature extended from the application -- Kitchen Copilot, targeting leftover ingredients that many households often struggle to clear before the expiry date. This recipe builder is backed by Food Science, where we help users make better-informed meal planning decisions. With an image uploaded/taken, a few potential recipes, specifically in Asian Cuisine (or whatever cuisine they wish) will be AI-generated. This main feature will be complemented with further details of each product explained by Food Science (assisted with AI), e.g. how to extend shelf life of items, or how you can use these nearing end-of-shelf-life items in a creative manner as replacement for ingredients not found locally.

Our solution aims to target the lack of Singapore-contextualisation of the recipes found on Kitchen Copilot, as well as other prominent issues in Singpaore, such as food wastage. Our feature also has potential in adding a social aspect to the application with its extensibility, adding a special touch to Kitchen Copilot.

Video Demo: https://youtu.be/9Rj_Gpe3A3Q

## Project Setup

### Frontend

#### Requirements

- NodeJS version > 20
- Yarn package manager

#### Steps

1. Navigate into frontend directory
   `cd frontend`
2. Install yarn files (make sure you have npm and yarn installed)
   `yarn install`
3. Run application
   `yarn start`

### Backend

#### Requirements

- Docker
- Python version > 3.12
- OpenAPI account API key
  (can be obtained here https://platform.openai.com/settings/organization/api-keys)

#### Steps

1. `cd backend`
2. Setup python environment
   `python -m venv venv`
   `venv\Scripts\activate`
3. Install python libraries
   `python -m pip install -r supporting_files/requirements.txt`
4. Put your OpenAPI key inside the .env.sample file, and remove the `.sample` file extension
5. Run backend server
   `python main.py`
6. Run Ollama in a Docker Container
   `docker run --name ollama -d -p 11434:11434 ollama/ollama`
7. Download LLaVA Inside the Container
   `docker exec -it ollama ollama pull llava`
8. To stop container
   `docker container stop ollama`

## Instructions

### Installing new Python libraries

Make sure you are already inside the python venv then type
`pip freeze > requirements.txt`

### Team Members

Kah Ho - @kahkoii
Dong Kiat - @dongkiat
Jeya - @appdevin
Tze Xuan - @tze-xuan
