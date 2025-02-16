import sys
from flask import Blueprint, request, jsonify
from openai_client import openai_client

ingredient_bp = Blueprint('ingredient_bp', __name__)

@ingredient_bp.route('/get-ingredient-info', methods=['POST'])
def get_ingredient_info():
    request_data = request.get_json()
    if not request_data:
        return jsonify({"error": "No JSON payload provided"}), 400

    ingredient = request_data.get("ingredient")
    if not ingredient or not isinstance(ingredient, str):
        return jsonify({"error": "Ingredient must be provided as a string"}), 400
    
    prompt = (
        "Generate ingredient information for " + ingredient + ".\n"
        "When generating food science information, first elaborate on the molecules and chemical reactions that occur when the ingredient is cooked or mixed with other ingredients. "
        "Then elaborate on its effect on appearance, smell, taste and nutrition. Provide details on what exactly is the nutritional value.\n"
        "Return the ingredient info in the following JSON format (and nothing else):\n"
        "{\n"
        '    "category": <string>,\n' 
        '    "description": <string>,\n'
        '    "foodScience": <string>,\n'
        '    "nutrition": {\n'
        '         "<string>": <string>,\n'
                  "...\n"
        "    },\n"
        '    "alternatives": [\n'
        '         {"title": <string>, "details": <string>},\n'
        "         ...\n"
        "    ],\n"
        '    "preservation": [\n'
        '         {"title": <string>, "details": <string>},\n'
        "         ...\n"
        "    ]\n"
        "}\n"
        "For example:\n"
        "{\n"
        '    "category": "vegetable",\n'
        '    "description": "a carrot is vegetable that is normally orange and long",\n'
        '    "foodScience": "a carrot contains the molecules… and when mixed with, it will produce certain flavours and smells",\n'
        '    "nutrition": {\n'
        '         "calories": 50g,\n'
        '         "protein": 50g,\n'
        '         "sodium": 50g\n'
        "    },\n"
        '    "alternatives": [\n'
        '         {"title": "turnip", "details": "turnips can make a good replacement for carrots, especially when cooked to help emphasize their sweeter flavors"},\n'
        '         {"title": "rutabaga", "details": "rutabaga can make a good replacement for carrots, especially when cooked to help emphasize their sweeter flavors"}\n'
        "    ],\n"
        '    "preservation": [\n'
        '         {"title": "store in fridge", "details": "the coldness of the fridge will"},\n'
        '         {"title": "store in pantry", "details": "if still, the pantry is fine"}\n'
        "    ]\n"
        "}\n"
    )

    messages = [{"role": "user", "content": prompt}]

    try:
        ingredient_info = openai_client.text_request(messages, "json_object")
        print(ingredient_info, file=sys.stderr)
        return jsonify(ingredient_info)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500