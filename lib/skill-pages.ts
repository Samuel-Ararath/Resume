export type SkillSection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export type SkillPage = {
  slug: string
  number: string
  title: string
  subtitle: string
  introduction: string
  sections: SkillSection[]
  equations?: { label: string; formula: string; note: string }[]
  tables?: { heading: string; columns: string[]; rows: string[][] }[]
  references: string[]
}

export const skillPages: SkillPage[] = [
  {
    slug: 'operational-management', number: '01', title: 'Operational Management',
    subtitle: 'Designing the transformation of resources into dependable output.',
    introduction: 'Operational management studies how an organization plans, executes, and improves the transformation of inputs into goods or services. Its central concern is the disciplined balance between capacity, cost, quality, delivery, flexibility, and resource utilization.',
    sections: [
      { title: 'Overview', paragraphs: ['An operation is a system: resources enter, activities transform them, and outputs leave with a measurable level of value and uncertainty. The manager must align process design with demand while protecting flow, safety, reliability, and economic performance.'] },
      { title: 'Core concepts', paragraphs: ['Capacity is the maximum feasible output under defined conditions; utilization compares actual output with design capacity, while efficiency compares actual output with effective capacity. Bottlenecks constrain the throughput of the whole system, which is why local optimization can fail to improve system performance.'], bullets: ['Transformation systems and operations strategy', 'Capacity planning and production scheduling', 'Bottleneck analysis and the Theory of Constraints', 'Maintenance, reliability, and resource availability'] },
      { title: 'Analytical frameworks', paragraphs: ['Little’s Law links work-in-process, throughput, and flow time. OEE decomposes equipment effectiveness into availability, performance, and quality. Together, these models connect shop-floor observations with decisions about scheduling, maintenance, and investment.'] },
      { title: 'Methods and industrial analysis', paragraphs: ['Begin with a process map and a defined unit of analysis. Establish demand, available time, routing, processing time, setup time, yield, and queue policy. Then locate the constraint, distinguish starvation from blockage, and test whether a proposed intervention changes system throughput rather than merely shifting work between stations.'], bullets: ['Demand and capacity characterization', 'Process mapping and time observation', 'Constraint identification and buffer analysis', 'Schedule evaluation using flow time, lateness, and throughput'] },
    ],
    equations: [
      { label: 'Utilization', formula: 'Actual Output / Design Capacity', note: 'Indicates how much of the designed capacity is being used.' },
      { label: 'Little’s Law', formula: 'WIP = Throughput × Flow Time', note: 'Assumes a stable system over the period being analyzed.' },
      { label: 'OEE', formula: 'Availability × Performance × Quality', note: 'A diagnostic decomposition, not a complete measure of business performance.' },
    ],
    references: ['Slack, Brandon-Jones & Burgess, Operations Management.', 'Goldratt & Cox, The Goal: A Process of Ongoing Improvement.', 'Nakajima, Introduction to TPM.'],
  },
  {
    slug: 'risk-performance-management', number: '02', title: 'Risk & Performance Management',
    subtitle: 'Connecting uncertainty, objectives, controls, and feedback.',
    introduction: 'Risk and performance management form a feedback system. Risk analysis asks what may prevent objectives from being achieved; performance management asks how evidence shows whether the system is moving toward those objectives.',
    sections: [
      { title: 'Overview', paragraphs: ['Risk is not synonymous with a bad outcome. It is the effect of uncertainty on objectives, expressed through sources, events, consequences, and controls. A mature system makes assumptions visible and revises decisions as evidence changes.'] },
      { title: 'Core concepts', paragraphs: ['Operational, financial, supply, technology, maintenance, strategic, and business-model risks have different signals and treatments. A risk matrix is useful for communication, but its ordinal scores should not be mistaken for precise probabilities.'], bullets: ['Uncertainty, consequence, exposure, and treatment', 'Leading and lagging indicators', 'Targets, variance, trends, and control limits', 'Scenario, sensitivity, and robustness analysis'] },
      { title: 'Methods & tools', paragraphs: ['FMEA structures failure-mode analysis through severity, occurrence, and detection. Bow-Tie analysis maps causes, a central event, consequences, preventive barriers, and mitigative barriers. Balanced Scorecard thinking broadens performance beyond a single financial measure.'] },
      { title: 'Methods and control design', paragraphs: ['A risk study proceeds from objective definition to hazard identification, cause and consequence analysis, control selection, monitoring, and review. Controls should follow the hierarchy of elimination, substitution, engineering control, administrative control, and personal protection where relevant. Performance indicators should be assigned owners, review frequency, target, and escalation rule.'], bullets: ['Risk register construction and taxonomy', 'FMEA and Bow-Tie analysis', 'Leading versus lagging indicators', 'Scenario and sensitivity analysis'] },
    ],
    equations: [
      { label: 'FMEA priority number', formula: 'RPN = Severity × Occurrence × Detection', note: 'A prioritization aid whose meaning depends on the quality of the scoring process.' },
      { label: 'Availability', formula: 'MTBF / (MTBF + MTTR)', note: 'Shows the proportion of scheduled time a repairable asset is available.' },
    ],
    references: ['ISO 31000, Risk management — Guidelines.', 'IEC 60812, Failure modes and effects analysis.', 'Kaplan & Norton, The Balanced Scorecard.'],
  },
  {
    slug: 'industrial-management', number: '03', title: 'Industrial Management',
    subtitle: 'Coordinating people, processes, technology, capital, and information.',
    introduction: 'Industrial management is the broader coordination discipline surrounding engineered systems. It connects organizational objectives with the daily design of work, assets, decisions, information, and accountability.',
    sections: [
      { title: 'Overview', paragraphs: ['Industrial systems are socio-technical: performance depends on equipment and methods as well as people, communication, incentives, and institutional routines. Management therefore involves both analytical design and responsible coordination.'] },
      { title: 'Core concepts', paragraphs: ['Planning establishes direction; organizing allocates roles and resources; leading coordinates human effort; controlling compares results with objectives and supports corrective action. These functions operate as a cycle rather than a linear checklist.'], bullets: ['Systems thinking and organizational alignment', 'Decision-making under constraints', 'Work design, coordination, and standardization', 'Asset, information, and resource governance'] },
      { title: 'Analytical frameworks', paragraphs: ['Process mapping makes handoffs and waiting visible. Stakeholder analysis identifies who supplies information, bears consequences, or controls resources. A responsibility matrix can clarify accountability without confusing authority with ownership.'] },
      { title: 'Methods and governance', paragraphs: ['Industrial management converts objectives into an operating architecture. The architecture defines decision rights, information flows, standard work, escalation paths, and feedback routines. Its quality can be assessed by whether decisions are timely, responsibilities are unambiguous, resources are traceable, and deviations produce learning rather than repeated firefighting.'], bullets: ['Organization and responsibility design', 'Standard operating procedures', 'Management by information and visual control', 'Coordination across functional boundaries'] },
    ],
    equations: [{ label: 'Productivity', formula: 'Useful Output / Resource Input', note: 'Productivity is a ratio of output to input; it does not by itself establish quality or sustainability.' }],
    tables: [{ heading: 'Management function and operational question', columns: ['Function', 'Operational question'], rows: [['Planning', 'What must be achieved, by when, and with what constraints?'], ['Organizing', 'Which roles, resources, and interfaces are required?'], ['Leading', 'How will people coordinate action and resolve ambiguity?'], ['Controlling', 'What evidence shows deviation and required correction?']] }],
    references: ['Mintzberg, Structure in Fives.', 'Daft, Management.', 'Deming, Out of the Crisis.'],
  },
  {
    slug: 'industrial-economics-finance', number: '04', title: 'Industrial Economics & Finance',
    subtitle: 'Evaluating industrial choices through cost, value, and uncertainty.',
    introduction: 'Industrial economics and finance provide the language for deciding whether a process, asset, or business model creates sufficient value under constraints. The analysis must distinguish accounting categories from economic opportunity and risk.',
    sections: [
      { title: 'Overview', paragraphs: ['Industrial decisions often involve long-lived assets, uncertain demand, maintenance obligations, and competing uses of capital. Economic analysis makes these trade-offs explicit through cash flow, time value, cost behavior, and sensitivity.'] },
      { title: 'Core concepts', paragraphs: ['Fixed and variable costs behave differently as output changes. Break-even analysis supports threshold reasoning, while NPV evaluates the value of future cash flows in present terms. Nominal price, inflation-adjusted equivalent, replacement cost, and book value answer different questions.'] },
      { title: 'Methods and decision analysis', paragraphs: ['Economic evaluation begins by defining alternatives, the base case, the analysis period, the perspective of the decision-maker, and the relevant cash flows. Fixed, variable, sunk, opportunity, and external costs must be separated. Sensitivity analysis then tests which assumptions can change the decision.'], bullets: ['Cost-volume-profit analysis', 'Cash-flow construction and discounting', 'Net present value and internal rate of return', 'Scenario, sensitivity, and break-even analysis'] },
    ],
    equations: [
      { label: 'Break-even quantity', formula: 'Q_BE = Fixed Cost / (Price − Variable Cost per Unit)', note: 'Valid under the assumptions of constant unit price and unit variable cost over the relevant range.' },
      { label: 'Net present value', formula: 'NPV = Σ [CFₜ / (1 + r)ᵗ] − Initial Investment', note: 'The discount rate and cash-flow assumptions should be stated.' },
    ],
    references: ['Brealey, Myers & Allen, Principles of Corporate Finance.', 'Park, Contemporary Engineering Economics.', 'OECD, Cost-Benefit Analysis and the Environment.'],
  },
  {
    slug: 'quality-efficiency-improvement', number: '05', title: 'Quality & Efficiency Improvement',
    subtitle: 'Reducing variation while improving the capability of a process.',
    introduction: 'Quality improvement is the disciplined study of variation, causes, process capability, and customer-relevant outcomes. Efficiency improvement asks how resources can produce more useful output with less waste, delay, and rework.',
    sections: [
      { title: 'Overview', paragraphs: ['A stable process can still be poorly centered, and an efficient process can still produce unacceptable quality. Improvement begins by defining the process, measuring meaningful characteristics, separating common from special causes, and learning through controlled action.'] },
      { title: 'Core concepts', paragraphs: ['Pareto analysis prioritizes a small number of influential causes. Fishbone diagrams organize possible causes; the Five Whys probes causal depth. PDCA and DMAIC provide improvement cycles, while Lean focuses attention on activities that do not create value.'], bullets: ['Statistical Process Control and control charts', 'Process capability and stability', 'First Pass Yield, defect rate, and rework', 'Standard work, SMED, root-cause analysis, and OEE'] },
      { title: 'Methods and improvement cycle', paragraphs: ['A defensible improvement project defines the customer requirement and operational problem before selecting a tool. Baseline data should be stratified by product, shift, machine, operator, or condition when those factors are plausible causes. After a change, the process must be monitored long enough to distinguish improvement from random variation.'], bullets: ['Define and measure the critical-to-quality characteristic', 'Analyze variation and root causes', 'Improve through controlled countermeasures', 'Control through standard work and monitoring'] },
    ],
    equations: [
      { label: 'Process capability', formula: 'Cp = (USL − LSL) / (6σ)', note: 'Assumes a stable process and meaningful specification limits.' },
      { label: 'Centered capability', formula: 'Cpk = min[(USL − μ)/(3σ), (μ − LSL)/(3σ)]', note: 'Accounts for the distance between the process mean and each specification limit.' },
    ],
    references: ['Montgomery, Introduction to Statistical Quality Control.', 'Womack & Jones, Lean Thinking.', 'George, Lean Six Sigma.'],
  },
  {
    slug: 'green-industry', number: '06', title: 'Green Industry',
    subtitle: 'Understanding industrial systems through material, energy, and ecological flows.',
    introduction: 'Green Industry examines how industrial activity can reduce resource intensity and environmental burden while remaining technically and economically credible. It is not a synonym for generic sustainability claims.',
    sections: [
      { title: 'Overview', paragraphs: ['Industrial ecology treats production and consumption as connected material and energy systems. Circular economy, reverse logistics, resource efficiency, and waste hierarchy provide complementary ways to consider prevention, recovery, reuse, and residual management.'] },
      { title: 'Core concepts', paragraphs: ['Material Flow Analysis maps quantities and destinations. Life Cycle Assessment evaluates impacts across a defined system boundary. The result depends on goal, scope, inventory, impact assessment, and interpretation; a narrow intervention may shift rather than remove burden.'], bullets: ['Industrial ecology and circular economy', 'Resource efficiency and material flow', 'Reverse logistics and waste hierarchy', 'Organic waste valorization and by-product utilization'] },
      { title: 'Methods and system boundaries', paragraphs: ['A green-industry analysis defines a functional unit and system boundary before comparing alternatives. It accounts for collection, transport, processing, energy, material substitution, emissions, rejected fractions, and end-of-life flows. Trade-offs must be tested: a recovery process may reduce landfill burden while increasing transport or energy demand.'], bullets: ['Material Flow Analysis', 'Life Cycle Assessment', 'Environmental and economic trade-off analysis', 'Circularity and residual-flow assessment'] },
    ],
    equations: [{ label: 'Material balance', formula: 'Inputs = Useful Outputs + Emissions + Residuals', note: 'A conservation framing; the boundary and measurement basis must be specified.' }, { label: 'Impact intensity', formula: 'Total Impact / Functional Unit', note: 'Allows comparison only when the functional unit and impact method are consistent.' }],
    tables: [{ heading: 'Life Cycle Assessment structure', columns: ['Stage', 'Purpose'], rows: [['Goal & scope', 'Define the question, functional unit, boundary, and assumptions.'], ['Inventory', 'Collect inputs, outputs, energy, materials, and emissions.'], ['Impact assessment', 'Translate inventory flows into selected impact categories.'], ['Interpretation', 'Evaluate findings, limitations, sensitivity, and conclusions.']] }],
    references: ['ISO 14040, Environmental management — Life cycle assessment — Principles and framework.', 'Ellen MacArthur Foundation, Circular economy systems thinking.', 'Graedel & Allenby, Industrial Ecology.'],
  },
  {
    slug: 'technology-valuation-management', number: '07', title: 'Technology Valuation Management',
    subtitle: 'Evaluating technology as an asset across its full economic life.',
    introduction: 'Technology valuation management connects technical feasibility with lifecycle economics, reliability, maintainability, obsolescence, and strategic fit. The value of an asset is therefore more than its purchase price.',
    sections: [
      { title: 'Overview', paragraphs: ['Technology moves through acquisition, commissioning, operation, maintenance, upgrade, obsolescence, and disposal. Each stage changes the cost, capability, risk, and information available to the organization.'] },
      { title: 'Core concepts', paragraphs: ['Technology selection should consider capacity, reliability, maintainability, compatibility, energy requirements, lifecycle cost, and organizational capability. Total Cost of Ownership includes costs that are often invisible in an acquisition-only comparison.'], bullets: ['Technical feasibility and technology lifecycle', 'Lifecycle costing and Total Cost of Ownership', 'Reliability, availability, and maintenance economics', 'Replacement analysis, obsolescence, and technology risk'] },
      { title: 'Methods and lifecycle evaluation', paragraphs: ['Technology valuation compares alternatives over a common time horizon and functional requirement. The analysis combines technical feasibility, reliability, maintainability, capacity, energy, labor, downtime, spare parts, upgradeability, disposal, and residual value. Historical price, book value, replacement cost, and economic value must be reported as distinct measures.'], bullets: ['Requirements and feasibility screening', 'Lifecycle cost and Total Cost of Ownership', 'Reliability-centered maintenance', 'Replacement and obsolescence analysis'] },
    ],
    equations: [{ label: 'Total Cost of Ownership', formula: 'TCO = Acquisition + Operating + Maintenance + Downtime + Disposal', note: 'The categories and time horizon should be defined for each decision.' }],
    references: ['ISO 15686, Buildings and constructed assets — Service life planning.', 'Park, Contemporary Engineering Economics.', 'Blanchard, Logistics Engineering and Management.'],
  },
]

export function getSkillPage(slug: string) {
  return skillPages.find((page) => page.slug === slug)
}
