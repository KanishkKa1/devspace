import { CodeBlock } from "@/components/ui/CodeBlock";

export default function LangGraphPage() {
  const codeString = `from langgraph.graph import StateGraph, END
from typing import TypedDict, List

class AgentState(TypedDict):
    task: str
    code: str
    errors: List[str]

def generate_code(state: AgentState):
    """Generates initial code based on task."""
    print("Generating code...")
    return {"code": "def hello(): print('world')"}

def run_tests(state: AgentState):
    """Executes the code and collects errors."""
    print("Running tests...")
    # Simulate a syntax error for demonstration
    return {"errors": ["SyntaxError: invalid syntax"]}

def should_continue(state: AgentState) -> str:
    """Routing logic: decide whether to compile or fix."""
    if len(state["errors"]) > 0:
        return "fix_code"
    return "end"

# Build the state graph
workflow = StateGraph(AgentState)

workflow.add_node("generate", generate_code)
workflow.add_node("test", run_tests)
workflow.add_node("fix_code", generate_code) # Recycles the generator

workflow.set_entry_point("generate")
workflow.add_edge("generate", "test")
workflow.add_conditional_edges("test", should_continue, {
    "fix_code": "fix_code",
    "end": END
})
workflow.add_edge("fix_code", "test")

app = workflow.compile()`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pb-20">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
        Cyclic LLM Agent Workflow via LangGraph
      </h1>
      <p className="text-slate-600 dark:text-[#cccccc] mb-10 leading-relaxed text-lg">
        An implementation of a self-correcting autonomous coding agent that uses a finite state machine to generate, test, and iterate on its own code until compilation succeeds.
      </p>

      <CodeBlock 
        code={codeString}
        language="python"
        output={'Generating code...\nRunning tests...\nGenerating code...\nRunning tests...'}
      />
    </div>
  );
}
