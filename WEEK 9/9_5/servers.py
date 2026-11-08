# Every MCP server the agent can use
import os
import sys
from dotenv import load_dotenv

load_dotenv()
tavily_api_key = os.getenv("TAVILY_API_KEY")

STDIO = os.path.join(
    os.path.dirname(__file__),
    "server",
    "stdio"
)

SERVERS = {
    # Local server: the client starts it for you
    "random_number": {
        "command": sys.executable,
        "args": [
            os.path.join(STDIO, "random_number.py")
        ],
        "transport": "stdio",
    },

    # HTTP server: start it yourself first
    "roll_dice": {
        "url": "http://localhost:8000/mcp",
        "transport": "streamable_http",
    },

    # Remote server: Tavily web search
    "tavily": {
        "url": "https://mcp.tavily.com/mcp/",
        "transport": "streamable_http",
        "headers": {
            "Authorization": f"Bearer {tavily_api_key}"
        },

    # Your own Postgress server: read-only, started by the client
    "postgres": {
        "command": sys.executable,
        "args": [os.path.join(STDIO, "postgres_server.py")],
        "transport": "stdio",
    }
    },
}
