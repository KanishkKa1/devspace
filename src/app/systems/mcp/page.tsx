import { CodeBlock } from "@/components/ui/CodeBlock";

export default function MCPPage() {
  const codeString = `import json
import logging
from typing import Any, Dict

class FastMCPServer:
    def __init__(self, tools: Dict[str, Any]):
        self.tools = tools
        self.logger = logging.getLogger("mcp")

    def handle_request(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Process incoming MCP JSON-RPC requests."""
        if "method" not in payload:
            return {"error": "Invalid request: missing method"}
            
        tool_name = payload["method"]
        if tool_name not in self.tools:
            return {"error": f"Tool '{tool_name}' not found"}
            
        try:
            self.logger.info(f"Executing tool: {tool_name}")
            result = self.tools[tool_name](**payload.get("params", {}))
            return {"result": result}
        except Exception as e:
            self.logger.error(f"Execution failed: {e}")
            return {"error": str(e)}

# Basic tool definition
def fetch_local_context(file_path: str) -> str:
    with open(file_path, "r") as f:
        return f.read()

server = FastMCPServer({
    "fetch_context": fetch_local_context
})
`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pb-20">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
        Model Context Protocol Server
      </h1>
      <p className="text-slate-600 dark:text-[#cccccc] mb-10 leading-relaxed text-lg">
        A lightweight Python implementation of an MCP server designed to securely expose local file system tools to an LLM running within an orchestration framework.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">The Problem</h2>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-[#cccccc]">
          <p>
            Large Language Models lack direct access to local development environments. Copy-pasting context is inefficient. We need a standardized, minimal-overhead protocol to safely execute structured tool calls locally without exposing a massive attack surface.
          </p>
        </div>
      </section>

      <CodeBlock 
        code={codeString}
        language="python"
        output={'{"id": 1, "jsonrpc": "2.0", "result": "Context fetched successfully..."}'}
      />
    </div>
  );
}
