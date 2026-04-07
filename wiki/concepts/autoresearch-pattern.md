# The AutoResearch Pattern: A General-Purpose Optimization Primitive

## The Pattern in One Sentence

Give an AI agent a **single editable file**, a **single measurable metric**, a **fixed time budget per experiment**, and let it iterate autonomously — keeping what improves the metric, discarding what doesn't, overnight.

That's the whole thing. Everything else is elaboration.

---

## Why This Is Deeper Than It Looks

The obvious reading of Karpathy's [AutoResearch](https://github.com/karpathy/autoresearch) is "robots doing science." That's true but limiting. The pattern is actually a **general-purpose optimization primitive** that happens to use an LLM as the reasoning engine. The LLM is not the key insight — the key insight is the structure around it.

Here's what makes it powerful when you look past the ML context.

### You Don't Need Understanding. You Need Measurement.

The traditional approach to optimization — whether in ML, trading, or product — is: form a hypothesis, understand the mechanism, implement a fix, validate. Understanding is treated as prerequisite.

AutoResearch inverts this. The agent doesn't need to understand *why* something works. It only needs to measure *whether* it worked. This is a dramatically lower bar, and it enables optimization in domains where the underlying mechanisms are too complex to reason about fully.

This is essentially what evolution does. Evolution doesn't understand anything. It just runs experiments (mutations) and keeps what survives (the metric). The difference is speed — AutoResearch runs years of evolution's worth of experiments in a weekend.

### The Single-File Constraint Is the Constraint That Matters

In Karpathy's setup, the agent can only edit `train.py`. Not `prepare.py`. Not the data. Not the tokenizer. One file. This is not an accident — it's the load-bearing constraint of the entire pattern.

Here's why: **when you can change everything at once, you get entangled effects that make attribution impossible.** If the agent changes the architecture, the batch size, and the learning rate in the same experiment, and the metric improves, which one caused it? You can't build on a change you can't attribute.

One editable file = clean attribution = compounding improvements. Each experiment is a clean data point that the next experiment can build on. This is the difference between "the system got better somehow" and "changing X to Y improved things by Z."

### Fixed Time Budget Enables Fair Comparison Across Radically Different Changes

Suppose you let experiments run to completion. A batch size change converges quickly (fast experiment). An architecture change takes longer (slow experiment). You can't compare them — one finished, one didn't.

Karpathy's fix: **run every experiment for exactly 5 minutes, regardless of what changed.** Now a batch size change and an architecture change are directly comparable. They're both 5 minutes. The metric is evaluated at the same wall-clock point for both. This means the search is fair across arbitrary change types — which is what makes it possible to explore the search space without human guidance about what's "worth trying."

This is not obvious. Most people would say "let it run until convergence." That would destroy comparability. Fixed time is a non-obvious insight that makes the whole thing work.

### The Metric Is the Real Work

The agent is the reasoning engine. The metric is the real worker. The quality of the optimization is only as good as the quality of the metric.

"Val bits per byte" is a good metric because it's:
- **Architecture-independent** — changing vocabulary size doesn't artificially improve it
- **Efficient to evaluate** — 5 minutes is enough to get a signal
- **Correlated with what you actually want** — lower bits per byte = better language model

Picking a bad metric is the most common failure mode. A metric that's easy to optimize but doesn't correlate with the real goal is worse than no metric at all — the agent will find ways to game it.

### Compounding: Early Experiments Find Direction, Later Ones Refine

The search doesn't just improve monotonically. Early experiments tend to find the rough direction of improvement (big architectural changes, gross parameter misconfigurations). Later experiments refine within that direction (fine-tuning rates, small architectural tweaks). You get emergent strategy without emergent understanding.

This is why overnight iteration works: the agent runs hundreds of experiments, each one building implicitly on what the previous ones discovered. By morning you have a rough map of the search space that took 700 experiments to draw.

---

## The General Form

```
AUTORESEARCH(target, metric, agent, time_budget)
  while running:
    experiment = agent.propose_change(target)
    result = run_experiment(experiment, time_budget)
    if metric(result) < metric(best):
      best = result
      target = experiment
    else:
      discard experiment
  return best
```

Where:
- **target**: the thing you're optimizing (a file, a strategy, a config)
- **metric**: a single scalar function, lower-is-better or higher-is-better
- **agent**: an LLM that can read experiments, form hypotheses, and write changes
- **time_budget**: fixed wall-clock time per experiment, same regardless of change type

The loop doesn't need to understand the domain. It just needs to be able to measure.

