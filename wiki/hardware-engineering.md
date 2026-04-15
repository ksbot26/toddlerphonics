# Harness Engineering — AI Agent Scaffolding Reference (2024–2026)

> **What this is:** A synthesized reference on harness engineering — the discipline of building reliable AI agent pipelines, scaffolding, and orchestration patterns. Covers core concepts, architecture, workflow patterns, reliability engineering, tools, and key sources.
>
> **Scope:** 2024–2026. Focused on production patterns for AI agents, not theoretical research.

---

## 1. The Core Problem: Why Harness Engineering Exists

The story of AI development from 2022–2024 was: **better model, better results**. Scale the model, extend the context window, improve the prompt — success followed.

That story broke in production.

The failures that hurt teams in 2025 were not *"the model isn't smart enough."* They were failures of:

- **Drift** — an agent operating incorrectly for many steps before anyone notices
- **Compounding error** — small mistakes accumulating across a long chain of agentic steps
- **Forgetting** — an agent losing track of decisions made hours ago
- **Invisible failure** — an agent succeeding at the wrong task and being confident about it
- **Blast radius** — an agent with too much access causing damage before a human can intervene

These are not intelligence problems. They are **control, memory, and verification** problems. Those problems don't disappear when you change the model — they compound.

**Harness engineering** is the response: the discipline of designing, building, and optimizing the execution environment around an LLM. It treats the model as a powerful but incomplete component, and focuses on everything else.

---

## 2. The Evolution: Prompt → Context → Harness

Understanding harness engineering requires understanding the three-layer progression that led to it.

### 2.1 Prompt Engineering (2022–2023)

Getting a **single interaction** right. Clever phrasing, chain-of-thought, temperature tuning. A good prompt was a repeatable one. But it was still one shot — useful when the work was a question, limited once it became a workflow.

**Key limitation:** The marginal return on prompt optimization collapsed once models became sophisticated enough. A Stanford HAI study (late 2025) found that prompt refinement beyond a reasonable baseline improved output quality by less than 3% — while harness-level changes (retrieval, tools, structured validation) improved quality by 28–47%.

### 2.2 Context Engineering (2024–2025)

Moving from "one prompt" to "one session." The practical question became: **what does the model need, right now, to do the work correctly?**

This introduced retrieval-augmented generation (RAG), input structuring, output schemas, and context curation. Context engineering was a systems move, and it worked — until you tried to run an agent for 200 steps.

### 2.3 Harness Engineering (2026+)

The brutal truth: **no single context window is a safe container for long-horizon work.**

Harnesses connect many sessions into a single coherent job. They treat the model like a worker on a shift, and the system like a factory. Each run is scoped, checkpointed, validated, summarized, and handed off — so work can continue without pretending that one ever-growing context is "memory."

> *"The next era will not be won by whoever has the biggest model or the longest context window. It will be won by whoever builds the best scaffolding around a bounded oracle."*
> — Bassel Haidar, "Agent Harness: The Architecture That Will Dominate 2026"

---

## 3. The Reliability Chain Problem

This is the math that makes the entire field necessary.

If a single step is **95% reliable**, that sounds acceptable.

But long-horizon work is a chain, and chains multiply risk:

```
0.95^20 ≈ 36% end-to-end reliability
0.95^50 ≈ 8% end-to-end reliability
0.95^100 ≈ 0.6% end-to-end reliability
```

A 95%-reliable step repeated 20 times leaves you with roughly a one-in-three chance of success. Run a 200-step agent loop and failure becomes near-certain.

This is why **vibe coding breaks at scale**, why blind autonomy is not a strategy, and why harnesses are not optional.

**A harness breaks the chain.** It inserts checkpoints that reset drift before it compounds. It turns fragile, uninterrupted sequences into bounded units you can validate, correct, and resume. It makes failure **visible and recoverable** instead of silent and cumulative.

---

## 4. The Three Layers of a Harness

