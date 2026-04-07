# Some Things Just Take Time — HN Discussion Wiki

**Source:** [HN #47467537](https://news.ycombinator.com/item?id=47467537) | [Original Article](https://lucumr.pocoo.org/2026/3/20/some-things-just-take-time/) (Armin Ronacher, pocoo.org)
**Date:** Article published March 20, 2026 | HN thread active ~16 days ago
**Score:** 853 points | 273 comments

---

## What It's About

Armin Ronacher's essay on why **time and patience are irreplaceable** in building software, companies, and communities — and how AI-driven speed culture threatens that. Core metaphor: you can't mass-produce a 50-year-old oak. Key themes:

- **Velocity ≠ Speed**: AI accelerates execution but can't fix misaligned direction. Speed only helps if you're heading the right way.
- **Friction is intentional**: Cooling-off periods, compliance, code review — these exist for good reasons. Removing them is often destructive.
- **The shelf-life problem**: Software created today decays in months, not decades. Projects abandon customers without proper shutdowns.
- **Time can't be banked**: AI saves time, but that time immediately gets filled with more output. No competitive advantage to be had by going faster.
- **Tenacity > talent**: Long-term commitment (10+ years on a project) creates roots deeper than any day's enthusiasm.

---

## Key Insights Worth Filing

### 1. The "velocity is a vector" framing cuts through AI hype
> *Increased speed only gets us where we want to be sooner if we are also heading in the right direction. If we're far enough off course, increasing speed becomes counterproductive.*

— Chris_Newton (top-scoring comment). This became the thread's most-cited line. Applies to agentic AI workflows: they can go fast *and* wrong, compounding errors faster.

### 2. Senior devs feel more productive with LLMs but are actually less productive
A study from 2024 keeps getting referenced: senior developers feel significantly more productive with LLMs but objective measures show they're less so — even after being told the results. johnnyanmac: *"I wonder if this 'quality' code wouldn't have that many bugs to dive into if it was more carefully considered and produced up front?"*

### 3. LLMs have "intrinsic character" — use 2-of-3 across providers
ramshanker: runs the same prompt through ChatGPT/Gemini/Grok, takes the consensus of 2/3. *"All leading AI seems to have some blind spot. Like some kind of intrinsic character."* Getting code through all 3 before committing has shown excellent results.

### 4. Deep thinking before AI acceleration — the 10-year project story
siddboots worked on a side project for ~10 years (intermittently, conceptual). Used LLMs recently to accelerate prototyping — now close to finished. *"If I hadn't had that slow burn of mostly just thinking about it conceptually for 10 years, I would have ended up vibe coding a much worse product."*

TheJord: *"10 years of thinking before shipping is actually the move. The AI just becomes a power tool — useless if you don't know what you're building, unstoppable if you do."*

### 5. Theory of Constraints: AI removes one bottleneck, another appears
alexpotato building a Sid Meier's Pirates clone with AI: PoC fast, story paths fast, but *playtesting and user feedback still happen at human speed.* Always another bottleneck.

### 6. "Build fast to fail fast" is only good for the company, bad for users
msteffen: *"having a new piece of shit foisted on you twice a day so that some garbage PM can 'build user empathy' gets old really fast."* ffsm8: *"Especially in the B2B context stability is massively underrated."*

### 7. The "wannabe application" test
ozim joke: *"I was able to vibecode those 5 apps I always wanted... it is so different now because — I don't have time to use them."* The insight: if you don't have time to build an idea, that's a clear signal the idea isn't actually useful. Time allocation reveals true priority.

### 8. LLMs don't clarify bad assumptions — they barrel ahead
nprateem: *"The biggest problem is the fact they DON'T clarify their stupid assumptions. The number of times I've seen them get the wrong end of the stick in their COT is ridiculous."* Even with explicit instructions to wait for approval, they go down blind alleys after 2-3 follow-ups.

### 9. "Bad leaders exposed by AI" theory
_doctor_love: *"Our industry has chased magnitude over all else for so long. Now we can put nitro in everyone's car... Suddenly bad direction-setting is getting feedback where there used to be friction and natural time to steer. My greatest hope is that a ton of bad leaders and middle managers end up finally getting exposed due to the advent of AI."*

### 10. The Cynefin framework as a practical antidote
diatone plugs Dave Snowden's Cynefin framework for deciding when to plan rigorously vs. when to probe-test-backtrack. Helps practitioners choose: *"It doesn't have to be hard to choose whether or not rigorous planning is appropriate for the task at hand."*

### 11. Interactive > agentic for quality work
ChrisMarshallNY (experienced dev): works interactively with chat interface, bins whole hours of failed LLM sessions, but the overall workflow still saves 10x time. *"I just use it as I would a coding partner, who knows a lot, is a bit obsessive, and does things quickly."*

### 12. Product design: be a user, not just an observer
js8: *"Don't wait for feedback from 'real users', become a user! This tayloristic idea (which has now reincarnated in 'design thinking') that you can observe someone doing a job and then decide better than them what they need is ridiculous."* Counter from bluGill: domain knowledge gaps make this impossible for complex fields (rockets, medicine).

---

## Notable Quotes

| Quote | Author |
|-------|--------|
| "Velocity is a vector. It has magnitude (aka speed) and direction." | Chris_Newton |
| "AI just becomes a power tool — useless if you don't know what you're building, unstoppable if you do." | TheJord |
| "Speed cannot replace product vision and discipline." | overfeed |
| "The things I value most — the projects, the relationships, the communities — are all things that took years to become what they are." | Armin Ronacher |
| "There is no easy way to bank the time and it just disappears." | Armin Ronacher |
| "Nobody is going to mass-produce a 50-year-old oak." | Armin Ronacher |

---

## Related Reading

- [The Hidden Danger of Shipping Fast](https://newsletter.posthog.com/p/the-hidden-danger-of-shipping-fast) — PostHog newsletter (referenced by Ezra + gopalv)
- [Cynefin Framework](https://en.wikipedia.org/wiki/Cynefin_framework) — Dave Snowden's sense-making taxonomy

---

## Tags

#ai #software-development #LLMs #product velocity #tech-industry #velocity-is-a-vector
