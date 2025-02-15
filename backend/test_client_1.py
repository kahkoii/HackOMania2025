import requests
import json

url = "http://127.0.0.1:5000/generate-recipe"
payload = {
    "ingredients": ["tomato", "basil", "mozzarella"],
    "textFilter": "I want the dish to be prepared hot."
}
headers = {"Content-Type": "application/json"}

response = requests.post(url, headers=headers, data=json.dumps(payload))
print(response.json())