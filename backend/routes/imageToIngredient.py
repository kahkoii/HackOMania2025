from flask import Flask, request, jsonify, Blueprint
from PIL import Image
import base64
import io
import requests
import re

app = Flask(__name__)

OLLAMA_MODEL = "llava"
OLLAMA_URL = "http://localhost:11434/api/generate"

imageToIngredient_bp = Blueprint('imageToIngredient_bp', __name__)


@imageToIngredient_bp.route('/api/ingredients', methods=['POST'])
def get_ingredients():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        # Read and convert image to base64
        image_file = request.files['image']
        image = Image.open(io.BytesIO(image_file.read())).convert("RGB")
        buffered = io.BytesIO()
        image.save(buffered, format="JPEG")
        img_base64 = base64.b64encode(buffered.getvalue()).decode()

        # Ollama API request payload
        payload = {
            "model": OLLAMA_MODEL,
            "prompt": "Extract only the ingredient names from this image. No descriptions, no quantities, no extra text, and no 'possibly'. Output only a comma-separated list.",
            "images": [img_base64],
            "stream": False
        }

        response = requests.post(OLLAMA_URL, json=payload)

        try:
            response_json = response.json()
        except ValueError:
            return jsonify({'error': 'Invalid JSON response from Ollama'}), 500

        response_text = response_json.get("response", "").strip()

        clean_text = re.sub(r'(?i)(in this image|you can identify|following ingredients:)', '',
                            response_text)  # Remove unnecessary phrases
        clean_text = re.sub(r'[-•]', '', clean_text)  # Remove list bullets (-, •)
        clean_text = re.sub(r'\(possibly\)', '', clean_text, flags=re.IGNORECASE)  # Remove "(possibly)"
        clean_text = re.sub(r'\s+', ' ', clean_text).strip()  # Remove extra spaces

        ingredients = [item.strip() for item in clean_text.split(",") if item.strip()]

        return jsonify({'ingredients': ingredients}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
