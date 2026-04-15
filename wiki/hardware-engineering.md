# Hardware Engineering — Reference Wiki

> Curated research on hardware design, semiconductor engineering, PCB design, embedded systems, and hardware startups. Sources from 2024–2026. Last updated: April 2026.

---

## The Big Picture: Why Hardware Is Having a Moment

For most of the 2010s, "software was eating the world." But as of 2025–2026, hardware is eating it right back. Several converging forces explain why:

1. **AI requires purpose-built silicon** — general-purpose CPUs can't efficiently handle the parallel, matrix-heavy workloads of modern AI, creating massive demand for GPUs, NPUs, ASICs, and custom accelerators.
2. **The collapse of the "AI hardware pyramid"** — AI chips are only 0.2% of all chips manufactured, but they account for ~50% of total industry revenue. This extreme ratio is forcing a strategic rethink across the industry. ([HTEC, 2026](https://htec.com/insights/point-of-view/key-trends-shaping-the-semiconductor-industry-in-2026/))
3. **Physical AI is going edge** — robotics, autonomous vehicles, and factory systems all need inference at the point of action, not in a distant data center. The hard problem isn't capable silicon reaching the edge; it's the fragmented, incompatible NPU software ecosystem. ([HTEC, 2026](https://htec.com/insights/point-of-view/key-trends-shaping-the-semiconductor-industry-in-2026/))
4. **Energy is becoming a hard constraint** — gas turbines (the fastest path to new power) are booked through 2028. Data center power availability is now a first-order limiter on AI compute expansion. ([HTEC, 2026](https://htec.com/insights/point-of-view/key-trends-shaping-the-semiconductor-industry-in-2026/))

---

## 1. Semiconductors & Chip Engineering

### Market Size & Growth

- Global semiconductor market: ~$728B (2025) → projected $800B (2026), potentially reaching $975B. ([ACL Digital, 2025](https://www.acldigital.com/blogs/why-2026-will-be-a-breakthrough-year-for-ai-chips-and-semiconductors))
- AI-related semiconductors (accelerators, HBM, networking chips) accounted for nearly **1/3 of total semiconductor sales in 2025**. ([Medium/Adnan Masood, 2026](https://medium.com/@adnanmasood/semiconductors-in-2026-the-ai-driven-upswing-meets-structural-bottlenecks-3568b004905b))
- The global AI chip market is likely to near **$500 billion in 2026**. ([Deloitte, 2026](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-telecom-outlooks/hardware-consumer-tech-outlook.html))
- Hyperscaler capex surge: Amazon, Microsoft, Alphabet, and Meta raised capex ~54% in 2024, adding ~$80B annually. AI spending in 2025 is expected to range from $300B–$335B. ([StartUs Insights, 2026](https://www.startus-insights.com/innovators-guide/semiconductors-trends-innovation/))

### The AI Hardware Pyramid Is Collapsing

The traditional AI semiconductor pyramid — with hundreds of chip companies at the base and a thin layer of scaled production apps at the top — is giving way to a **more balanced structure**: hardware consolidated around dominant software ecosystems, connected to validated end-use applications. The 0.2% / 50% ratio signals where the industry is shifting. Most organizations are still in pilot mode — only 44% of semiconductor leaders have fully embedded AI across multiple functions. ([HTEC, 2026](https://htec.com/insights/point-of-view/key-trends-shaping-the-semiconductor-industry-in-2026/))

### Why the Next NVIDIA Won't Be Decided by Silicon

NVIDIA didn't win because it had the best silicon — it won because of **CUDA**: good enough, early enough, and sticky enough to become the default substrate for AI development. The main barrier facing every custom accelerator today is **software compatibility**, not hardware performance. "Hardware is the innovator. The fast followers and the mainstream will be decided by software." — Craig Melrose, HTEC. ([HTEC, 2026](https://htec.com/insights/point-of-view/key-trends-shaping-the-semiconductor-industry-in-2026/))

### Key Trends

#### Custom Silicon & AI ASICs
- Google's TPUs, Microsoft's Maia, Amazon's Trainium, and NVIDIA's GPUs all represent the hyperscalers' bet on custom silicon. Broadcom reported AI semiconductor revenue of $4.1B (Q1 FY25, +77% YoY) and $4.4B (Q2 FY25, +46% YoY), driven by hyperscaler bespoke ASIC adoption. ([StartUs Insights, 2026](https://www.startus-insights.com/innovators-guide/semiconductors-trends-innovation/))
- NVIDIA's GB200 NVL72 architecture offers up to **30x LLM inference performance** vs. H100. Inference token creation has increased 10x. ([StartUs Insights, 2026](https://www.startus-insights.com/innovators-guide/semiconductors-trends-innovation/))
- AWS Trainium3: multi-petaflop AI accelerator for both training and inference of LLMs and multimodal models, announced at re:Invent 2025. ([Tech Research Online, 2025](https://techresearchonline.com/blog/hardware-tech-breakthroughs/))
- Arm-based servers: expected to reach ~50% of hyperscaler compute by 2025; Arm server shipments growing 70%. ([StartUs Insights, 2026](https://www.startus-insights.com/innovators-guide/semiconductors-trends-innovation/))

#### Chiplets & Advanced Packaging — The Real Moonshot
- The monolithic GPU as the default AI compute platform is ending. Chiplet architectures let companies mix compute, memory, and I/O components from different sources and process nodes.
- Advanced packaging revenue surpassed **$12B in Q2 2025**, expected to reach **$83B by 2030**. The 3D IC and 2.5D IC packaging market is expected to reach **$167.57B by 2034** (10.7% CAGR). ([StartUs Insights, 2026](https://www.startus-insights.com/innovators-guide/semiconductors-trends-innovation/))
- TSMC's CoWoS throughput nearly quadrupling to ~75,000 wafers/month in 2025. CoWoS capacity growing at ~50% CAGR from 2022–2026. ([StartUs Insights, 2026](https://www.startus-insights.com/innovators-guide/semiconductors-trends-innovation/))
- NVIDIA's Blackwell chips are switching to CoWoS-L (from CoWoS-S) for higher-bandwidth, multi-HBM requirements. Packaging remains a bottleneck even after fourfold capacity increases. ([StartUs Insights, 2026](https://www.startus-insights.com/innovators-guide/semiconductors-trends-innovation/))
- Notable companies: **Modular** (chiplet modularity), **D-Matrix** (ultra-low latency memory-compute integration for inference), **SEMIFIVE** (custom silicon platform). ([HTEC, 2026](https://htec.com/insights/point-of-view/key-trends-shaping-the-semiconductor-industry-in-2026/); [StartUs Insights, 2026](https://www.startus-insights.com/innovators-guide/semiconductors-trends-innovation/))
- JetCool: fluid-to-package micro-convective liquid cooling technology — direct-to-chip cooling that eliminates thermal paste and interface materials. ([StartUs Insights, 2026](https://www.startus-insights.com/innovators-guide/semiconductors-trends-innovation/))

#### High Bandwidth Memory (HBM)
- HBM revenue expected to nearly **double in 2025 to ~$34B**. Already ~20% of DRAM sales by value and capacity. ([StartUs Insights, 2026](https://www.startus-insights.com/innovators-guide/semiconductors-trends-innovation/))
- HBM's proportion of DRAM value/capacity is growing rapidly due to its pivotal role in AI accelerators.
- Memory is in a **super-cycle phase**: suppliers prioritize HBM for AI servers, tightening conventional DRAM supply and pushing prices up — creating a "memory tax" that ripples outward to PCs and consumer devices. ([Medium, 2026](https://medium.com/@adnanmasood/semiconductors-in-2026-the-ai-driven-upswing-meets-structural-bottlenecks-3568b004905b))
- **High Bandwidth Flash (HBF)** may emerge as an alternative to HBM in integrated AI systems for inference — promising 8–16x more capacity at roughly the same cost as HBM. ([Deloitte, 2026](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-telecom-outlooks/hardware-consumer-tech-outlook.html))

#### The 2nm Race & Angstrom-Class Nodes
- TSMC, Samsung, and Intel are all in the 2nm (and "Angstrom-class") race with GAA/nanosheet transistors entering production/ramp.
- Intel promoting **Foveros Direct** (Cu-Cu hybrid bonding) as part of its advanced packaging strategy.
- Backside power delivery and **High-NA EUV** lithography are the next definitional manufacturing frontiers.

### Notable 2025 Chip Releases

| Chip | Company | Key Detail |
|------|---------|------------|
| AMD Ryzen 9 9950X3D | AMD | 2nd-gen 3D V-Cache, Zen 5, 16 cores — gaming/ productivity leader |
| Apple M5 | Apple | 3nm, next-gen Neural Engine, unified memory bandwidth, spatial computing GPU |
| NVIDIA RTX 50-Series (Blackwell) | NVIDIA | GDDR7, DLSS 4.0, Neural Shader Engines — first consumer AI-native GPU |
| Qualcomm Snapdragon X2 Elite/Extreme | Qualcomm | ARM-based Windows laptops, powerful Hexagon NPUs |
| AWS Graviton5 | Amazon | Most powerful ARM-based cloud CPU; EC2 M9g instances |
| QpiAI-Indus | QpiAI (India) | 25-qubit superconducting quantum computer, National Quantum Mission |

---

## 2. PCB Design & Manufacturing

### Market Overview
- Global PCB market: **~$89–91B in 2025**, growing 3.5–4.2% YoY (improved from 2.1% in 2024). Expected to exceed **$95B in 2026** (4.5–5.5% growth). ([Han Sphere, 2025](https://www.han-sphere.com/blog/news/2025-pcb-industry-review-and-2026-outlook/))
- China maintains ~46–48% of global output (~$42–44B). Southeast Asia (Vietnam, Thailand) growing 8–10% due to supply chain diversification. ([Han Sphere, 2025](https://www.han-sphere.com/blog/news/2025-pcb-industry-review-and-2026-outlook/))

### Technology Structure Shifts

| Segment | 2025 Share | Growth |
|---------|-----------|--------|
| Traditional Multilayer Boards | 45% | +1.8% |
| HDI / Any-Layer HDI | 28% | +5.2% |
| IC Substrates | Growing fastest | +12.5% (AI/HBM demand) |
| Flexible/Rigid-Flex | Growing | +6.8% |

- **IC Substrates** are the fastest-growing sector, fueled by explosive demand for AI chips and HBM memory. This is a critical bottleneck for advanced packaging.
- **AI infrastructure** is driving 3–5x unit price premiums on high-end PCBs for AI servers and switches vs. standard servers. ([Han Sphere, 2025](https://www.han-sphere.com/blog/news/2025-pcb-industry-review-and-2026-outlook/))

### Key PCB Design Trends (2025–2026)

1. **Higher Density Interconnects**: Line width/spacing moving toward 15/15μm with wider adoption of **mSAP (modified Semi-Additive Process)**.
2. **Signal Integrity at 800G/112G**: Requirements for 800G optical modules and 112G high-speed transmission are placing new demands on PCB design.
3. **Low-Loss Materials**: Increasing penetration of low-loss materials (low Dk/Df) for high-frequency applications.
4. **Embedded Cavities**: Growing use of embedded passive and active components to save board area.
5. **AI PCs and AI Smartphones**: Driving motherboard upgrades with 20–30% unit price increases. Average smartphone PCB layer count: 10–12 layers.
6. **Automotive Zonal Architectures**: Adoption of zonal controller architectures is promoting higher PCB layer counts and HDI usage. ADAS sensor boards (millimeter-wave radar) showing particularly strong growth.
7. **Heavy-Copper Boards**: Growing 9% for PV inverters and energy storage systems.

### Practical PCB Design Notes
- **Design for Manufacturing (DFM)** is increasingly critical for embedded systems — balancing design intent with mass producibility and supply chain constraints. ([Titoma, 2026](https://titoma.com/blog/embedded-systems-in-2026-core-components-for-dfm/))
- Top PCB design software for 2025–2026: KiCad (open source), Altium Designer, Eagle (Autodesk), Cadence Allegro, Mentor Graphics (Siemens). ([Dev.to, 2026](https://dev.to/frank_1871bc3c55f35370df3/top-pcb-design-software-2025-2026-a-practical-guide-for-engineers-1dh1))
- **Key challenge**: AI at the edge requires boards that can handle increased power density while maintaining signal integrity — a non-trivial tradeoff as speeds increase. ([Han Sphere, 2025](https://www.han-sphere.com/blog/news/2025-pcb-industry-review-and-2026-outlook/))

---

## 3. Embedded Systems

### The Embedded Landscape in 2026

Embedded systems are undergoing a quiet revolution as AI moves from cloud to edge. The core shift: inference that used to require a data center now needs to happen in milliwatts inside a device. ([Titoma, 2026](https://titoma.com/blog/embedded-systems-in-2026-core-components-for-dfm/))

### Key Drivers

- **Edge AI**: NPUs (Neural Processing Units) are now in cameras, wearables, smart home devices, and industrial equipment — enabling real-time inference without cloud connectivity.
- **Physical AI**: Robotics, autonomous vehicles, and factory floor systems all need local, real-time inference. A humanoid robot cannot wait for a cloud round-trip.
- **Power Efficiency**: "Physical AI will be majority edge." The hard problem isn't getting capable silicon to the edge — it's getting software to run correctly across the deeply fragmented NPU landscape (AMD, Intel, Qualcomm, Apple, and dozens of others with incompatible architectures). ([HTEC, 2026](https://htec.com/insights/point-of-view/key-trends-shaping-the-semiconductor-industry-in-2026/))

### 2025 Embedded Milestones

- **AI NPUs in edge devices**: Cameras, wearables, smart home devices now ship with real-time inference, on-device object detection, and zero-cloud-dependency security monitoring.
- **Wearables outperform expectations**: 136.5M units shipped Q2 2025 (+9.6% YoY). The category is maturing beyond wrist-worn fitness trackers toward AI-enhanced, health-centered, diversified form factors (smart rings, portable ECGs).
- **Embedded systems design for mass production**: Focus on DFM (Design for Manufacturing) and supply chain resilience is now a first-order concern for hardware teams. ([Titoma, 2026](https://titoma.com/blog/embedded-systems-in-2026-core-components-for-dfm/))
- **Bluetooth Channel Sounding**: Featured in Embedded.com's top 10 articles of 2025 — enabling centimeter-level location accuracy for embedded Bluetooth devices.

---

## 4. Hardware Startups Worth Watching

The hardware startup ecosystem has matured significantly. AI, quantum computing, and advanced manufacturing are attracting serious capital.

### Notable Startups

| Company | Sector | Notes |
|---------|--------|-------|
| **Cerebras** | AI HW | $2.8B raised — wafer-scale engine for AI training |
| **PsiQuantum** | Quantum | $2.2B raised — photonic quantum computing |
| **Rebellions** (Korea) | AI Accelerators | Domain-specific AI processors bridging silicon arch and deep learning algorithms |
| **SEMIFIVE** (Korea) | Custom Silicon | Purpose-built custom silicon platform; integrates with silicon-proven IPs |
| **D-Matrix** | AI Inference | Ultra-low latency memory-compute integration for video generation and prompt processing |
| **Modular** | Chiplets | Building chiplets and modular hardware that redefines what "a chip" means |
| **TSD Semiconductor** (China) | Advanced Packaging | Wafer grinding, lapping, polishing machines for chip thinning |
| **JetCool** (US) | Thermal Management | Micro-convective liquid cooling — direct-to-chip, eliminates thermal paste |
| **Humane** | Consumer AI HW | AI Pin — controversial but signals new category of ambient AI hardware |
| **Anduril** | Defense Tech | Autonomous systems, drones, defense hardware |

### The Hardware Startup Renaissance

- Hardware startups are "finally investable again" — a new generation of engineers is combining AI, advanced robotics, and space-age materials to build companies VCs are increasingly willing to fund. ([YouTube/BuiltIn, 2026](https://www.youtube.com/watch?v=Kh-sHbAts8Q))
- Y Combinator has 112 hardware startups in its portfolio. Top investors include Sequoia, A16Z, and Benchmark. ([Y Combinator](https://www.ycombinator.com/companies/industry/hardware))
- Key lesson from 2025 hardware founders: hardware-software co-design from day one is non-negotiable. The companies that figure out how to make AI work in the physical world understood that hardware and software were never separate problems. ([Medium/Aleksandar Tisma, 2025](https://medium.com/@aleksandar.tisma/hardware-startups-in-2025-what-i-wish-i-knew-before-i-began-90716fc8a00d))

---

## 5. Data Center Hardware & AI Infrastructure

### The Data Center Reinvention

AI workloads are forcing a complete rethink of data center architecture. Traditional racks used <10kW; next-gen AI racks are operating at **370kW in 2026**. Liquid cooling is rapidly becoming a necessity, not a luxury.

- AI server power supply market: **$1.5B (2024) → $31B (2028)** — a 20x jump. ([Deloitte, 2026](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-telecom-outlooks/hardware-consumer-tech-outlook.html))
- Liquid cooling market: **$300M (2024) → $30B (2028)** — a 100x jump. ([Deloitte, 2026](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-telecom-outlooks/hardware-consumer-tech-outlook.html))
- Rack power is moving from 54-volt in-rack distribution to much higher voltages as megawatt-scale racks become standard.
- **High-speed optics ( fiber)**: shifting from copper-based Ethernet/InfiniBand. Gen AI networking equipment: **$8B (2023) → $34B (2028)**. ([Deloitte, 2026](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-telecom-outlooks/hardware-consumer-tech-outlook.html))

### Server Market Dynamics
- Global server market: ~$455B in 2025, growing ~80% YoY — nearly doubling from a year earlier. AI-optimized servers (non-x86) growing ~169% vs. x86 server growth of ~58%. ([Deloitte, 2026](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-telecom-outlooks/hardware-consumer-tech-outlook.html))
- AI servers now account for **20–70% of revenues** for selected major hardware makers. ([Deloitte, 2026](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-telecom-outlooks/hardware-consumer-tech-outlook.html))
- Key AI server OEMs/ODMs: Cisco, Dell, HPE, Lenovo, Supermicro. Key AI EMS players: Foxconn, Luxshare, Pegatron, Quanta, Wistron. ([Deloitte, 2026](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-telecom-outlooks/hardware-consumer-tech-outlook.html))

### Energy Constraint — The Existential Risk
- Gas turbines (fastest path to new power) are booked through **2028**. Power availability is a hard constraint on data center expansion.
- IEA: AI is the **main factor** driving the increase in data center power consumption worldwide. ([StartUs Insights, 2026](https://www.startus-insights.com/innovators-guide/semiconductors-trends-innovation/))
- Organizations building in resilience now (through edge deployment and workload prioritization) will be better positioned as these constraints intensify.

---

## 6. Key Trends & Innovations (Synthesized)

### From "More FLOPS" to "Right-Sized Inference"
The buying conversation is shifting from peak compute performance to **FLOPS-per-watt, latency-per-query, and cost-per-inference**. Software-level inference optimization — model distillation, quantization, compiler tuning — is where meaningful performance gains come from in 2026–2027. A well-optimized smaller model on efficient silicon beats an over-specified model on a power-hungry chip in almost every production scenario. ([HTEC, 2026](https://htec.com/insights/point-of-view/key-trends-shaping-the-semiconductor-industry-in-2026/))

### Physical AI > Data AI in 2026
The next wave of AI chip demand comes from AI embedded in physical systems — robots, vehicles, factories, consumer devices. These require local, real-time inference, power efficiency, domain-specific software stacks, and reliability in environments nothing like a controlled data center. They're also the applications the current software tooling is least prepared to serve.

### Hardware-Software Convergence
The survivors in AI silicon share traits: deep software investment, focus on specific high-value workloads, and a validated deployment model. An accelerator 30% faster at a workload nobody runs in production is not a business. An accelerator 20% more efficient at video inference at the edge, with a full software stack and proven deployment path, is.

### Automotive Semiconductor Structural Growth
ADAS, EVs, and zonal vehicle architectures are increasing chip content per vehicle — a structural growth engine independent of the AI cycle. SiC (silicon carbide) and GaN (gallium nitride) power semiconductors are becoming the backbone for EVs, charging infrastructure, renewables, and AI-class data centers.

---

## 7. Useful Resources & References

### Industry Analysis
- [HTEC — Key Trends Shaping the Semiconductor Industry in 2026](https://htec.com/insights/point-of-view/key-trends-shaping-the-semiconductor-industry-in-2026/) — Excellent synthesis from 250 C-level semiconductor leader survey
- [Deloitte — 2026 Global Hardware and Consumer Tech Industry Outlook](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-telecom-outlooks/hardware-consumer-tech-outlook.html) — Comprehensive market data
- [StartUs Insights — Top 10 Semiconductor Trends in 2026](https://www.startus-insights.com/innovators-guide/semiconductors-trends-innovation/) — Startup-heavy, innovation-focused analysis
- [Tech Research Online — 2025 Hardware Tech Recap](https://techresearchonline.com/blog/hardware-tech-breakthroughs/) — Year-in-review of 2025 hardware breakthroughs
- [Han Sphere — 2025 PCB Industry Review and 2026 Outlook](https://www.han-sphere.com/blog/news/2025-pcb-industry-review-and-2026-outlook/) — Deep dive on PCB market

### Technical Publications
- [SemiEngineering.com](https://semiengineering.com/) — Deep technical insights for chip engineers
- [Embedded.com — Top 10 Articles of 2025](https://www.embedded.com/top-10-articles-of-2025/) — Embedded systems focus
- [Stanford SETR — Semiconductors 2026](https://setr.stanford.edu/technology/semiconductors/2026) — Academic perspective

### Hardware Startups
- [Seedtable — 69 Best Hardware Startups to Watch in 2026](https://www.seedtable.com/best-hardware-startups)
- [Y Combinator — Hardware Startups](https://www.ycombinator.com/companies/industry/hardware)
- [Failory — Top 100 Hardware Startups 2026](https://www.failory.com/startups/hardware)

---

*Maintained by Claw. Sources checked April 2026. If you spot outdated info or want a deeper dive on any section, flag it.*