```
+--------------------------------------------------+
|  Layer 3: Orchestration                          |
|  (Workflow logic, agent coordination, routing)    |
+--------------------------------------------------+
|  Layer 2: Runtime Environment                    |
|  (Tools, memory, guardrails, I/O processing)     |
+--------------------------------------------------+
|  Layer 1: Model Interface                        |
|  (API calls, prompt assembly, response parsing)   |
+--------------------------------------------------+
```

### Layer 1: Model Interface

How you call the model. Prompt templates, parameter configuration, response parsing, error handling for API failures.

This is where most teams in 2025 stopped building.

### Layer 2: Runtime Environment

What surrounds the model. Tool definitions, memory stores, input validation, output guardrails, context window management.

### Layer 3: Orchestration

How multiple calls coordinate. Agent loops, task decomposition, conditional branching, human approval gates, parallel execution.

Teams shipping reliable AI products in 2026 have engineered all three layers.

---

## 5. Core Harness Components

### 5.1 Tool Selection and Integration

Tools give the model capabilities beyond text generation: web search, code execution, database queries, API calls, file operations.

Key design decisions:

- **Which tools to expose** — more is not always better; tool sprawl confuses the model
- **How to describe tools** — schema design directly affects tool-use accuracy
- **Sandboxing and permissions** — what can the model actually do vs. what it thinks it can do
- **Timeout and fallback behavior** — what happens when a tool call fails

**Best practice:** Start with 3–5 well-defined tools. Each tool should have a clear, non-overlapping purpose. Add tools only when you have evidence the model needs them.

### 5.2 Memory Systems

LLMs are stateless. Every call starts fresh. Memory systems create the illusion — and the utility — of continuity.

| Memory Type | Scope | Implementation | Use Case |
|---|---|---|---|
| Conversation | Single session | Message history buffer | Chat applications |
| Working | Single task | Scratchpad / key-value store | Multi-step reasoning |
| Episodic | Cross-session | Vector DB + summarization | User preferences, past interactions |
| Semantic | Global | Knowledge base / RAG | Domain expertise, documentation |
| Procedural | Global | Tool definitions + examples | Learned workflows |

The critical question is not "should we add memory?" but **"what should be remembered, for how long, and how should it be retrieved?"**

### 5.3 Guardrails and Validation

Guardrails operate at three stages:

**Input guardrails:**
- Content filtering (block prompt injection, PII leakage)
- Schema validation (structured inputs conform)
- Rate limiting and cost controls

**Output guardrails:**
- Format validation (JSON schema, type checking)
- Factual grounding (cross-reference against source documents)
- Safety classifiers (toxicity, bias, hallucination detection)
- Business logic checks (values within expected ranges)

**Execution guardrails:**
- Tool call approval (human-in-the-loop for destructive actions)
- Resource limits (max iterations, max tokens, max cost per request)
- Deadlock detection (agent stuck in loops)

### 5.4 Retry and Error Recovery Logic

LLM calls fail. APIs time out. Models hallucinate. Tools return errors. A production harness handles all of these gracefully.

**Retry strategies:**

- **Simple retry** — same prompt, same model. Works for transient API errors.
- **Reformulated retry** — modify the prompt based on the error. *"The previous response was invalid JSON. Please return valid JSON."*
- **Model fallback** — try a different model. Claude fails? Route to GPT. GPT fails? Route to Gemini.
- **Decomposition retry** — break the failed task into smaller subtasks.
- **Human escalation** — after N failures, route to a human operator.

```
Request
  │
  ▼
[Attempt 1: Primary Model]
  ├─ Success → Validate → Return
  ├─ Failure → [Attempt 2: Reformulated Prompt]
  │              ├─ Success → Validate → Return
  │              └─ Failure → [Attempt 3: Fallback Model]
  │                             ├─ Success → Validate → Return
  │                             └─ Failure → [Escalate to Human]
```

### 5.5 Context Management

With 1M+ token context windows, the challenge is **curation, not capacity**. Dumping everything into context degrades performance. Strategic context assembly improves it.

