from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
# Initialize the Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Configure the Gemini API
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-pro")

# Instructions for freelancing-specific responses
context_instructions = (
    "You are a freelancing assistant chatbot. Keep responses brief, accurate, and specific to freelancing, "
    "job matching, and client requirements. For any unrelated query, reply with: "
    "\"I'm here to assist with freelancing-related queries only.\" "
)

@app.route('/generate', methods=['POST'])
def generate_response():
    prompt = request.json.get('prompt', '')
    response = model.generate_content(f"{context_instructions} User: {prompt}")

    if response and any(keyword in response.text.lower() for keyword in ['hello', 'hi', 'freelance', 'freelancing', 'client', 'wages', 'salary']):
        formatted_response = {
            "response": response.text.strip()
        }
    else:
        formatted_response = {
            "response": "I'm here to assist with freelancing-related queries only."
        }

    return jsonify(formatted_response)

if __name__ == '__main__':
    app.run(debug=True,port=8000)