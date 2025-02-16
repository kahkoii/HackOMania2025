from flask import Blueprint, request, jsonify
from openai_client import openai_client

recipe_bp = Blueprint('recipe_bp', __name__)

@recipe_bp.route('/generate-recipe', methods=['POST'])
def generate_recipe():
    request_data = request.get_json()
    if not request_data:
        return jsonify({"error": "No JSON payload provided"}), 400

    ingredients = request_data.get("ingredients")
    if not ingredients or not isinstance(ingredients, list):
        return jsonify({"error": "Ingredients must be provided as a list"}), 400

    extra_text = request_data.get("textFilter")

    # prompt = "Generate a recipe using the following ingredients: " + ", ".join(ingredients)
    # if extra_text:
    #     prompt += ". " + extra_text

    prompt = (
        "Generate a recipe using the following ingredients: " + ", ".join(ingredients) + ".\n"
        "If additional text is provided, consider it: " + extra_text + "\n\n"
        "Return the recipe in the following JSON format (and nothing else):\n"
        "{\n"
        '  "title": <string>,\n'
        '  "description": <string>,\n'
        '  "ingredients": [<string>, ...],\n'
        '  "instructions": [\n'
        '       {"title": <string>, "details": <string>},\n'
        "       ...\n"
        "  ]\n"
        "}\n"
        "For example:\n"
        "{\n"
        '  "title": "chicken rice",\n'
        '  "description": "this is a very nice dish",\n'
        '  "ingredients": ["1 chicken", "1 bowl of rice", "1 teaspoon of salt"],\n'
        '  "instructions": [\n'
        '       {"title": "prepare", "details": "prepare the ingredients"},\n'
        '       {"title": "cook", "details": "cook the chicken and rice"},\n'
        '       {"title": "serve", "details": "serve while warm"}\n'
        "  ]\n"
        "}\n"
    )

    messages = [{"role": "user", "content": prompt}]
    # messages = [{"role": "user", "content": "what is 1 + 1"}]

    try:
        recipe = openai_client.text_request(messages, "json_object")
        return jsonify(recipe)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500