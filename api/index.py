# This file serves as the entry point for the Vercel serverless function.
# It imports the FastAPI app instance from the main application file.

import sys
import os

# Add the project root to the Python path to allow absolute imports
# like `from com.mhire.app.main import app`.
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from com.mhire.app.main import app