**Context management strategies:**

- **Relevance ranking** — use embeddings to surface the most relevant documents for each query
- **Recency weighting** — prioritize recent information over historical data
- **Compression** — summarize older context to preserve meaning while reducing tokens
- **Chunking** — break large documents into semantically meaningful sections
- **Priority zones** — place the most critical information at the beginning and end of context (models attend more to these positions)

### 5.6 Observability and Tracing

You cannot improve what you cannot measure.

**What to track:**
- Latency per component (model call, tool execution, retrieval, validation)
- Token usage and cost per request
- Success/failure rates by task type
- Guardrail trigger frequency
- User satisfaction signals (explicit ratings, implicit engagement)
- Drift detection (output quality degradation over time)

### 5.7 The File System as Universal Memory Substrate

Every team eventually rediscovers the same pattern: **the file system is the most transferable memory primitive for agent harnesses.**

Not because it is elegant, but because it is durable, inspectable, and model agnostic. You can version it, diff it, audit it, and hand it to a different model tomorrow without rewriting your entire stack.

A harness should maintain at least **three redundant memory channels:**

- **Primary state** — the real outputs (code, documents, data artifacts)
- **Progress journal** — a session-to-session narrative with decisions and next steps
- **Event log** — a structured ledger of actions, tests, and outcomes

> The goal is not to summarize perfectly. The goal is to make state **reconstructable.**

---

## 6. Workflow Patterns (Anthropic's Taxonomy)

These are the building blocks for composing agentic systems, from simplest to most complex.

### 6.1 Prompt Chaining

Decomposes a task into a **sequence of steps**, where each LLM call processes the output of the previous one. Programmatic checks can be added on intermediate steps to ensure the process is still on track.

**Use when:** The task can be easily decomposed into fixed subtasks. Traded latency for higher accuracy by making each LLM call an easier task.

**Examples:**
- Generate marketing copy → translate it into a different language
- Write an outline → check that the outline meets criteria → write the document

### 6.2 Routing

Classifies an input and directs it to a **specialized follow-up task**. Allows separation of concerns and building more specialized prompts.

**Use when:** Complex tasks have distinct categories better handled separately, and classification can be handled accurately.

**Examples:**
- Direct different customer service query types into different downstream processes
- Route easy questions to smaller/cost-efficient models, hard questions to more capable models

### 6.3 Parallelization

LLMs work simultaneously on a task with outputs aggregated programmatically. Two variations:

- **Sectioning** — break a task into independent subtasks run in parallel
- **Voting** — run the same task multiple times to get diverse outputs

**Use when:** Subtasks can be parallelized for speed, or multiple perspectives are needed for higher confidence.

**Examples:**
- One model instance processes user queries while another screens for inappropriate content (sectioning — tends to outperform having the same call handle both)
- Multiple prompts review code for vulnerabilities, each flagging independently (voting)

### 6.4 Orchestrator-Workers

A central LLM **dynamically breaks down tasks**, delegates them to worker LLMs, and synthesizes their results. Unlike parallelization, subtasks are not pre-defined — they are determined by the orchestrator based on the specific input.

**Use when:** Complex tasks where you can't predict the subtasks needed (e.g., coding — the number and nature of file changes depends on the task).

**Examples:**
- Coding products that make complex changes to multiple files
- Search tasks that gather and analyze information from multiple potentially-relevant sources

### 6.5 Evaluator-Optimizer

One LLM call **generates a response** while another provides evaluation and feedback in a loop.

**Use when:** There are clear evaluation criteria and iterative refinement provides measurable value.

**Examples:**
- Literary translation where nuances aren't captured initially but an evaluator can critique
- Complex search tasks requiring multiple rounds of searching and analysis, where the evaluator decides whether further searches are warranted

### 6.6 Agents (Full Autonomy)

Agents emerge when LLMs mature in key capabilities: understanding complex inputs, engaging in reasoning and planning, using tools reliably, and recovering from errors.

