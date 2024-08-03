from dotenv import load_dotenv
import os

load_dotenv()  # Take environment variables from .env.

from backend import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)