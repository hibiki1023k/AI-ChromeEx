from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get the API key from the environment variables
api_key = os.getenv('API_KEY')

app = Flask(__name__)

@app.route('/query-gpt', methods=['POST'])
def query_gpt():
    data = request.json
    response = requests.post(
        'OpenAI_API_ENDPOINT',
        headers={'Authorization': f'Bearer {api_key}'},
        json={'prompt': data['prompt'], 'max_tokens': 50}
    )
    return jsonify(response.json())

if __name__ == '__main__':
    app.run()
