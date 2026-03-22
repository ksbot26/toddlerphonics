# Auto Research for the Rest of Us

*Or: how to let the machine do the iterating while you go live your life.*

---

In March 2026, Andrej Karpathy did something quietly revolutionary. He gave an AI agent 630 lines of Python, pointed it at a small language model, and told it to make it better. Then he went to sleep.

When he woke up, the agent had run 700 experiments over two days. It had modified the training code, run 5-minute training sessions, evaluated whether things improved, and iterated — all without a single human in the loop. It found 20 optimizations that transferred from a small model to a larger one, cutting "time to train GPT-2" by 11%.

He called it **autoresearch**. The internet called it the beginning of the end (or the beginning). Tobias Lütke, Shopify's cofounder, ran it on his company's internal model and saw a 19% performance gain after 37 overnight experiments.

But the most important thing Karpathy said wasn't about AI labs or frontier models. It was buried in a tweet: *"any metric you care about that is reasonably efficient to evaluate can be autoresearched by an agent swarm. It's worth thinking about whether your problem falls into this bucket too."*

That tweet is the one worth sitting with.

---

## The Primitive

Here's what actually happened in Karpathy's repo — stripped of the hype, extracted to its essence:

**You have three things:**

1. **A measurable signal.** A single number that tells you whether you're winning. In his case: *validation bits per byte* (val_bpb) — lower is better, and it's architecture-independent so you can compare any change fairly.

2. **An agent that can take actions.** It looks at the signal, proposes a change to the system, runs the experiment, reads the signal again, and decides whether to keep the change. Then it loops.

3. **No human in the loop.** The agent runs while you sleep. The bottleneck isn't intelligence — it's iteration speed. You're not babysitting experiments; you're just showing up to review the log.

That's it. That's the primitive.

It is *not* AutoML. AutoML uses evolutionary algorithms or random search to find good configurations. What Karpathy built is different in a subtle but important way: the agent *reasons* about what to try next. It reads the previous experiments, forms a hypothesis ("maybe warmup is too short given the batch size change I just made"), writes code, and tests it. The LLM is the brain. The loop is the body.

And crucially: **the loop doesn't need to understand why something works.** It just needs to be able to measure whether it worked. That's a much lower bar.

---

## Why This Changes Things

The traditional research loop looks like this:

- Researcher has an idea
- Researcher modifies code
- Researcher runs experiment (hours/days)
- Researcher looks at result
- Repeat

The human is in the loop at every step. The iteration rate is limited by how fast a human can think, type, and wait. And humans need sleep.

The autoresearch loop looks like this:

- Agent has an idea
- Agent modifies code
- Agent runs experiment (5 minutes, fixed budget)
- Agent reads the signal
- Agent keeps or discards the change
- Repeat, automatically, while the human is unconscious

The human goes from **participant** to **occasional reviewer**. Your job is no longer "run the experiments." Your job is: define the signal, interpret the results, and decide when the loop has done enough.

This sounds obvious when described for ML training. But the insight is that **this pattern applies anywhere you have a measurable outcome and a system that can be modified iteratively.** Most knowledge work doesn't have this — yet. But more and more of life does.

---

## Examples Beyond the Obvious

Here are some domains where the loop creates real leverage — some obvious, some genuinely strange.

### Your Morning Routine

**Signal:** Minutes to full alertness after waking (tracked via a simple self-reported 1-10 scale each morning, or wearable data if you have it).

**The loop:** An agent reads your journal entry, modifies a "protocol.md" file that describes your morning routine — wake time, sunlight exposure, caffeine timing, exercise, cold plunge, whatever. It runs an experiment each week. After 4 weeks, it has a data-backed routine that's better than anything you consciously designed.

**Oversight:** You read the log on Sunday morning. You can override anything. But most weeks you don't need to.

**Why it's compelling:** Most people design their morning routine once (during a period of high motivation) and then never revisit it systematically. The loop treats your energy as an ongoing experiment rather than a static prescription. The "right" answer changes as your life changes — and the loop keeps up.

---

### Newsletter Subject Lines

**Signal:** Open rate (or click-through rate, depending on your goal).

**The loop:** You give an agent your subscriber list metadata and a draft of the email. It generates 10 subject line variants, sends each to a small random slice, reads the open rates 2 hours later, and picks the best one for the full send.

**Oversight:** You see the winning subject line before it goes out. You can veto.

**Why it's compelling:** Open rates have huge variance from subject line alone — often 2-3x difference between best and worst. But most newsletter writers test one or two ideas and go with their gut. The loop is just systematic preference testing at a scale humans don't bother with because it's too tedious.

---

### Fitness Programming

**Signal:** Your 5K race time, or loaded carry weight, or whatever specific metric you've chosen for the quarter. (Not "I want to look better" — that's not a signal.)

**The loop:** An agent reads your training log and any wearable data. It modifies a "program.md" — your training plan for the week. It tries periodization variations, tests different volume/intensity distributions, learns what recovery patterns work for you. You follow the plan without knowing why the agent made the changes.

**Oversight:** Monthly check-in. If something feels wrong, you override. But the agent is paying attention to patterns you'd never notice — like how your sleep quality from two nights ago predicts today's performance.

