import os
import sys
from dotenv import load_dotenv

load_dotenv()

# Get Tavily API key from .env
tavily_api_key = os.getenv("TAVILY_API_KEY")

if not tavily_api_key:
    raise ValueError(
        "TAVILY_API_KEY is missing. Please check your .env file."
    )

# Path to local MCP servers
STDIO = os.path.join(
    os.path.dirname(__file__),
    "server",
    "stdio"
)

# Every MCP server the agent can use
SERVERS = {
    # Local server
    "random_number": {
        "command": sys.executable,
        "args": [
            os.path.join(STDIO, "random_number.py")
        ],
        "transport": "stdio",
    },

    # HTTP server
    "roll_dice": {
        "url": "http://localhost:8000/mcp",
        "transport": "streamable_http",
    },

    # Remote Tavily MCP server
    "tavily": {
        "url": "https://mcp.tavily.com/mcp/",
        "transport": "streamable_http",
        "headers": {
            "Authorization": f"Bearer {tavily_api_key}"
        },
    },
}
