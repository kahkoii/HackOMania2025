from flask import Flask
from routes.recipe import recipe_bp
from routes.ingredient import ingredient_bp

app = Flask(__name__)
app.register_blueprint(recipe_bp)
app.register_blueprint(ingredient_bp)

if __name__ == '__main__':
    app.run(debug=True)