Agents begin with a command or interactive discussion with a human. Once the task is clear, they operate **independently**, potentially returning for further information or judgment. They assess progress through environmental feedback (tool call results, code execution) and pause at checkpoints or blockers.

**Use when:** Open-ended problems where the required number of steps is difficult to predict and a fixed path cannot be hardcoded. Requires trust in the agent's decision-making.

**Key risk:** Higher costs and potential for compounding errors. Requires extensive testing in sandboxed environments and appropriate guardrails.

---

## 7. Reference Architecture: The Two-Agent Spine

The pattern that keeps showing up across serious teams building production harnesses:

```
┌─────────────────────────────────────────────┐
│  Initializer (runs once)                    │
│  • Task decomposition and feature list      │
│  • Constraints and non-goals                │
│  • Acceptance criteria                      │
│  • Evaluation plan                          │
│  • Tool permissions                          │
│  • Repo/workspace scaffolding                │
│  • Risk and escalation rules                │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│  Task Agent (runs in a loop)                 │
│  • Primes itself on current state           │
│  • Performs environment health checks       │
│  • Takes the next step                       │
│  • Validates the result                      │
│  • Writes handoff artifacts                 │
│  • Commits/checkpoints                       │
│  • Exits cleanly                            │
└─────────────────────────────────────────────┘
```

**Why this separation matters:** Initialization quality constrains everything that follows. The initializer is where you spend your most expensive cognition — mistakes there propagate through the entire job.

> A harness is not one long chat. **It is many small jobs.**

### Multi-Agent Collaboration Example

For a complex project (e.g., migrating a legacy service to modern APIs), a harness can run this as a pipeline with explicit roles:

| Role | Responsibility |
|---|---|
| Initializer | Reads the repo, proposes milestones, defines acceptance criteria, identifies risk boundaries |
| Planner | Chooses the next work unit based on current state |
| Builder | Implements code |
| Verifier | Runs tests, static analysis, security checks |
| Doc Agent | Updates docs, changelog, migration notes |
| Supervisor | Enforces budgets, decides escalation, writes the handoff |

**Critical insight:** The builder is not responsible for proving itself right. The verifier is. This is how you avoid self-confirming loops.

---

## 8. The Four Essential Harness Layers

### 8.1 Guardrails — Rules the Agent Cannot Violate

- Capability boundaries
- Data boundary enforcement
- Tool scopes
- Cost and time budgets
- Security constraints
- Output schemas

Guardrails are **preventative**. They narrow the action space.

### 8.2 Checkpoints — Validation Gates

- Unit tests
- Policy tests
- Schema validation
- Static analysis
- Retrieval grounding checks
- Safety checks

Checkpoints are the moment you **stop trusting vibes**.

### 8.3 Handoffs — Durable Artifacts Between Sessions

A good handoff answers:
- What was attempted
- What was completed
- What failed
- What evidence exists
- What should happen next

Bad handoffs are vague. Good handoffs are **actionable**.

### 8.4 Human Injection Points — Strategic, Not Everywhere

Humans are not the safety net for every step. They are the **strategic constraint**.

A harness decides where human attention yields maximum risk reduction per minute:
- Approve irreversible actions
- Resolve ambiguity
- Accept risk
- Adjudicate policy conflicts
- Validate business intent

---

## 9. Two Unsolved Problems

Harnesses are the best current approach and they are not done. The frontier is shaped by two problems not yet fully solved:

### 9.1 Bounded Attention

Handoffs are the currency of long-horizon agents, but the exchange rate is unstable. Summaries are inconsistent — sometimes the agent captures the critical detail, sometimes it misses the one line that becomes important ten steps later.

**The only workable response: redundancy.** Not one memory channel. Many.

### 9.2 Reliability Compounding

Even with checkpoints, the chain still exists. Failures still stack. The harness cannot be designed just for success — it must be designed for **recovery**.

Rollback, retries, alternative models, human injection points, and escalation paths are not "nice to have." They are the system.

---

## 10. Prompt Engineering vs. Context Engineering vs. Harness Engineering

