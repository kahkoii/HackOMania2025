from flask import Flask
from recipe import recipe_bp

app = Flask(__name__)
app.register_blueprint(recipe_bp)

if __name__ == '__main__':
    app.run(debug=True)