---

## Domain Applications

### 1. Trading Strategies (GSO Bot)

**Signal:** Sharpe ratio, max drawdown, net P&L from paper trading.  
**Editable file:** Strategy parameters — position sizing, entry/exit thresholds, stop-loss rules, indicator weights.  
**Time budget:** Fixed backtest window (e.g., 90 days of historical data, evaluated in under 5 minutes).  
**What changes:** The agent modifies strategy logic, runs a backtest, evaluates on out-of-sample data, keeps or discards.

The GSO bot already does paper trading. The AutoResearch pattern would add the autonomous iteration layer: instead of manually tuning parameters, the agent proposes and tests changes overnight. Hundreds of strategy variants can be evaluated against the same historical data. The metric is already there — it's the Sharpe ratio.

**Why it compounds:** Early experiments find the rough strategy family (momentum vs. mean-reversion, for example). Later experiments fine-tune within that family — exact thresholds, position sizing curves, stop-loss timing.

**The constraint:** The agent should only edit strategy parameters, not the execution layer or data fetching. Keep the editable surface narrow enough for attribution.

---

### 2. Knowledge Base Building

**Signal:** Retrieval accuracy, citation coherence score, or a downstream task metric (e.g., "does this knowledge graph answer factual questions correctly?").  
**Editable file:** Extraction rules, entity linking thresholds, relationship type definitions, or the embedding configuration.  
**Time budget:** Fixed evaluation on a held-out knowledge corpus.  
**What changes:** The agent modifies how knowledge is extracted, linked, or weighted. It runs extraction over a corpus, evaluates accuracy against ground truth, keeps what improves.

Knowledge base construction is usually done by humans writing rules or by static ML models. The AutoResearch pattern could let an agent discover non-obvious extraction rules — combinations of patterns that capture entities humans missed, or weighting schemes that prioritize high-confidence relationships.

**Why it's plausible:** The signal (factual accuracy) is measurable if you have ground truth. The editable surface (extraction rules) is bounded and attributable. The feedback is fast if the corpus is small enough.

**The constraint:** Requires a clean separation between the extraction logic (editable) and the data (fixed). Also requires ground truth for evaluation — which is often the real bottleneck.

---

### 3. Code Optimization (Builds, Tests, Performance)

**Signal:** Build time, test suite duration, or time-from-commit-to-production.  
**Editable file:** Build configurations, parallelization settings, test split strategies, caching configs.  
**Time budget:** One CI run.  
**What changes:** The agent monitors build metrics, identifies bottlenecks, modifies configs, validates on the next CI run.

This is compelling because the signal is already being measured — every CI run generates it automatically. The agent just needs to read it and act on it. No new instrumentation required.

**Why it compounds:** Build optimization is genuinely path-dependent. Early experiments might find that test parallelization matters more than compilation flags. Later experiments refine within the winning direction. A team that runs 20 merges/day gets 20 experiments/day, automatically.