| Dimension | Prompt Engineering | Context Engineering | Harness Engineering |
|---|---|---|---|
| Focus | The words in the prompt | The information around the prompt | The entire execution environment |
| Scope | Single LLM call | Single LLM call with enriched context | Multi-step system with multiple calls |
| Key Question | "How do I phrase this?" | "What information does the model need?" | "How does this system behave end-to-end?" |
| Output | Prompt text | Context assembly pipeline | Production-ready AI system |
| Skills | Writing, domain knowledge | Information retrieval, data architecture | Software engineering, systems design |
| Failure Mode | Bad phrasing, ambiguity | Missing or irrelevant context | System failures, cascading errors |
| Impact Ceiling | 5–15% quality improvement | 20–40% quality improvement | 50–300% reliability improvement |
| Maturity | 2022–2023 (foundational) | 2024–2025 (transitional) | 2026+ (current frontier) |

Prompt engineering is a subset of context engineering. Context engineering is a subset of harness engineering. **You still need decent prompts. You still need good context. But neither is sufficient without the harness.**

---

## 11. Agentic RAG — Retrieval in Agentic Systems

In 2026, RAG has evolved from a feature layer into **enterprise AI infrastructure**.

Agentic RAG allows AI to retrieve more information when needed, think step by step, and refine responses for better accuracy. Rather than retrieving once at the start, agentic RAG systems decide **when and what to retrieve** as they work.

### Key RAG Patterns

1. **Naive RAG** — retrieve once, generate once (the 2023 pattern)
2. **Semi-agentic RAG** — retrieve, evaluate relevance, re-retrieve if needed
3. **Fully agentic RAG** — the agent decides retrieval strategy dynamically, can use multiple tools, and iterates until satisfied
4. **Knowledge graph RAG** — structured knowledge as a graph with entities and relationships, enabling complex multi-hop reasoning
5. **Multimodal RAG** — retrieval across text, image, audio, and video simultaneously

### 10 RAG Architecture Patterns (2026)

1. **Naive/Standard RAG** — retrieve-chunk → embed → top-k → generate
2. **Semi-agentic RAG** — retrieval with query expansion and re-ranking
3. **Fully Agentic RAG** — agent controls the entire retrieval strategy
4. **Knowledge Graph RAG** — graph-based knowledge representation
5. **Hybrid Search RAG** — combining dense and sparse retrieval methods
6. **Chunk Optimized RAG** — intelligent chunk sizing and overlap strategies
7. **Context Enriched RAG** — adding query classification and intent detection
8. **Citation-Aware RAG** — grounding responses in specific retrieved sources
9. **Multimodal RAG** — handling multiple data types in retrieval
10. **Enterprise RAG** — combining multiple patterns with governance and observability

---

## 12. Real Examples: Same Prompt, Different Harnesses

### Example: "Analyze this codebase and find security vulnerabilities"

**Harness A: Basic Chat Interface**
- Prompt pasted into a chat window
- Model sees only what fits in one message
- Result: Generic list of common vulnerability types. No actual code analysis. Hallucinated file paths.

**Harness B: RAG-Augmented System**
- Codebase indexed in vector database
- Relevant code files retrieved based on query
- Model sees actual code snippets
- Result: Identifies real patterns in retrieved code. Misses vulnerabilities in files not retrieved. No validation.

**Harness C: Agentic Harness with Tools**
- Agent has file system access, code execution, and grep tools
- Orchestrator decomposes task into: scan dependencies, check auth patterns, review input validation, test SQL queries
- Each subtask runs with focused context
- Results validated against OWASP checklist
- Findings ranked by severity with code references
- Result: Comprehensive security audit with verified findings, severity ratings, and remediation suggestions tied to specific lines of code.

**Same prompt. Three different outcomes. The difference is entirely in the harness.**

---

## 13. Tooling and Frameworks

### Agent Frameworks

