# 'https://api.openai.com/v1/chat/completions',
# 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
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import openai
from dotenv import load_dotenv
import os

app = Flask(__name__)
dotenv_path = '/var/www/html/nicholas_graham/.env'  # Specify your .env file path here
load_dotenv(dotenv_path)
CORS(app)  # Enable CORS for all routes

openai_api_key = os.getenv('OPENAI_API_KEY')
openai.api_key = openai_api_key

def read_text_from_file(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return file.read()



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/overview')
def overview():
    return render_template('overview.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.json['user_input']

    # Read the context from a text file
    context = read_text_from_file("/var/www/html/nicholas_graham/static/files/info.txt")
    
    messages = [
        {"role": "system", "content": "You are an AI assistant answering questions about Nicholas Graham, here is useful information about him:" + context},
        {"role": "user", "content": user_input}
    ]

    # Call the OpenAI GPT-3 API with the chat endpoint
    openai.api_key = openai_api_key
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=250
    )

    return response.choices[0].message['content'].strip()


if __name__ == '__main__':
    app.run()