**The constraint:** The agent should only edit configs and build files — not the source code itself (unless that's the intent). Clean attribution matters here too.

---

### 4. Prompt Engineering Pipelines

**Signal:** Task success rate, accuracy on a held-out eval set, or a proxy metric like "does the output pass a verifier?"  
**Editable file:** The prompt or chain-of-thought template.  
**Time budget:** Fixed evaluation on the eval set (e.g., 100 test cases, under 5 minutes).  
**What changes:** The agent modifies prompt phrasing, instruction ordering, examples in few-shot, or chain-of-thought structure. Evaluates against the eval set, keeps what improves.

This is a natural fit because prompts are just text — no compilation, no environment setup. The feedback loop is fast. Karpathy's point about "any metric you care about that is reasonably efficient to evaluate" applies directly.

**Why it compounds:** Prompt engineering has strong ordering effects and interaction effects between instructions. "Do X before Y" vs "Do Y before X" can be the difference between 60% and 90% accuracy. The agent explores these combinations systematically.

**The constraint:** The eval set must be large enough and diverse enough to avoid overfitting to spurious prompt patterns. A bad eval set is worse than no eval set.

---

### 5. Research Pipelines (Hypothesis Generation)

**Signal:** A downstream research metric — experiment yield rate (fraction of hypotheses that produce publishable results), or a proxy like "does this hypothesis survive initial sanity checks?"  
**Editable file:** The hypothesis generation logic, experimental design templates, or analysis pipelines.  
**Time budget:** Fixed generation + preliminary evaluation.  
**What changes:** The agent reads recent literature (or experimental results), generates hypotheses, runs preliminary checks, and keeps hypotheses that survive.

This is the most ambitious application and closest to "AI doing science." The agent would modify how it generates hypotheses based on what survived in previous rounds. Early rounds might produce crude hypotheses. Later rounds produce refined ones that build on accumulated knowledge.

**Why it's hard:** Research signals are slow and noisy. "Publishable result" takes months to evaluate. You'd need a much faster proxy signal — something like "does this hypothesis survive the first round of sanity checks?" — that correlates with the real goal.

**The constraint:** Requires a pipeline that's already instrumented with metrics. If you can't measure it, you can't optimize it.

---

### 6. Product Development (Feature Flag Tuning)

**Signal:** A product metric — engagement rate, conversion rate, or a feature-specific success metric.  
**Editable file:** Feature flag configurations, UI text, recommendation weights, or pricing parameters.  
**Time budget:** Fixed A/B test window (e.g., 24 hours of live traffic).  
**What changes:** The agent monitors feature performance, proposes parameter changes, validates via A/B test, keeps what improves.

This is the closest to "overnight optimization" in the product world. Live traffic provides continuous signal. The agent proposes changes to feature parameters, the A/B test evaluates them, and the best variant is promoted.

**Why it compounds:** Feature performance is often sensitive to interaction effects between parameters. The agent explores these systematically. Early experiments might find that a feature works well for a certain user segment. Later experiments refine targeting.

**The constraint:** A/B tests need statistical power — you can't evaluate a change on 10 users. The time budget must be long enough to accumulate statistical significance. This makes the loop slower than code-based experiments.

---

## What Makes It General-Purpose

The pattern doesn't care about the domain. It cares about:

1. **You have a measurable outcome** — the metric is the thing you care about, reduced to a scalar
2. **The system is iteratively modifiable** — you can make a change, run it, and see the result
3. **The metric is fast enough** — you can evaluate within your iteration budget (minutes for code, hours for live experiments)
4. **The search space is bounded** — the agent has a lever to pull, not a control panel

These conditions are satisfied by a surprisingly large number of real-world optimization problems. The ML training case is just the one Karpathy happened to start with.

The general principle: **anywhere you have a measurable signal, a modifiable system, and a human bottleneck in the iteration loop — the AutoResearch pattern applies.**

---

## The Key Design Decisions

These are not arbitrary. Each one solves a specific failure mode:

| Design Decision | Why It Matters |
|-----------------|----------------|
| **Single editable file** | Clean attribution — you know what caused improvement |
| **Fixed time budget** | Fair comparison across arbitrary change types |
| **Single metric** | Avoids multi-objective collapse; forces prioritization |
| **Metric is scalar, not categorical** | Enables comparison: is this better or worse than the best? |
| **Agent reasons, metric decides** | The LLM proposes; the metric has final say |
| **Human is reviewer, not participant** | Removes the human bottleneck from the iteration loop |

---

## Failure Modes

**Bad metric.** The agent optimizes the metric, not the real goal. This is the most common failure. The metric must correlate with what you actually care about, and resist gaming.

**Unbounded search space.** If the agent can change everything at once, you get entangled effects. Attribution breaks. Compounding breaks. Start narrow.

**Metric too slow.** If evaluation takes 2 hours, you get 12 experiments per day instead of 100. The loop still works, just slower. Fixed time budgets help here — you know what you're working with.

**Agent breaks mid-loop.** The loop's reliability depends on infrastructure reliability. Long-running loops need checkpointing and recovery.

**Lag between change and signal.** Some metrics take weeks to move (fitness, product adoption). The loop needs a faster proxy signal, or patience that humans aren't good at.

---

## The Question to Ask

Karpathy's original tweet was: *"any metric you care about that is reasonably efficient to evaluate can be autoresearched by an agent swarm."*

The operative word is **reasonably**. A metric that's fast to evaluate enables fast iteration. A metric that takes 4 weeks to move is not reasonably efficient — or rather, it's a different kind of problem.

So ask yourself:

- What metric do I actually care about?
- How fast can I evaluate it?
- What can the agent modify that would affect it?
- Is that surface bounded enough for attribution?

If the answers are "I know what I want," "within minutes to hours," "something specific," and "yes" — you have an AutoResearch problem.

---

*Related:*
- [[Auto Research for the Rest of Us]] — the ainews story that first documented this pattern
- [[Skill Design]] — the program.md pattern as a skill definition format