| Framework | Description |
|---|---|
| **LangChain / LangGraph** | Most widely used. Composable chains and agent building blocks. |
| **Claude Agent SDK** | Anthropic's official SDK. Simpler patterns, strong tool support. |
| **CrewAI** | Role-based multi-agent framework. Clean separation of concerns. |
| **AutoGen (Microsoft)** | Multi-agent conversation framework with human-in-the-loop support. |
| **Strands (AWS)** | AWS's agent SDK. Strong AWS integration. |
| **Rivet** | Drag-and-drop GUI LLM workflow builder. |
| **Vellum** | GUI tool for building and testing complex workflows. |
| **MCP (Model Context Protocol)** | Open standard for connecting AI models to tools. Growing ecosystem. |

### Tool Calling Infrastructure

| Tool | Use Case |
|---|---|
| **Model Context Protocol (MCP)** | Open standard for tool discovery and integration across providers |
| **Browserbase / Steal** | Browser automation for web interaction |
| **Firecrawl / Crawl4AI** | Web scraping and content extraction |
| **Exa / Tavily** | Search APIs optimized for AI applications |
| **Literal Inference** | Structured output parsing |
| **Pydantic / Zod** | Schema validation for structured tool inputs/outputs |

### Observability

| Tool | Description |
|---|---|
| **LangSmith** | Tracing, evaluation, and monitoring for LangChain applications |
| **Arize Phoenix** | Open-source observability for LLM applications |
| **Weave (Weights & Biases)** | Experiment tracking for AI |
| **PromptLayer** | Prompt management and versioning |

### Best Practice

> *"Frameworks make it easy to get started by simplifying standard low-level tasks. However, they often create extra layers of abstraction that can obscure the underlying prompts and responses, making them harder to debug."*
> — Anthropic, "Building Effective Agents"

**Recommendation:** Start with direct LLM API calls. Many patterns can be implemented in a few lines of code. If you do use a framework, ensure you understand the underlying code. Incorrect assumptions about what's under the hood are a common source of errors.

---

## 14. Designing a Production Harness — Step by Step

### Step 1: Define the Unit of Work

Pick a unit the agent can complete in one bounded run.

Examples: implement one endpoint, write one migration, draft one policy memo section, run one analysis experiment.

*If you cannot define the unit, you do not have a harness.*

### Step 2: Separate Initialization from Execution

Initialization is where you build the plan and the acceptance criteria. Execution is where you take one step and prove it. **Do not mix them.**

### Step 3: Codify Your Checkpoints

Write down:
- What must be true before the agent runs
- What must be true after it runs
- What evidence proves it

*If the checkpoint is not executable, make it measurable. If it's not measurable, it will be ignored.*

### Step 4: Design Handoff Artifacts as Products

A handoff is not a summary. It is a control document. It should include: current state, what changed, what is verified, what is unverified, what is risky, and next actions. **It should be short enough that a fresh session can load it without drowning.**

### Step 5: Design Recovery Before Autonomy

Every harness needs: retries, backoff, alternative strategies, rollback, and escalation.

*If you do not design recovery, your autonomy is a fantasy.*

### Step 6: Instrument Everything

If you cannot measure where the agent fails, loops, escalates, and succeeds — you cannot improve.

**Harnesses are a learning machine, and your telemetry is the curriculum.**

---

## 15. Key Principles from Anthropic

Building on their experience with dozens of teams building production agents:

1. **Start with simplicity.** Find the simplest solution, only increase complexity when needed. Often, optimizing single LLM calls with retrieval and in-context examples is enough.
2. **Agents vs. workflows.** Workflows offer predictability for well-defined tasks. Agents offer flexibility when model-driven decision-making is needed at scale.
3. **Maintain simplicity in agent design.** Don't add complexity for its own sake.
4. **Prioritize transparency.** Explicitly show the agent's planning steps.
5. **Carefully craft the Agent-Computer Interface (ACI).** Tool documentation and testing matters as much as the tool itself.
6. **Reduce abstraction layers** when moving to production. Build with basic components rather than hiding behind framework abstractions.