**Why it's compelling:** Personal trainers are expensive and can't run a thousand experiments on you. The loop treats your physiology as a black-box optimization problem. The signal is objective, the modifications are grounded in exercise science principles (the agent isn't randomly generating workouts — it's reasoning about load, volume, and recovery), and the compounding effect of small weekly improvements is real.

---

### Your Investment Portfolio

**Signal:** Your savings rate, net worth trajectory, or — for the brave — risk-adjusted returns.

**The loop:** An agent has access to your income, expenses, and brokerage accounts. It proposes budget adjustments, rebalancing trades, or contribution changes. Each change is evaluated against your signal over a quarter. It learns your tax situation, your cash flow needs, your risk tolerance (as revealed by your behavior, not as stated in a questionnaire).

**Oversight:** Significant changes (anything affecting more than X% of your portfolio or income) require explicit approval.

**Why it's compelling:** Most people set their 401k contribution once and forget about it. The loop treats your financial trajectory as an ongoing optimization with a clear objective. The agent can't predict market movements — but it can notice that your savings rate has drifted, or that you're overexposed to a sector, or that you're paying 1.4% in fees on funds that charge 0.03% elsewhere.

**Disclaimer:** This one has real risk if the agent can make trades autonomously. Start with the read-only version — just recommendations that you approve — before considering any autonomous execution.

---

### Technical Debt Prioritization

**Signal:** Deploy frequency, or mean time to recovery (MTTR), or the number of incidents in a month. Pick one. It has to be a number.

**The loop:** An agent reads your codebase, PR history, and incident reports. It generates a ranked list of "things to fix" with reasoning. It runs experiments: does fixing this actually move the signal? It learns which types of debt matter for your specific system and which don't.

**Oversight:** The engineering team reviews the priority list monthly and decides what to tackle.

**Why it's compelling:** Every engineering team has a backlog of technical debt. The reason it's never "fixed" is partly that the impact isn't obvious — you don't know which debt is actually slowing you down until you've paid it and noticed the difference. The loop makes that difference measurable.

---

### Language Learning

**Signal:** Words per minute read (for reading) or spoken fluency score from a speech app.

**The loop:** An agent designs your weekly practice sessions — which texts to read, which exercises to do, how long to spend on vocabulary vs. grammar vs. production. It adapts based on what the weekly signal tells it.

**Oversight:** Monthly conversation with a human tutor who can flag issues the signal misses (pronunciation, idioms, cultural context).

**Why it's compelling:** Most language learners follow a fixed curriculum regardless of their actual rate of progress in different areas. The loop is continuously asking: where is this person actually getting faster, and where are they stagnating? It's adaptive curriculum design for one.

---

## The Hard Parts Nobody Talks About

A few things that are worth knowing before you go building this:

**The signal is the hard part.** If you can't measure it, you can't optimize it. "User happiness" is not a signal. Daily active users is. "I want to write better" is not a signal. Newsletter open rate is. The authors of *The Goal* called this "you can't improve what you don't measure." The loop makes this more literal than ever.

**The agent needs a narrow surface area.** In Karpathy's setup, the agent can only edit one file: train.py. This is deliberate. If the agent can change everything at once, you get entangled effects that make it impossible to attribute what helped. The best setups give the agent a lever, not a control panel.

**Fixed time budgets beat fixed epochs.** Karpathy runs each experiment for exactly 5 minutes, regardless of what the agent changed. This makes results comparable across changes of architecture, batch size, or anything else. If you let experiments run to completion, you can't fairly compare a change that doubles training speed against one that doesn't.

**Long-running loops are fragile.** One recurring issue in the discourse: agents breaking mid-loop, models that can't follow "loop forever" instructions, or harness failures that waste a night's experiments. The loop's reliability is only as good as the infrastructure underneath it. This is a real engineering problem, not just a research curiosity.

**Some signals have lag.** Your fitness signal (race time) might only move after 4-6 weeks of training. The loop has to be patient — or you need a faster proxy signal (e.g., workout completion rate, perceived exertion). Choosing the right signal — fast enough to iterate, correlated enough to matter — is its own skill.

---

## The Question Worth Asking

Karpathy's tweet was right: *it's worth thinking about whether your problem falls into this bucket.*

The bucket is: **do you have a measurable signal, a system that can be modified iteratively, and enough experiments that the human bottleneck is actually your constraint?**

For most of human history, this combination was rare. The signals existed, but the systems weren't modifiable fast enough, or the experiments took so long that human involvement was inevitable.

That's changing. AI agents can now write and run code. They can modify prompts, APIs, configs, and content. They can run experiments while you sleep. And the cost of running an experiment is dropping fast.

The question isn't really "should AI labs use this for research?" (they will, Karpathy says it's "the final boss battle"). The question is: **what's the version of this for you?**

Because the answer is probably not "train a GPT." The answer is probably something simpler and more personal — something where the loop would have been obvious in retrospect, if you'd thought to look for it.

What are you measuring? What are you not iterating on because it's too tedious? What's the thing you'd learn about yourself if you ran 700 experiments on it?

That's the version worth building.
