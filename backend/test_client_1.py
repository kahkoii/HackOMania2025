import requests
import json

url1 = "http://127.0.0.1:5000/generate-recipe"
payload1 = {
    "ingredients": ["tomato", "basil", "mozzarella"],
    "textFilter": "I want the dish to be prepared hot."
}

url2 = "http://127.0.0.1:5000/get-ingredient-info"
payload2 = {
    "ingredient": "carrot"
}

headers = {"Content-Type": "application/json"}

response = requests.post(url1, headers=headers, data=json.dumps(payload1))
# response = requests.post(url2, headers=headers, data=json.dumps(payload2))
print(response.json())