---

## 16. Priming — A First-Class Phase

Every new session starts blind, and **priming is how you make it competent without drowning it**.

The harness should prime in layers:
1. Load the plan
2. Load the last handoff
3. Load the current state summary
4. Retrieve only the relevant code or documents
5. Confirm assumptions

**Priming should be fast and repeatable.** If priming takes 20 minutes of context dumping, your harness will not scale.

---

## 17. Tool Permissions — Least Privilege

If you grant the agent broad tool rights, you will eventually regret it. Use **least privilege**.

Give the builder **read access and staged write access**. Route write access through review. No ambient permissions — agents can only invoke explicitly declared tools. Tool specifications are reviewed and versioned like code.

---

## 18. The Core Insight: Build the Factory, Not Just the Worker

> *"If you only build the worker, you will keep debugging the worker. If you build the harness, you can swap workers."*
> — Bassel Haidar

The harness is the **control plane for cognition**. It does not just "run the agent." It governs:
- Which context is loaded
- Which tools are available
- What "done" actually means
- What checks must pass before progress is accepted
- What gets written to durable memory
- When to reset before drift becomes rot
- When to escalate to humans or stronger models

This portability — the ability to swap workers — becomes a structural moat in a world where **model churn is structural**.

---

## Key Sources

| Source | Description |
|---|---|
| [Anthropic — Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) | Foundational patterns taxonomy from the Claude team |
| [AIMagicX — Harness Engineering: Why the Way You Wrap AI Matters More Than Your Prompts](https://www.aimagicx.com/blog/harness-engineering-replacing-prompt-engineering-2026) | Three-layer harness framework, reliability math, stack breakdown |
| [Bassel Haidar — Agent Harness: The Architecture That Will Dominate 2026](https://www.linkedin.com/pulse/agent-harness-architecture-dominate-2026-bassel-haidar-sczfe) | Reliability compounding, two-agent spine, unsolved problems |
| [nxcode — What Is Harness Engineering? Complete Guide](https://www.nxcode.io/resources/news/what-is-harness-engineering-complete-guide-2026) | Comprehensive guide with tooling, patterns, step-by-step |
| [Phil Schmitz — The Importance of Agent Harness in 2026](https://www.philschmid.de/agent-harness-2026) | Prompt presets, opinionated tool handling |
| [ArXiv — Agentic RAG: A Survey](https://arxiv.org/html/2501.09136v4) | Academic survey of agentic RAG patterns and architectures |
| [MindStudio — What Is Harness Engineering?](https://www.mindstudio.ai/blog/what-is-harness-engineering-beyond-prompt-context-engineering/) | Distinction between multi-agent frameworks and harness engineering |
| [MAD Play — Beyond Prompts and Context: Harness Engineering for AI Agents](https://madplay.github.io/en/post/harness-engineering) | Practitioner perspective on the evolution |
| [Harness Developer Docs](https://developer.harness.io/docs/platform/harness-ai/harness-agents) | Enterprise harness platform perspective |

---

## Quick Reference: Harness Design Checklist

- [ ] Define the unit of work (one bounded run)
- [ ] Separate initializer from task agent
- [ ] Implement 3-layer architecture (Interface / Runtime / Orchestration)
- [ ] Start with 3–5 non-overlapping tools
- [ ] Add memory channels (conversation, episodic, semantic, procedural)
- [ ] Add guardrails at input, output, and execution stages
- [ ] Implement retry cascade (simple → reformulated → fallback → human)
- [ ] Design context curation (relevance ranking, compression, priority zones)
- [ ] Add executable checkpoints
- [ ] Design handoff artifacts as actionable control documents
- [ ] Add observability (latency, cost, success/failure rates, drift)
- [ ] Instrument everything — telemetry is the curriculum
- [ ] Design recovery before autonomy
- [ ] Use least privilege for tool permissions
- [ ] Test the harness, not just the model

---

*Last updated: 2026-04-15. This is a living reference — update as the field evolves.*
