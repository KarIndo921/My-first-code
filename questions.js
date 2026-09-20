// Auto-generated question bank — Claude Certified Associate Foundations practice exam
const QUESTION_BANK = [
 {
  "id": 1,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "A senior project coordinator has been asked to use Claude to produce an end-of-year report covering finance, operations, and customer outcomes. The three areas have separate data owners and separate source documents. Which decomposition approach is most likely to produce a strong report?",
  "options": [
   {
    "key": "A",
    "text": "Define the report goals, gather inputs per section, draft each section in its own prompt, then synthesize the executive summary from the drafted sections.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Draft the executive summary first to anchor the report's narrative, then draft each section so it supports the summary already written.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Draft the three sections in parallel, each using a section-specific prompt, then concatenate and lightly edit the outputs into the final report.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Prompt Claude once with all source documents and request the full report, including the executive summary, in a single pass.",
    "correct": false
   }
  ]
 },
 {
  "id": 2,
  "section": "Communication & Stakeholder Adaptation",
  "type": "multi",
  "prompt": "You are an operations lead mapping production tasks to Claude model strengths to set realistic expectations. Which two production tasks fit Claude's strengths most clearly? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "synthesizing a single executive summary across many long source documents",
    "correct": true
   },
   {
    "key": "B",
    "text": "calculating the precise settlement value of a derivative contract using live market inputs",
    "correct": false
   },
   {
    "key": "C",
    "text": "monitoring a live sensor data stream and flagging anomalies as they occur in real time",
    "correct": false
   },
   {
    "key": "D",
    "text": "issuing a binding legal determination based solely on Claude's analysis of case documents",
    "correct": false
   },
   {
    "key": "E",
    "text": "drafting a tone-and-audience-aware customer-facing email under human review",
    "correct": true
   }
  ]
 },
 {
  "id": 3,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are a Claude associate troubleshooting a recurring poor output. Which is the correct order of diagnostic steps?\n(1) Form a hypothesis about which prompt element most likely caused the deficiency.\n(2) Apply a single targeted change and observe the effect on the output.\n(3) Read the output end to end and identify the specific deficiency.\n(4) Compare the deficient output to the prompt to spot mismatches between input and output.\n(5) Document the root cause and the resolution for future reference.",
  "options": [
   {
    "key": "A",
    "text": "3, 4, 1, 2, 5",
    "correct": true
   },
   {
    "key": "B",
    "text": "1, 3, 4, 2, 5",
    "correct": false
   },
   {
    "key": "C",
    "text": "3, 1, 4, 2, 5",
    "correct": false
   },
   {
    "key": "D",
    "text": "4, 3, 1, 2, 5",
    "correct": false
   }
  ]
 },
 {
  "id": 4,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "multi",
  "prompt": "You are evaluating proposed workflow changes against whether they meaningfully improve the workflow. Which two proposed changes meaningfully improve a recurring Claude workflow? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "reorganizing the workflow document's section headings to improve navigation",
    "correct": false
   },
   {
    "key": "B",
    "text": "labeling each workflow step with descriptive names to improve readability for new team members",
    "correct": false
   },
   {
    "key": "C",
    "text": "updating the team's shared workspace name to reflect the new workflow process",
    "correct": false
   },
   {
    "key": "D",
    "text": "adding a quality check on outputs before they enter the downstream process",
    "correct": true
   },
   {
    "key": "E",
    "text": "extracting the standard reference material into a Project to avoid repeating it",
    "correct": true
   }
  ]
 },
 {
  "id": 5,
  "section": "Model Selection & Capabilities",
  "type": "multi",
  "prompt": "You are an HR specialist reviewing model choices made by colleagues for various tasks. Which two model choices represent appropriate matches between the model and the task? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "a higher-capability model selected solely because it is the most expensive option",
    "correct": false
   },
   {
    "key": "B",
    "text": "a higher-capability model for complex multi-step legal reasoning under review",
    "correct": true
   },
   {
    "key": "C",
    "text": "a lighter, faster model for nuanced multi-document strategic synthesis",
    "correct": false
   },
   {
    "key": "D",
    "text": "a lighter, faster model for routine FAQ-style replies under tight latency budgets",
    "correct": true
   },
   {
    "key": "E",
    "text": "a higher-capability model for one-line keyword extraction at high request volume",
    "correct": false
   }
  ]
 },
 {
  "id": 6,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "A knowledge worker often switches between Claude and another AI service while working on a long-running project. Which Claude feature most directly reduces repetitive context-setting between sessions?",
  "options": [
   {
    "key": "A",
    "text": "Rely on a single static Artifact pasted into each chat as the only continuity mechanism, ignoring the Memory feature that is purpose-built for retaining work-relevant context across sessions.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Disable Memory entirely and re-paste the same context paragraphs at the start of every Claude session, even though Memory is designed to retain that context across conversations automatically.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Open every Claude session in Incognito mode, which prevents the conversation from contributing to Memory and therefore eliminates the cross-session continuity the project would benefit from.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Enable Memory and use the import capability to bring relevant context from the other AI service into Claude as a starting point for the project's work.",
    "correct": true
   }
  ]
 },
 {
  "id": 7,
  "section": "Workflow Integration & Process Design",
  "type": "single",
  "prompt": "You are a process consultant integrating Claude into an existing weekly workflow. Which is the correct order of integration steps?\n(1) Pilot the integrated workflow with a small group and gather feedback.\n(2) Document the current workflow steps, owners, and decision points.\n(3) Update the documented workflow and roll it out to the broader team.\n(4) Identify the steps where Claude can augment work and where humans must remain.\n(5) Define the inputs Claude needs, the outputs Claude returns, and the hand-offs around each step.",
  "options": [
   {
    "key": "A",
    "text": "2, 4, 5, 1, 3",
    "correct": true
   },
   {
    "key": "B",
    "text": "2, 5, 4, 1, 3",
    "correct": false
   },
   {
    "key": "C",
    "text": "1, 2, 4, 5, 3",
    "correct": false
   },
   {
    "key": "D",
    "text": "4, 2, 5, 1, 3",
    "correct": false
   }
  ]
 },
 {
  "id": 8,
  "section": "Workflow Integration & Process Design",
  "type": "single",
  "prompt": "A Claude associate is incorporating reviewer feedback that named two specific issues with a Claude-drafted brief. The rest of the brief was accepted as written. Which next step is most likely to produce a strong revision?",
  "options": [
   {
    "key": "A",
    "text": "Address the two specific issues and also revise unrelated sections to maintain a consistent voice across the brief after the edits.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Rewrite the brief from scratch incorporating the two specific issues, since starting fresh integrates the feedback more cleanly than targeted edits.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Address the two specific issues directly, leave unrelated parts unchanged, and document the changes for the next review.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Address the two specific issues and add a third improvement the associate identified, since combining reviewer feedback with self-identified improvements is more efficient.",
    "correct": false
   }
  ]
 },
 {
  "id": 9,
  "section": "Output Evaluation & Validation",
  "type": "single",
  "prompt": "An associate is responding to an executive who claims Claude will eliminate the need for any human review on customer-facing content. The executive is the budget approver for the team's AI tools. Which response is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Acknowledge the productivity gains, then explain that human review remains essential on customer-facing content because of accuracy and brand risk, with specific examples.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Defer to the executive's authority and remove the human review step from customer-facing content, monitoring the results closely for the first several weeks.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Escalate the executive's claim to a senior leader outside the team before responding directly, since the issue affects more than just the associate's team.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Pilot the executive's proposal on a low-risk subset of customer-facing content first, and use the pilot results to make the case for retaining human review on higher-risk content.",
    "correct": false
   }
  ]
 },
 {
  "id": 10,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "An HR business partner is configuring a new Project for recurring policy questions from managers. The Project will be used across many chats by several HR team members. Which content belongs in the Project knowledge base?",
  "options": [
   {
    "key": "A",
    "text": "the current employee handbook, the leveling guide, the policies-FAQ, and every email the HR team has sent about policy in the past year, for additional context",
    "correct": false
   },
   {
    "key": "B",
    "text": "the current employee handbook only, with the leveling guide and the policies-FAQ attached at the start of each chat as needed for that chat's topic",
    "correct": false
   },
   {
    "key": "C",
    "text": "the current employee handbook plus prior versions of the handbook going back five years, so Claude can answer questions about how policies have changed",
    "correct": false
   },
   {
    "key": "D",
    "text": "the current employee handbook, the leveling guide, and the policies-FAQ document referenced across the Project's chats",
    "correct": true
   }
  ]
 },
 {
  "id": 11,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "A support representative is configuring a Project for drafting customer-facing apology emails after service outages. The current custom instructions tell Claude to \"be empathetic and casual, keep it short, and offer a goodwill credit.\" The customer-service team has flagged that recent drafts have been too brief, have offered goodwill credits in cases where policy does not allow them, and have used contractions that the brand voice guide prohibits. Which adjustment best aligns the configuration to the use case?",
  "options": [
   {
    "key": "A",
    "text": "Move the brand voice guide and the goodwill-credit policy into the Project knowledge base and rely on the documents alone to govern tone, length, and credit decisions, without changing the custom instructions.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Replace \"be empathetic and casual\" with \"match the brand voice guide,\" remove the instruction to offer goodwill credits, and let each draft determine its own length based on the incident.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Keep the existing instructions and add a sentence telling Claude to consult the brand voice guide and the goodwill-credit policy that are attached to the Project knowledge base.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Specify the brand voice attributes (empathetic, formal, no contractions), set a minimum length, and instruct Claude to recommend a goodwill credit only when the attached eligibility policy permits one.",
    "correct": true
   }
  ]
 },
 {
  "id": 12,
  "section": "Workflow Integration & Process Design",
  "type": "single",
  "prompt": "You are an operations lead integrating Claude into a multi-person team workflow. Which integration step should be performed first?",
  "options": [
   {
    "key": "A",
    "text": "Document the integrated workflow and onboard the rest of the team to it.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Iterate the integrated workflow based on the findings from the pilot.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Identify where Claude adds value and where each handoff to a human occurs.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Pilot the integrated workflow with a small group on representative work.",
    "correct": false
   }
  ]
 },
 {
  "id": 13,
  "section": "Governance, Ethics & Responsible Use",
  "type": "single",
  "prompt": "A knowledge worker is explaining the purpose of an organizational AI governance framework to a colleague. Which description is most accurate?",
  "options": [
   {
    "key": "A",
    "text": "A governance framework documents the AI policies the organization is legally required to adopt, focusing on regulatory compliance rather than day-to-day use.",
    "correct": false
   },
   {
    "key": "B",
    "text": "A governance framework defines approved tools, allowed data, required reviews, and reporting paths so AI is used consistently and accountably.",
    "correct": true
   },
   {
    "key": "C",
    "text": "A governance framework lists the AI tools the organization licenses and the cost of each, so users can pick the most cost-effective tool for each task.",
    "correct": false
   },
   {
    "key": "D",
    "text": "A governance framework defines the training every employee must complete before using AI tools, with separate requirements for each tool the organization licenses.",
    "correct": false
   }
  ]
 },
 {
  "id": 14,
  "section": "Governance, Ethics & Responsible Use",
  "type": "single",
  "prompt": "An HR associate is preparing to use Claude on a sensitive personnel matter. The organization's AI policy explicitly states that information related to ongoing investigations must not be entered into AI tools. Which response best aligns with the policy?",
  "options": [
   {
    "key": "A",
    "text": "Enter a paraphrased version of the investigation-related information that removes identifying details, since paraphrasing addresses the spirit of the policy.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Enter the investigation-related information into Claude in an Incognito chat, since Incognito chats do not retain information and therefore fall outside the policy's intent.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Refrain from entering investigation-related information into Claude and consult HR leadership for an approved alternative way to handle the matter.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Enter the investigation-related information into Claude only after the investigation closes, since the policy applies during the investigation period.",
    "correct": false
   }
  ]
 },
 {
  "id": 15,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are an analyst reviewing a Claude response that addresses two of three required questions and skips the third. Which prompt element most likely needs strengthening?",
  "options": [
   {
    "key": "A",
    "text": "The output format should be revised to allow Claude to determine the appropriate structure for each question's answer.",
    "correct": false
   },
   {
    "key": "B",
    "text": "The task statement should explicitly enumerate the three required questions and require an answer to each.",
    "correct": true
   },
   {
    "key": "C",
    "text": "The context provided to Claude should be expanded with additional background detail about the subject matter.",
    "correct": false
   },
   {
    "key": "D",
    "text": "The role assigned to Claude should be changed to a more specialized expert persona to increase response depth.",
    "correct": false
   }
  ]
 },
 {
  "id": 16,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are running a weekly feedback-and-adjustment cycle. Which is the correct order of cycle steps?\n(1) Translate feedback into one or two targeted adjustments for the next cycle.\n(2) Run the next cycle and compare results against the prior cycle.\n(3) Capture the specific feedback received during the review.\n(4) Document what changed, what effect it produced, and any remaining issues.\n(5) Decide whether to continue iterating, switch approach, or escalate.",
  "options": [
   {
    "key": "A",
    "text": "3, 1, 2, 4, 5",
    "correct": true
   },
   {
    "key": "B",
    "text": "1, 3, 2, 4, 5",
    "correct": false
   },
   {
    "key": "C",
    "text": "3, 2, 1, 4, 5",
    "correct": false
   },
   {
    "key": "D",
    "text": "2, 3, 1, 4, 5",
    "correct": false
   }
  ]
 },
 {
  "id": 17,
  "section": "Communication & Stakeholder Adaptation",
  "type": "single",
  "prompt": "A communications manager is drafting a prompt for Claude to produce a quarterly newsletter for store managers in three regions. The agreed key messages, regional details, and a prior newsletter the team liked are all available. Which prompt approach is most likely to produce a usable first draft?",
  "options": [
   {
    "key": "A",
    "text": "Attach the prior newsletter and the agreed key messages, and ask Claude to produce a similar newsletter for this quarter.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Attach the prior newsletter, and ask Claude to match its tone and structure while incorporating the new key messages for the three named regions.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Provide the agreed key messages and the three regions, and ask Claude to choose an appropriate length and tone for store managers.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Name the audience, the three regions, the length, the tone, and the agreed key messages, and reference the prior newsletter only as a tone example.",
    "correct": true
   }
  ]
 },
 {
  "id": 18,
  "section": "Output Evaluation & Validation",
  "type": "single",
  "prompt": "You are sorting Claude output structural defects by which most undermines clarity. Which structural defect most severely undermines the clarity of the output?",
  "options": [
   {
    "key": "A",
    "text": "A single subheading is shorter than the other subheadings in the document.",
    "correct": false
   },
   {
    "key": "B",
    "text": "The main conclusion contradicts the evidence presented in the body.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Two adjacent paragraphs present the same information using inconsistent terminology.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Typographic inconsistencies appear throughout multiple sections of the document.",
    "correct": false
   }
  ]
 },
 {
  "id": 19,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are evaluating a Claude output that appears to contain hallucinated content. Which response step should be performed first when a hallucination is suspected?",
  "options": [
   {
    "key": "A",
    "text": "Discard the entire output and regenerate the output with a fresh prompt.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Pinpoint the specific claim that appears to be unsupported by available evidence.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Notify the user community that the output contains a hallucinated claim.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Document the hallucination pattern in the team's risk register for future reference.",
    "correct": false
   }
  ]
 },
 {
  "id": 20,
  "section": "Output Evaluation & Validation",
  "type": "single",
  "prompt": "You are a customer-success manager considering whether to escalate a Claude-generated response. Which factor most strongly raises the impact of the output and supports escalation before external use?",
  "options": [
   {
    "key": "A",
    "text": "The response is an internal draft summarizing the associate's notes from a customer call for their own reference.",
    "correct": false
   },
   {
    "key": "B",
    "text": "The response is a casual rephrasing of an internal team status update.",
    "correct": false
   },
   {
    "key": "C",
    "text": "The response is a brief internal announcement about an upcoming team all-hands meeting.",
    "correct": false
   },
   {
    "key": "D",
    "text": "The response is an unchanged draft for a paying customer that includes a service-level commitment.",
    "correct": true
   }
  ]
 },
 {
  "id": 21,
  "section": "Prompting & Task Framing",
  "type": "multi",
  "prompt": "You are an operations lead evaluating prompting strategies that teammates have proposed for various task types. Which two strategies represent appropriate matches between strategy and task type? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "open exploratory prompting for early-stage strategic brainstorming on a new market",
    "correct": true
   },
   {
    "key": "B",
    "text": "rigid templated prompting for monthly compliance reports against a fixed schema",
    "correct": true
   },
   {
    "key": "C",
    "text": "rigid templated prompting for early-stage creative naming and tagline ideation",
    "correct": false
   },
   {
    "key": "D",
    "text": "rigid templated prompting for casual customer-feedback summarization with no schema",
    "correct": false
   },
   {
    "key": "E",
    "text": "open exploratory prompting for legal contract redlining against a clause library",
    "correct": false
   }
  ]
 },
 {
  "id": 22,
  "section": "Output Evaluation & Validation",
  "type": "single",
  "prompt": "You are a communications manager validating a Claude-generated newsletter that includes a specific industry growth figure. The figure appears in three trade-press articles, but none of them link to the underlying study. Which validation step is correct?",
  "options": [
   {
    "key": "A",
    "text": "Locate the original study referenced by the trade-press articles and verify the figure in the primary source.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Remove the source attribution and present the figure as common knowledge.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Use the highest figure across the three articles to make the newsletter more compelling.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Accept the figure because three trade-press articles repeat it.",
    "correct": false
   }
  ]
 },
 {
  "id": 23,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "multi",
  "prompt": "You are a project manager working through a long planning conversation with Claude and must keep the conversation productive as it grows. Which two practices keep a long planning conversation productive? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Avoid summarizing so the model retains every original word it has produced.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Restate constraints and goals when the focus shifts to a new subtopic.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Open a new thread for every minor follow-up question to keep threads short.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Periodically summarize decisions made so far to compress the working state.",
    "correct": true
   },
   {
    "key": "E",
    "text": "Switch context aggressively between unrelated planning topics within one thread.",
    "correct": false
   }
  ]
 },
 {
  "id": 24,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are writing system-level instructions for a Project that supports recurring writing tasks. Which step should be performed first when writing the system-level instructions?",
  "options": [
   {
    "key": "A",
    "text": "Distribute the finalized instructions to collaborators on the Project.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Define the purpose of the Project and the boundaries the instructions must respect.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Validate the drafted instructions against representative requests for the Project.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Refine the drafted instructions based on observed gaps from validation runs.",
    "correct": false
   }
  ]
 },
 {
  "id": 25,
  "section": "Model Selection & Capabilities",
  "type": "single",
  "prompt": "You are an operations assistant selecting a model for a recurring meeting-summary task that does not require deep reasoning and runs at moderate volume. Which selection best balances cost, speed, and quality?",
  "options": [
   {
    "key": "A",
    "text": "Sonnet, which provides solid quality at moderate latency and rate-limit consumption for everyday work.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Opus, which prioritizes depth at higher latency and rate-limit consumption.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Haiku, which is suitable only when the task requires the fastest possible turnaround.",
    "correct": false
   },
   {
    "key": "D",
    "text": "A custom model, which the Associate-level user would need to build and train independently.",
    "correct": false
   }
  ]
 },
 {
  "id": 26,
  "section": "Data Handling, Privacy & Security",
  "type": "single",
  "prompt": "You are handling a document containing mixed-sensitivity content before using it with Claude. Which data-handling step should be performed first?",
  "options": [
   {
    "key": "A",
    "text": "Classify the content of the document and identify which fields are sensitive.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Submit the redacted document to Claude for the intended task.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Redact sensitive fields and replace them with appropriate placeholders.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Review the redacted document with a peer to confirm the redaction is complete.",
    "correct": false
   }
  ]
 },
 {
  "id": 27,
  "section": "Output Evaluation & Validation",
  "type": "single",
  "prompt": "A customer-success team member is reviewing a Claude-generated customer health-check report against the agreed deliverable list. The report covers all five required topics, but the renewal-risk section names only one risk factor where the deliverable specification calls for renewal risk to be assessed across pricing, product fit, and stakeholder change. Which conclusion is best supported?",
  "options": [
   {
    "key": "A",
    "text": "The report meets the deliverable specification because all five required topics appear and the renewal-risk section is present in the output.",
    "correct": false
   },
   {
    "key": "B",
    "text": "The report does not meet the deliverable specification because a section that addresses only one of three required risk dimensions counts as a missing section.",
    "correct": false
   },
   {
    "key": "C",
    "text": "The report's completeness cannot be assessed from the deliverable specification alone; the customer should review the output and confirm whether the renewal-risk depth is sufficient.",
    "correct": false
   },
   {
    "key": "D",
    "text": "The report meets the topic-level requirements but the renewal-risk section is under-scoped against the specification and should be expanded before delivery.",
    "correct": true
   }
  ]
 },
 {
  "id": 28,
  "section": "Workflow Integration & Process Design",
  "type": "single",
  "prompt": "You are a project manager weighing workflow steps by how much leverage Claude integration provides. Which workflow step typically offers the greatest Claude leverage in a knowledge-work team?",
  "options": [
   {
    "key": "A",
    "text": "making final personnel decisions about hiring, promotion, or termination",
    "correct": false
   },
   {
    "key": "B",
    "text": "drafting and synthesizing across many sources for a downstream reviewer",
    "correct": true
   },
   {
    "key": "C",
    "text": "approving final deliverables for external publication without further review",
    "correct": false
   },
   {
    "key": "D",
    "text": "negotiating contractual terms with external parties on behalf of the company",
    "correct": false
   }
  ]
 },
 {
  "id": 29,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "A knowledge worker is iterating a prompt that has produced a partly acceptable response. Which refinement practice produces the strongest learning across iterations?",
  "options": [
   {
    "key": "A",
    "text": "Restart from a fresh prompt each iteration so prior wording does not bias the next attempt, and pick the strongest response at the end.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Change one identifiable element per iteration, capture the change and its effect, and adjust another element only after the first is settled.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Make several related changes in one iteration when they target the same weakness, and revert the whole set if the combined change makes the output worse.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Address every weakness the response showed in a single revision, then compare the revised output against the prior version.",
    "correct": false
   }
  ]
 },
 {
  "id": 30,
  "section": "Prompting & Task Framing",
  "type": "multi",
  "prompt": "You are a knowledge manager structuring source material in the context window for a long Claude evaluation task. Which two practices produce a more effective use of the context window? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Repeat the same instruction at the start, middle, and end to reinforce it.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Mix sources together in a single block so the model can synthesize them freely.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Paste every available document into context regardless of relevance to the task.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Mark each source clearly with delimiters so the model can attribute claims correctly.",
    "correct": true
   },
   {
    "key": "E",
    "text": "Place the most reference-critical material near the beginning or end of context.",
    "correct": true
   }
  ]
 },
 {
  "id": 31,
  "section": "Governance, Ethics & Responsible Use",
  "type": "multi",
  "prompt": "You are an HR specialist sorting potential ethical risks of a Claude-supported workflow. Which two risks pose the highest ethical concern in an HR-adjacent workflow? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "outputs that systematically disadvantage members of a protected group",
    "correct": true
   },
   {
    "key": "B",
    "text": "inconsistent use of the company's preferred dash style across documents",
    "correct": false
   },
   {
    "key": "C",
    "text": "a clerical typo in a routine internal calendar invitation",
    "correct": false
   },
   {
    "key": "D",
    "text": "inconsistent tone and formatting across internal HR communications sent to employees",
    "correct": false
   },
   {
    "key": "E",
    "text": "decisions that materially affect a person's employment without human accountability",
    "correct": true
   }
  ]
 },
 {
  "id": 32,
  "section": "Workflow Integration & Process Design",
  "type": "multi",
  "prompt": "You are reviewing items proposed for inclusion in a Project that supports policy summaries. Which two items are appropriate to include? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "active client case files maintained by a separate legal team for a different workstream",
    "correct": false
   },
   {
    "key": "B",
    "text": "the current policy library that the summaries are drawn from",
    "correct": true
   },
   {
    "key": "C",
    "text": "the summary format and the audience expectations the summaries must meet",
    "correct": true
   },
   {
    "key": "D",
    "text": "employee onboarding records used in a separate HR workflow managed by the same team",
    "correct": false
   },
   {
    "key": "E",
    "text": "presentation slides from a recent team training session on internal communication standards",
    "correct": false
   }
  ]
 },
 {
  "id": 33,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are a content creator. A first response from Claude is accurate but uses inconsistent terminology that does not match your organization's glossary. Which iterative change addresses the issue most directly?",
  "options": [
   {
    "key": "A",
    "text": "Ask Claude to invent additional terms unrelated to the glossary.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Remove the topic from the prompt to avoid the terminology issue entirely.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Provide the organization's glossary and instruct Claude to use only those terms throughout the response.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Increase the requested length so the inconsistent terminology appears more often.",
    "correct": false
   }
  ]
 },
 {
  "id": 34,
  "section": "Governance, Ethics & Responsible Use",
  "type": "single",
  "prompt": "Before sharing a Claude-generated brief, an analyst is applying the AI Fluency Framework Discernment competency to evaluate it. Which review best reflects Discernment principles?",
  "options": [
   {
    "key": "A",
    "text": "Skip the source material check during review and rely on overall tone and logical flow as proxies for factual accuracy.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Accept the brief on the basis that it reads fluently and the subject matter aligns with the analyst's professional knowledge of the topic.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Conduct a systematic check of the brief against the task requirements, source material, and professional standards before sharing it.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Review the opening paragraph and the conclusion of the brief, since these sections typically reflect the quality of the full document.",
    "correct": false
   }
  ]
 },
 {
  "id": 35,
  "section": "Output Evaluation & Validation",
  "type": "single",
  "prompt": "A knowledge worker is briefing a stakeholder group on Claude's limitations. The stakeholders will use Claude on customer-facing work where confident-sounding output that contains errors would cause real harm. Which limitation is most important to communicate clearly?",
  "options": [
   {
    "key": "A",
    "text": "Claude's responses vary across runs of the same prompt, so stakeholders should run each prompt several times and compare outputs before using any single response.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Claude's knowledge has a training cutoff, so stakeholders must verify any time-sensitive claims against current sources before using them.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Claude can produce confident-sounding output that contains unsupported claims, so human review remains essential for high-impact work.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Claude can produce long, detailed responses that take time to read, so stakeholders should request shorter outputs when working under tight deadlines.",
    "correct": false
   }
  ]
 },
 {
  "id": 36,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are a marketing manager using Claude to research a new market segment. Which research step should be performed first?",
  "options": [
   {
    "key": "A",
    "text": "Define the specific research questions that must be answered for the segment.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Generate a final research report combining every Claude output produced.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Submit a series of Claude prompts to gather information across the segment.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Validate the gathered information against authoritative external sources.",
    "correct": false
   }
  ]
 },
 {
  "id": 37,
  "section": "Workflow Integration & Process Design",
  "type": "multi",
  "prompt": "You are a communications specialist preparing to describe Claude's role in a workflow to multiple stakeholder groups and must complete the preparation steps before drafting stakeholder messages. Which two preparation steps must be completed BEFORE drafting the stakeholder messages? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Archive the drafted messages in the corporate communications repository.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Schedule a follow-up forum to handle questions raised by the messages.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Define the key facts about Claude's role and the boundaries that apply.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Send the drafted messages out and gather feedback for revision.",
    "correct": false
   },
   {
    "key": "E",
    "text": "Identify the stakeholder groups and what each group needs to understand.",
    "correct": true
   }
  ]
 },
 {
  "id": 38,
  "section": "Workflow Integration & Process Design",
  "type": "single",
  "prompt": "An operations assistant is using Claude to support process optimization for an existing intake workflow. The assistant has access to the current process documentation and recent cycle-time data. Which activity best uses Claude to support this process optimization task?",
  "options": [
   {
    "key": "A",
    "text": "Use Claude to interview each team member who works on the intake process and synthesize the interview output into a redesigned workflow.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Map the current intake process, identify likely bottlenecks based on the cycle-time data, and propose optimization options for human review.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Apply Claude to predict the cycle-time impact of each proposed change and rank so the team can implement improvements in priority order.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Generate an optimized version of the intake process based on industry benchmarks, then compare it to the current process to identify gaps.",
    "correct": false
   }
  ]
 },
 {
  "id": 39,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You have iterated a Claude prompt eight times, and the output quality has plateaued for the last four attempts. Which conclusion is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Iteration has reached diminishing returns and the next step is human review or a different approach.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Iteration should continue indefinitely because more attempts always improve quality.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Iteration should stop and the current output should be accepted as-is regardless of remaining issues.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Iteration should stop and the task should be abandoned without communicating to stakeholders.",
    "correct": false
   }
  ]
 },
 {
  "id": 40,
  "section": "Data Handling, Privacy & Security",
  "type": "single",
  "prompt": "You are a knowledge worker preparing inputs for a Claude prompt. Which data type most clearly requires extra handling such as redaction or anonymization before being included in the prompt?",
  "options": [
   {
    "key": "A",
    "text": "job titles taken from the company's public organizational chart",
    "correct": false
   },
   {
    "key": "B",
    "text": "generic product descriptions available on the company's marketing site",
    "correct": false
   },
   {
    "key": "C",
    "text": "public press releases the company has already published",
    "correct": false
   },
   {
    "key": "D",
    "text": "customer government identifiers and full payment-card numbers tied to named individuals",
    "correct": true
   }
  ]
 },
 {
  "id": 41,
  "section": "Workflow Integration & Process Design",
  "type": "multi",
  "prompt": "You are using Claude to redesign an employee onboarding workflow and must complete the high-level decomposition steps before specifying detailed artifacts. Which two decomposition steps must be completed BEFORE specifying exact email content and the schedule? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Identify the major phases of the onboarding experience.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Define the overall objective of the onboarding experience.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Roll out the onboarding workflow to every new hire across the company.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Pilot the onboarding workflow with a small cohort of new hires.",
    "correct": false
   },
   {
    "key": "E",
    "text": "Negotiate the onboarding budget with the finance department.",
    "correct": false
   }
  ]
 },
 {
  "id": 42,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "A knowledge worker is explaining how to use feedback to improve Claude-supported work over time. Which description is most accurate?",
  "options": [
   {
    "key": "A",
    "text": "Capture general impressions after each run and apply them as broad prompt rewrites, since broad rewrites cover more potential issues than targeted changes.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Capture feedback as an aggregate quality score per run, since aggregate scores show whether quality is improving without requiring detail on individual issues.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Capture specific feedback after each run, translate it into targeted prompt or workflow changes, and observe whether subsequent runs improve.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Capture feedback only after several runs so patterns emerge from the volume of observations, then apply changes based on the patterns rather than any single run.",
    "correct": false
   }
  ]
 },
 {
  "id": 43,
  "section": "Data Handling, Privacy & Security",
  "type": "single",
  "prompt": "A customer-success associate is drafting a prompt that asks Claude to summarize a customer issue from the case file. The case file includes the customer's full government identifier, home address, name, account number, and the description of the issue. The summary the associate needs is about the issue. Which approach is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Remove or redact the government identifier and the home address before submitting the prompt, since neither is necessary for a summary of the issue.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Submit only the description of the issue and add the customer's name for context, since the description plus a name is sufficient to produce a summary.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Replace the government identifier with the customer's name and the home address with the account number, since names and account numbers are less sensitive than identifiers and addresses.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Submit the full case file and include an instruction telling Claude not to reference the government identifier or the home address in the summary.",
    "correct": false
   }
  ]
 },
 {
  "id": 44,
  "section": "Governance, Ethics & Responsible Use",
  "type": "single",
  "prompt": "A Claude associate is evaluating a proposed use case in which Claude would issue final hiring decisions without any human review, applying the AI Fluency Framework Delegation competency. Which classification best reflects Delegation principles?",
  "options": [
   {
    "key": "A",
    "text": "Inappropriate only because of system reliability concerns rather than accountability, even though Delegation criteria classify final hiring decisions as requiring human ownership regardless of system performance.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Appropriate for full AI delegation, on the basis that processing speed outweighs the human judgment, accountability, and consequence considerations that Delegation criteria require.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Appropriate with light human review applied only to a sample of decisions, even though Delegation criteria reserve final hiring decisions for human ownership rather than sample-based oversight after the fact.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Inappropriate for full AI delegation, because hiring decisions involve human judgment, accountability, and consequences that Delegation criteria reserve for human ownership rather than autonomous AI execution.",
    "correct": true
   }
  ]
 },
 {
  "id": 45,
  "section": "Output Evaluation & Validation",
  "type": "single",
  "prompt": "An analyst has been asked to compute summary statistics from an uploaded sales data file and produce a chart for a weekly report. Which output approach best fits the task?",
  "options": [
   {
    "key": "A",
    "text": "Use Code Execution to perform the calculations and generate the chart, then verify the computed results against the source data before sharing the output.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Request a narrative description of the data in the chat response without computing values, leaving the summary statistics and the chart unproduced and the weekly report incomplete.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Produce a written placeholder for the chart in the chat response without generating the actual visualization, leaving the weekly report without the visual output it requires.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Ask Claude to estimate the summary statistics from a brief preview of the file, accepting unverified figures rather than running the calculations against the full uploaded dataset.",
    "correct": false
   }
  ]
 },
 {
  "id": 46,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "A learning specialist is configuring a Claude Project for a recurring course-design workflow. Which configuration approach best leverages a Skill alongside other Project elements?",
  "options": [
   {
    "key": "A",
    "text": "Configure the Project with custom instructions that contradict the Skill's documented purpose, creating ambiguity about which guidance Claude should follow within the recurring course-design workflow.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Add the Skill to the Project but omit the supporting knowledge sources and any custom instructions, so the Project lacks the reference content and persistent guidance the workflow requires.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Add the relevant Skill to the Project, upload the supporting knowledge sources, and write custom instructions that reference both the Skill and the knowledge.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Upload the supporting knowledge sources but disable the relevant Skill, eliminating the packaged capability the workflow needs and forcing each chat to reconstruct the procedure manually.",
    "correct": false
   }
  ]
 },
 {
  "id": 47,
  "section": "Communication & Stakeholder Adaptation",
  "type": "single",
  "prompt": "A finance consultant is adapting a Claude-generated narrative for a quarterly investor update. Investors have a fixed time window for the call and expect the headline result and forward outlook to be clear early. Which adaptation is most appropriate for this audience?",
  "options": [
   {
    "key": "A",
    "text": "Lead with the quarter's operational highlights, present the financial result in the middle for context, and close with the forward outlook.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Lead with a chronological recap of the quarter's events, present the headline result at the natural end of the recap, and conclude with the forward outlook.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Lead with the headline result, present the key drivers concisely, and close with the forward outlook.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Lead with the forward outlook, since investors are most interested in what comes next, and present the headline result and drivers afterward.",
    "correct": false
   }
  ]
 },
 {
  "id": 48,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "An HR business partner is configuring two separate Projects for two distinct client engagements. Which configuration best prevents context bleed between the two engagements?",
  "options": [
   {
    "key": "A",
    "text": "Set up each Project with its own distinct memory context, knowledge sources, and instructions, and verify that information from one Project does not appear in the other Project's responses.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Use a single shared Project for both client engagements with combined memory, knowledge sources, and instructions, on the assumption that Claude will keep the two clients' contexts separate without configuration.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Skip Project configuration entirely and use general chats for both engagements, which provides no scoped memory contexts and no structural separation between the two clients' work streams.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Configure both Projects to share the same memory context to reduce setup effort, even though shared memory between unrelated client engagements is precisely the configuration that produces context bleed.",
    "correct": false
   }
  ]
 },
 {
  "id": 49,
  "section": "Prompting & Task Framing",
  "type": "multi",
  "prompt": "You are a project manager reviewing Claude usage approaches that teammates have proposed for a project workflow. Which two workflow steps are well-suited for Claude support? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "drafting a structured project status update from a set of meeting notes",
    "correct": true
   },
   {
    "key": "B",
    "text": "deciding promotion outcomes for staff based solely on the model's judgment",
    "correct": false
   },
   {
    "key": "C",
    "text": "approving a final external press release without any human review",
    "correct": false
   },
   {
    "key": "D",
    "text": "issuing legally binding contractual commitments on behalf of the company",
    "correct": false
   },
   {
    "key": "E",
    "text": "synthesizing a literature review across many uploaded research documents",
    "correct": true
   }
  ]
 },
 {
  "id": 50,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are an operations assistant asking Claude to summarize 200 weekly metric records across multiple regions. Which output format communicates the data most clearly?",
  "options": [
   {
    "key": "A",
    "text": "a bulleted list of observations grouped by region without consistent metrics across entries",
    "correct": false
   },
   {
    "key": "B",
    "text": "a series of regional narrative briefs, each describing weekly performance in paragraph form",
    "correct": false
   },
   {
    "key": "C",
    "text": "a narrative summary organized by region, describing trends and notable records in prose",
    "correct": false
   },
   {
    "key": "D",
    "text": "a structured table with one record per row and one metric per column, sorted by region",
    "correct": true
   }
  ]
 },
 {
  "id": 51,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You received a vague request to \"look at our pricing.\" After discovery, the goal is confirmed: produce a structured competitor-pricing summary the team can act on, not new pricing ideas. Which strategy best fits the clarified task?",
  "options": [
   {
    "key": "A",
    "text": "Use a comparative analysis strategy that contrasts the company's pricing against a single named competitor, since pairwise comparison produces the clearest output.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Use a research strategy that gathers structured information about competitor pricing, names sources, and notes confidence in each finding.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Use a divergent brainstorming approach to generate a wide range of possible competitor-pricing observations, then narrow to the most likely ones.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Use an open conversational strategy that explores competitor pricing iteratively across several prompts, allowing the structure to emerge from the conversation.",
    "correct": false
   }
  ]
 },
 {
  "id": 52,
  "section": "Model Selection & Capabilities",
  "type": "single",
  "prompt": "You are an operations manager preparing a quick reference card for a team. Which description correctly characterizes the three Claude model tiers in general terms?",
  "options": [
   {
    "key": "A",
    "text": "Haiku is fast and lightweight, Sonnet is the balanced default for most everyday work, and Opus is the most capable for complex reasoning at higher latency and cost.",
    "correct": true
   },
   {
    "key": "B",
    "text": "All three models offer the same reasoning depth and differ only in response speed and cost.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Haiku is the most capable model for the deepest reasoning, while Opus is the lightweight model for quick replies.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Sonnet is the fastest of the three models because its architecture is optimized for speed rather than reasoning depth.",
    "correct": false
   }
  ]
 },
 {
  "id": 53,
  "section": "Communication & Stakeholder Adaptation",
  "type": "single",
  "prompt": "A project manager is transforming a Claude-generated draft into a polished board memo. The board reads the memo before the meeting and expects it to be scannable, factually verified, and consistent with the organization's standard terminology. Which set of refinements is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Apply consistent headings, tighten wording for executive scanability, align terminology with the organization's standards, and verify each fact against source data.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Apply consistent headings, expand each section to give the board full context, and align terminology with the organization's standards.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Apply consistent headings and align terminology with the organization's standards; rely on Claude's verification of facts, since the draft was generated from the source data.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Tighten wording for executive scanability and verify each fact against source data; leave heading structure and terminology as written to preserve the draft's voice.",
    "correct": false
   }
  ]
 },
 {
  "id": 54,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are refining a prompt over several iterations. The output drifts further from the requested template with each change. Which step is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Stop iterating and accept the most off-target version.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Discard all prior versions and start with no record of what worked.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Revert to the version of the prompt that produced the closest match and adjust from that baseline.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Continue making large simultaneous changes until the output happens to align.",
    "correct": false
   }
  ]
 },
 {
  "id": 55,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "multi",
  "prompt": "You are reviewing Connector setups that colleagues have proposed for various tasks. Which two Connector setups represent safe and appropriate uses? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "a Connector that links to the personnel-records system for team leads to support scheduling tasks",
    "correct": false
   },
   {
    "key": "B",
    "text": "a Connector that links to the payroll system to allow team members to submit expense reports directly",
    "correct": false
   },
   {
    "key": "C",
    "text": "a read-only Connector that links to the public knowledge base for reference content",
    "correct": true
   },
   {
    "key": "D",
    "text": "a Connector that links to a personal cloud storage account where team members store working drafts alongside personal files",
    "correct": false
   },
   {
    "key": "E",
    "text": "a Connector that links to the team's project management workspace under approved scope",
    "correct": true
   }
  ]
 },
 {
  "id": 56,
  "section": "Model Selection & Capabilities",
  "type": "multi",
  "prompt": "You are a project manager at Onnexa, Inc. You are picking a Claude model for a new production workload and must complete the requirements steps before testing candidates. Which two steps must be completed BEFORE testing candidate models on a representative sample? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Retest the selected model whenever a new model version is released.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Choose a candidate model based on the requirements profile and known capabilities.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Define the quality bar, the latency tolerance, and the expected request volume.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Sign off on the production rollout plan with the platform and security teams.",
    "correct": false
   },
   {
    "key": "E",
    "text": "Promote the selected model to production traffic for the workload.",
    "correct": false
   }
  ]
 },
 {
  "id": 57,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "A business analyst has been asked to use Claude to extract requirements from a recorded stakeholder interview transcript. The transcript is approximately 90 minutes long and covers multiple topics. Which approach is most likely to produce a usable structured output?",
  "options": [
   {
    "key": "A",
    "text": "Provide the transcript and ask Claude to summarize it, then extract requirements from the summary in a second pass since two passes catch more detail.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Provide the transcript and ask Claude to produce a chronological list of every statement that contains a verb, then classify each statement as a requirement or not.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Provide the transcript and ask Claude to produce a single ranked list of requirements, since a single list is easier for stakeholders to review than separate sections.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Provide the transcript along with a structured prompt that requests must-haves, nice-to-haves, open questions, and conflicts as separate sections.",
    "correct": true
   }
  ]
 },
 {
  "id": 58,
  "section": "Output Evaluation & Validation",
  "type": "single",
  "prompt": "An HR team member is reviewing a Claude-drafted set of interview questions intended for use across all candidates for a single role. The questions will be asked in the same order to every candidate. Which review practice best supports fairness?",
  "options": [
   {
    "key": "A",
    "text": "Review the questions to ensure they apply equally to all candidates, avoid assumptions about candidate backgrounds, and focus on the role's actual requirements.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Review the questions and rotate the order across candidates so no candidate is consistently asked the hardest questions first.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Review the questions for length and tone, since the questions Claude drafts are well-aligned to role requirements by default and need only stylistic adjustment.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Review the questions and add follow-up questions tailored to each candidate's resume so each interview can explore the candidate's specific experience.",
    "correct": false
   }
  ]
 },
 {
  "id": 59,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "multi",
  "prompt": "A finance manager is about to discuss a confidential pre-announcement figure with Claude. Which two settings best align with sound privacy practice for this conversation? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Disable Memory contribution for the conversation if Incognito mode is not used, so the confidential figure is not retained as persistent context that could surface in later unrelated sessions.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Open the conversation in Incognito mode, which prevents the conversation from contributing to Memory and avoids persistent retention of the confidential pre-announcement figure across sessions.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Enable Memory contribution for the conversation so the context carries forward to support follow-up analysis in future sessions.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Skip the privacy setting decision and proceed with default behavior, since the conversation will not explicitly instruct Claude to remember the figure.",
    "correct": false
   },
   {
    "key": "E",
    "text": "Treat the conversation as appropriate for default Memory settings, since the figure will only be discussed briefly and is unlikely to be retained.",
    "correct": false
   }
  ]
 },
 {
  "id": 60,
  "section": "Workflow Integration & Process Design",
  "type": "multi",
  "prompt": "You are optimizing a recurring Claude workflow and must complete the diagnostic steps before changing the workflow. Which two diagnostic steps must be completed BEFORE changing the recurring workflow? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Document the revised workflow steps and update the team's standard operating procedures.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Deploy the updated workflow across the team and monitor for adoption issues.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Notify executive leadership of the projected savings from the optimization.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Identify the steps that contribute most to time, cost, or quality issues.",
    "correct": true
   },
   {
    "key": "E",
    "text": "Measure the current workflow's quality, time, and cost across recent runs.",
    "correct": true
   }
  ]
 },
 {
  "id": 61,
  "section": "Output Evaluation & Validation",
  "type": "single",
  "prompt": "You are a Claude associate running an ethics review on a Claude-assisted deliverable before publication. Which is the correct order of review steps?\n(1) Confirm transparency requirements are met for the audience receiving the deliverable.\n(2) Document the review outcome and any changes made.\n(3) Identify the audience and the potential impact of the deliverable on that audience.\n(4) Make targeted revisions or escalate if a concern requires more authority to resolve.\n(5) Examine the content for unsupported generalizations, fairness concerns, and accuracy issues.",
  "options": [
   {
    "key": "A",
    "text": "3, 1, 5, 4, 2",
    "correct": false
   },
   {
    "key": "B",
    "text": "5, 3, 1, 4, 2",
    "correct": false
   },
   {
    "key": "C",
    "text": "1, 3, 5, 4, 2",
    "correct": false
   },
   {
    "key": "D",
    "text": "3, 5, 1, 4, 2",
    "correct": true
   }
  ]
 },
 {
  "id": 62,
  "section": "Governance, Ethics & Responsible Use",
  "type": "single",
  "prompt": "Preparing an AI-assisted work product for external delivery, a senior manager is applying the AI Fluency Framework Diligence competency. Which step best reflects Diligence principles?",
  "options": [
   {
    "key": "A",
    "text": "Identify the sections of the work product that read as inconsistent or unfamiliar and verify those sections, treating the smoothly written sections as reliable.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Identify the elements of the work product that must be independently verified or corrected before delivery, and take ownership of those verifications as a professional accountability obligation.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Place accountability for the AI-assisted work product with Claude itself, treating the tool as the responsible party for the deliverable.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Deliver the work product, treating the AI assistance itself as sufficient assurance of accuracy for external delivery.",
    "correct": false
   }
  ]
 },
 {
  "id": 63,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are a knowledge worker summarizing common prompt failure patterns for the team. Which pattern most often produces vague or off-target output?",
  "options": [
   {
    "key": "A",
    "text": "a prompt that names a topic but does not state the task, audience, or required output structure",
    "correct": true
   },
   {
    "key": "B",
    "text": "a prompt that names the role, audience, and output format, but does not state the specific task",
    "correct": false
   },
   {
    "key": "C",
    "text": "a prompt that names the role, task, and audience, but does not specify the required output format",
    "correct": false
   },
   {
    "key": "D",
    "text": "a prompt that names the task and required output format, but does not specify the intended audience",
    "correct": false
   }
  ]
 },
 {
  "id": 64,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "A strategy manager is reviewing a Claude-generated recommendation to consolidate the company's two regional warehouses into one. The recommendation cites three sources that estimate cost savings and one source confirming that consolidation is operationally feasible. Two of the source documents also contain estimates of one-time transition costs and a stakeholder concern about regional service levels, neither of which appears in the recommendation. Which concern is most warranted?",
  "options": [
   {
    "key": "A",
    "text": "The recommendation is sound because every source it cites supports the consolidation conclusion, so no further review is needed.",
    "correct": false
   },
   {
    "key": "B",
    "text": "The recommendation is acceptable for an initial round, but the missing material should be added in a separate appendix rather than re-prompting the original output.",
    "correct": false
   },
   {
    "key": "C",
    "text": "The recommendation should be rejected because it relies on only four sources, which is insufficient for a decision of this size.",
    "correct": false
   },
   {
    "key": "D",
    "text": "The recommendation reflects selective use of the sources and should be re-prompted to address the transition costs and service-level concern.",
    "correct": true
   }
  ]
 },
 {
  "id": 65,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "multi",
  "prompt": "A manager is deciding what changes to make while conducting a memory maintenance review for a long-running workflow. Which two actions best support memory quality over time? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Delete all memories as the maintenance action to ensure a clean slate, then allow Claude to rebuild context organically through subsequent workflow runs.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Export the current memories as a backup before making changes, so prior context can be restored if a maintenance edit unintentionally removes information the workflow still depends on.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Add new context entries as needed but leave existing entries unedited to preserve continuity.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Identify and edit or delete entries that are stale, inaccurate, or no longer relevant, and add context Claude has not automatically captured but the workflow continues to need.",
    "correct": true
   },
   {
    "key": "E",
    "text": "Disable Memory entirely for the workflow to prevent any new entries from being created going forward.",
    "correct": false
   }
  ]
 },
 {
  "id": 66,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "A marketing associate is drafting Project custom instructions for a brand-voice writing workspace. The workspace will be used by several writers, and outputs need to be consistent across writers and chats. Which approach is most likely to produce consistent outputs across many chats?",
  "options": [
   {
    "key": "A",
    "text": "State Claude's role and provide a sample piece of approved brand-voice writing in the custom instructions, since one strong example carries the brand voice better than written rules.",
    "correct": false
   },
   {
    "key": "B",
    "text": "State Claude's role and the brand-voice attributes; let each writer specify the audience, tone constraints, and terminology requirements per chat to keep the configuration flexible.",
    "correct": false
   },
   {
    "key": "C",
    "text": "State Claude's role, summarize the brand-voice attributes, name the audience, list tone constraints, and require alignment with the brand's terminology.",
    "correct": true
   },
   {
    "key": "D",
    "text": "State Claude's role, the brand-voice attributes, and the audience; leave terminology to a glossary in the Project knowledge base rather than in the custom instructions.",
    "correct": false
   }
  ]
 },
 {
  "id": 67,
  "section": "Output Evaluation & Validation",
  "type": "single",
  "prompt": "A workflow analyst is designing a hand-off between Claude and a human reviewer in an existing process. The reviewer needs to know what to check and what is in scope for their review. Which hand-off design is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Define explicit criteria for what Claude produces and leave the reviewer's checks unspecified so the reviewer can apply judgment without constraint.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Define explicit criteria for what Claude produces and what the human reviewer must check before approval, documented in the workflow.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Use a checklist that the reviewer fills in for every output, with the checklist generated by Claude based on the specific content of each output.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Allow each reviewer to determine their own review criteria based on their experience, since reviewers know best what to check in their domain.",
    "correct": false
   }
  ]
 },
 {
  "id": 68,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "A knowledge worker is preparing to use the Gmail connector with Claude for the first time. Which statement most accurately describes the connector's behavior at the user level?",
  "options": [
   {
    "key": "A",
    "text": "Claude searches and reads emails the user has access to in a read-only mode, and the user must compose any reply manually outside the connector.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Claude searches and reads emails the user has access to and sends replies on the user's behalf for low-risk messages, with higher-risk messages routed to the user for approval.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Claude searches and reads emails the user has access to and labels them according to user-defined rules, with reply drafting handled in a separate workflow.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Claude searches and reads emails the user has access to and drafts replies for the user to send manually, with each action requiring explicit user approval.",
    "correct": true
   }
  ]
 },
 {
  "id": 69,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "Your conversation context has grown long, and the model is producing inconsistent outputs. Which context-management step should be performed first?",
  "options": [
   {
    "key": "A",
    "text": "Switch to a different model in the hope that the new model handles long context better.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Continue the existing conversation and hope the model recovers consistency.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Summarize the prior conversation into a concise statement of the current state.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Start a fresh conversation and repaste only the essential prior context.",
    "correct": false
   }
  ]
 },
 {
  "id": 70,
  "section": "Communication & Stakeholder Adaptation",
  "type": "multi",
  "prompt": "The first output from Claude is partially useful but has tone and detail issues. Which two refinement actions are most likely to produce a meaningfully better output? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Ask Claude to elaborate further without adding any new tone descriptor, audience, or example to the prompt.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Provide an example of an output that meets the desired standard.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Add a specific tone descriptor and a concrete audience to the prompt.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Resubmit the same prompt several times and select the best response.",
    "correct": false
   },
   {
    "key": "E",
    "text": "Increase the temperature setting to introduce more variation, without changing the tone, audience, or examples in the prompt.",
    "correct": false
   }
  ]
 },
 {
  "id": 71,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "You are configuring a new Claude Project for a specific recurring workload. Which Project configuration step should be performed first?",
  "options": [
   {
    "key": "A",
    "text": "Define the purpose of the Project and the recurring tasks it must support.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Invite collaborators to the Project and confirm the appropriate access levels.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Test the configured Project on a representative request from the workload.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Add reference materials and instructions that the Project will rely on.",
    "correct": false
   }
  ]
 },
 {
  "id": 72,
  "section": "Workflow Integration & Process Design",
  "type": "multi",
  "prompt": "You are an operations lead sorting Claude-driven research tasks by which deliver the most value. Which two Claude-driven research tasks deliver the highest value in a typical analysis workflow? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "synthesizing themes across a large set of customer interview transcripts",
    "correct": true
   },
   {
    "key": "B",
    "text": "reformatting a completed research deck to adjust spacing, fonts, and slide layout",
    "correct": false
   },
   {
    "key": "C",
    "text": "transcribing a recorded interview from audio notes into a structured document format",
    "correct": false
   },
   {
    "key": "D",
    "text": "drafting a comparative summary of competing solutions from public materials",
    "correct": true
   },
   {
    "key": "E",
    "text": "asking the model to generate representative customer quotes based on general research themes",
    "correct": false
   }
  ]
 },
 {
  "id": 73,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "You are setting up a Connector for a shared data source that several colleagues will use. Which Connector setup step should be performed first?",
  "options": [
   {
    "key": "A",
    "text": "Document the Connector's purpose and the appropriate use cases for the team.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Use the Connector in a representative task to evaluate its real-world utility.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Connect the data source and confirm the authentication is working as expected.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Confirm the Connector is approved and the data classification is appropriate.",
    "correct": true
   }
  ]
 },
 {
  "id": 74,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "A knowledge worker notices that a Claude output may have repeated a confidential financial figure from an internal source the user was told to treat as restricted. The output has not yet been shared outside the user. Which immediate action is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Stop using the output, document the issue including the prompt and the source, and report it through the documented governance or incident channel.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Edit the output to remove the figure, save the edited version for the intended use, and document the change in a personal log without involving the governance channel.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Stop using the output and start a new chat with a more carefully scoped prompt, since the issue is resolved as long as the original output is not used.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Continue using the output for the intended internal purpose, since the figure has not left the user's possession and no external disclosure has occurred.",
    "correct": false
   }
  ]
 },
 {
  "id": 75,
  "section": "Prompting & Task Framing",
  "type": "multi",
  "prompt": "You are an operations lead sorting proposed Claude use cases by whether they are acceptable for your team to pursue. Which two proposed use cases are acceptable for the team to pursue with Claude? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "drafting an internal training summary from approved internal documentation",
    "correct": true
   },
   {
    "key": "B",
    "text": "summarizing performance review notes to determine promotion decisions across a team",
    "correct": false
   },
   {
    "key": "C",
    "text": "drafting a preliminary symptom summary to support a clinician's diagnostic review",
    "correct": false
   },
   {
    "key": "D",
    "text": "synthesizing themes across approved customer feedback under aggregation rules",
    "correct": true
   },
   {
    "key": "E",
    "text": "drafting a legal summary an attorney reviews before sharing with a client",
    "correct": false
   }
  ]
 },
 {
  "id": 76,
  "section": "Model Selection & Capabilities",
  "type": "single",
  "prompt": "You are a customer-success lead running an interactive workflow where each turn must respond quickly and the per-turn reasoning is light. Which selection best aligns to the requirements?",
  "options": [
   {
    "key": "A",
    "text": "Choose Sonnet so quality headroom is available if occasional turns need deeper reasoning.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Choose Haiku to keep latency low and to handle a light reasoning load efficiently at scale.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Choose Sonnet because its balanced profile better protects response quality across turns of varying difficulty.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Choose Opus because maximizing reasoning depth on every turn produces the most reliable interactive workflow.",
    "correct": false
   }
  ]
 },
 {
  "id": 77,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are a knowledge worker reviewing a Claude-generated brief that asserts a \"well-known industry standard\" without naming any source. How should this assertion be handled?",
  "options": [
   {
    "key": "A",
    "text": "Strengthen the assertion by adding more confident wording and presenting it as established industry consensus.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Flag the assertion as unverified in an internal note, but publish the brief unchanged without sourcing or removing the claim.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Accept the assertion because the phrase \"well-known\" is reassuring, treating confident phrasing as a substitute for a cited source.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Treat the assertion as unverified, and either source it from an authoritative reference or remove it.",
    "correct": true
   }
  ]
 },
 {
  "id": 78,
  "section": "Data Handling, Privacy & Security",
  "type": "single",
  "prompt": "You are a Claude associate assessing a proposed Claude use case before approving it for your team. Which is the correct order of assessment steps?\n(1) Compare the use case against the organization's policies and the relevant regulatory considerations.\n(2) Document the assessment outcome and the rationale for traceability.\n(3) Identify the audience, decision impact, and reversibility of the outputs.\n(4) Decide whether the use case proceeds, requires modification, or is declined.\n(5) Identify the data types involved and whether sensitive data is implicated.",
  "options": [
   {
    "key": "A",
    "text": "3, 1, 5, 4, 2",
    "correct": false
   },
   {
    "key": "B",
    "text": "3, 5, 1, 4, 2",
    "correct": true
   },
   {
    "key": "C",
    "text": "1, 3, 5, 4, 2",
    "correct": false
   },
   {
    "key": "D",
    "text": "5, 3, 1, 4, 2",
    "correct": false
   }
  ]
 },
 {
  "id": 79,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "An analyst is working in a long Claude conversation. The conversation contains roughly 60 turns covering an initial requirements analysis, several rounds of data review, and a current drafting phase. Recent responses have started to drift from the agreed requirements. Which step most directly addresses the drift while preserving the analyst's progress?",
  "options": [
   {
    "key": "A",
    "text": "Switch the conversation to a model with a larger context window so the accumulated history no longer causes drift and continue without restructuring the inputs.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Open a new chat and paste only the current draft, then continue refining it there without the prior requirements and data-review context.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Move the source data and the requirements into a Project knowledge base, then continue the drafting work in a new chat inside that Project.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Summarize the agreed requirements, the key data findings, and the current draft state, then continue in the same chat by reasserting the summary as the working context.",
    "correct": true
   }
  ]
 },
 {
  "id": 80,
  "section": "Workflow Integration & Process Design",
  "type": "single",
  "prompt": "A knowledge worker has asked Claude to produce a one-page operating procedure. The team will edit the procedure, reuse it across multiple onboarding cycles, and update it when the underlying process changes. Which output format is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Generate the procedure as the chat response and copy the text into the team's document store after each revision.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Generate the procedure as the chat response and save the entire chat transcript to the team's document store as the working reference.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Generate the procedure as an Artifact, which the team can open, edit, and save as a stable reference for ongoing use.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Generate the procedure as a series of numbered steps in the chat and keep the chat itself as the reference for future edits.",
    "correct": false
   }
  ]
 },
 {
  "id": 81,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "multi",
  "prompt": "You are organizing connected data sources for a team and must complete the planning steps before authorizing any connection. Which two planning steps must be completed BEFORE authorizing a new Connector? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Train every team member on the new Connector through formal training sessions.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Plan to decommission any unused legacy connectors that may still be authorized.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Confirm which reports the organization wants to migrate onto the new Connector.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Confirm the Connector is on the approved-vendor list maintained by IT.",
    "correct": true
   },
   {
    "key": "E",
    "text": "Confirm the data classification of the source and the team's permission to use it.",
    "correct": true
   }
  ]
 },
 {
  "id": 82,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "multi",
  "prompt": "You are a project manager reviewing stakeholder messages that teammates have drafted about Claude's role in a workflow. Which two messages are appropriate for stakeholder communication about Claude? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "a description of where Claude assists and where humans retain decisions",
    "correct": true
   },
   {
    "key": "B",
    "text": "a statement that Claude will handle every task without any human involvement",
    "correct": false
   },
   {
    "key": "C",
    "text": "a statement of the limits and known failure modes of Claude's role in the workflow",
    "correct": true
   },
   {
    "key": "D",
    "text": "a reassurance that \"the AI is taking care of it\"",
    "correct": false
   },
   {
    "key": "E",
    "text": "a statement that the model does not make meaningful errors and needs no quality review",
    "correct": false
   }
  ]
 },
 {
  "id": 83,
  "section": "Communication & Stakeholder Adaptation",
  "type": "single",
  "prompt": "You are reviewing a Claude-generated report whose tone is confident throughout. Which question best separates plausibility from verification?",
  "options": [
   {
    "key": "A",
    "text": "Does the response use varied sentence structure across sections, independent of whether any claim in it can actually be verified?",
    "correct": false
   },
   {
    "key": "B",
    "text": "Can each specific claim be traced to a credible source or to the supplied input material?",
    "correct": true
   },
   {
    "key": "C",
    "text": "Does the response open with a clear, well-framed statement of the main finding?",
    "correct": false
   },
   {
    "key": "D",
    "text": "Does the response cover the topic comprehensively based on its length and section count?",
    "correct": false
   }
  ]
 },
 {
  "id": 84,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "You are a product manager asking Claude to produce an interactive prototype of a small landing-page mockup the team will iterate on and share. Which Claude feature is best suited to this output?",
  "options": [
   {
    "key": "A",
    "text": "a Research run that produces a multi-page external survey of competitor sites",
    "correct": false
   },
   {
    "key": "B",
    "text": "a short conversational reply embedded inline in the chat history",
    "correct": false
   },
   {
    "key": "C",
    "text": "an Artifact, which presents standalone editable content in a dedicated side panel for iteration",
    "correct": true
   },
   {
    "key": "D",
    "text": "a new Project containing only the team's prior meeting notes",
    "correct": false
   }
  ]
 },
 {
  "id": 85,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are a Claude associate troubleshooting a Claude response that introduces facts not present in the supplied source. Which root cause is most directly indicated?",
  "options": [
   {
    "key": "A",
    "text": "The prompt asks for a comprehensive response, which leads Claude to fill perceived gaps with plausible-sounding but unverified detail.",
    "correct": false
   },
   {
    "key": "B",
    "text": "The prompt asks Claude to act as a researcher rather than a writer.",
    "correct": false
   },
   {
    "key": "C",
    "text": "The prompt's heading-based structure encourages Claude to generate placeholder content under each heading even when the source doesn't cover it.",
    "correct": false
   },
   {
    "key": "D",
    "text": "The prompt does not constrain Claude to use only facts present in the supplied source.",
    "correct": true
   }
  ]
 },
 {
  "id": 86,
  "section": "Prompting & Task Framing",
  "type": "multi",
  "prompt": "You are a knowledge worker evaluating which Claude feature matches each proposed use case. Which two feature-to-use-case matches are appropriate? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "long-context summarization for a quarterly report distilled from many sources",
    "correct": true
   },
   {
    "key": "B",
    "text": "long-context summarization for drafting a reply to a single short customer email",
    "correct": false
   },
   {
    "key": "C",
    "text": "web search invocation to retrieve the established formula for calculating compound interest",
    "correct": false
   },
   {
    "key": "D",
    "text": "tool use to invoke a calculator for rephrasing a product description in simpler language",
    "correct": false
   },
   {
    "key": "E",
    "text": "tool use to invoke a calculator for a complex multi-step pricing calculation",
    "correct": true
   }
  ]
 },
 {
  "id": 87,
  "section": "Workflow Integration & Process Design",
  "type": "multi",
  "prompt": "Working as a process consultant integrating a pre-built Skill into a recurring team workflow. Which two practices best support reliable integration? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Define the inputs the Skill expects and the outputs the team will use, so each workflow step has clear hand-off points around the Skill.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Apply the Skill outside its documented scope so the team can stretch its use across several unrelated workflow steps.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Remove all human review from steps that invoke the Skill, relying on the Skill's packaged output as final.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Document which workflow steps invoke the Skill and what human review remains, so accountability and quality gates stay visible to the team across recurring runs.",
    "correct": true
   },
   {
    "key": "E",
    "text": "Bypass the published Skill version by using an unreleased build pulled directly from outside the approved distribution channel.",
    "correct": false
   }
  ]
 },
 {
  "id": 88,
  "section": "Governance, Ethics & Responsible Use",
  "type": "multi",
  "prompt": "As part of a workflow redesign, a process analyst is applying the AI Fluency Framework Delegation competency. Which two criteria most directly inform Delegation decisions? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "The length of time the workflow has existed in its current form, since well-established processes have been sufficiently validated for AI delegation.",
    "correct": false
   },
   {
    "key": "B",
    "text": "The seniority of the team member who currently performs the step, since more senior roles typically involve higher-stakes tasks that warrant human retention.",
    "correct": false
   },
   {
    "key": "C",
    "text": "The visual complexity of the workflow diagram, since steps with more connections and dependencies are more likely to require human oversight.",
    "correct": false
   },
   {
    "key": "D",
    "text": "The reversibility of the task and the consequence of an error, which together indicate whether the step is safe to delegate to Claude or should be retained for human decision-making.",
    "correct": true
   },
   {
    "key": "E",
    "text": "The need for human creativity, empathy, or judgment in the step, which indicates whether the task is appropriate for AI delegation or requires the human capabilities Claude cannot provide.",
    "correct": true
   }
  ]
 },
 {
  "id": 89,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "A project manager is defining how Claude can support requirements analysis for an upcoming engagement. Their team will conduct stakeholder interviews and review existing process documentation as part of discovery. Which activity fits this domain?",
  "options": [
   {
    "key": "A",
    "text": "Use Claude to generate a complete requirements list from the project name and a short description, since requirements for similar engagements are largely standard.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Use Claude to conduct the stakeholder interviews directly, with the analyst reviewing the recordings afterward to confirm the requirements Claude extracted.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Use Claude to synthesize stakeholder inputs and existing process documentation into a structured list of requirements with traceability to each source.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Use Claude to prioritize the requirements the team has already gathered, leaving the gathering itself to manual analyst work since prioritization is more time-consuming.",
    "correct": false
   }
  ]
 },
 {
  "id": 90,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are decomposing a \"build a customer journey map\" request. Which is the correct order of decomposed steps?\n(1) Identify the touchpoints the customer encounters during each stage.\n(2) Define the persona and the journey scope to be mapped.\n(3) Capture pain points and opportunities at each touchpoint.\n(4) Synthesize the findings into the final journey-map artifact.\n(5) Identify the major stages the persona moves through.",
  "options": [
   {
    "key": "A",
    "text": "2, 5, 1, 3, 4",
    "correct": true
   },
   {
    "key": "B",
    "text": "5, 2, 1, 3, 4",
    "correct": false
   },
   {
    "key": "C",
    "text": "1, 2, 5, 3, 4",
    "correct": false
   },
   {
    "key": "D",
    "text": "2, 1, 5, 3, 4",
    "correct": false
   }
  ]
 },
 {
  "id": 91,
  "section": "Workflow Integration & Process Design",
  "type": "single",
  "prompt": "A knowledge worker is defining what \"workflow optimization\" means at the Associate level for the team's recurring AI-supported workflows. Which description is most accurate?",
  "options": [
   {
    "key": "A",
    "text": "reducing the number of steps in the workflow to the smallest possible count, since fewer steps mean faster cycle time and lower error rates",
    "correct": false
   },
   {
    "key": "B",
    "text": "reducing redundancy, removing low-value steps, and applying Claude where it adds measurable value, while keeping required reviews and quality gates",
    "correct": true
   },
   {
    "key": "C",
    "text": "replacing manual steps with Claude-supported steps wherever possible, since each replacement adds value by reducing the time the team spends on the workflow",
    "correct": false
   },
   {
    "key": "D",
    "text": "standardizing every step of the workflow to a fixed template so each run produces identical output, without adjusting for variation in the workflow's inputs",
    "correct": false
   }
  ]
 },
 {
  "id": 92,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are a knowledge worker deciding whether to escalate a Claude-generated output. Which is the correct order of decision steps?\n(1) Identify the audience and the impact of the output if it is wrong.\n(2) Document the decision and the rationale for traceability.\n(3) Compare the output's risk profile to the organization's escalation criteria.\n(4) Decide whether to use, iterate further, or escalate.\n(5) Assess the output's accuracy, completeness, and any unverified claims.",
  "options": [
   {
    "key": "A",
    "text": "1, 3, 5, 4, 2",
    "correct": false
   },
   {
    "key": "B",
    "text": "1, 5, 3, 4, 2",
    "correct": false
   },
   {
    "key": "C",
    "text": "3, 1, 5, 4, 2",
    "correct": false
   },
   {
    "key": "D",
    "text": "5, 1, 3, 4, 2",
    "correct": true
   }
  ]
 },
 {
  "id": 93,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are prioritizing optimization actions across a recurring Claude workflow. Which optimization action typically has the highest impact in a recurring knowledge workflow?",
  "options": [
   {
    "key": "A",
    "text": "codifying the recurring prompt into a Project with the relevant references and instructions",
    "correct": true
   },
   {
    "key": "B",
    "text": "refining the output format template used in the team's documentation to improve readability",
    "correct": false
   },
   {
    "key": "C",
    "text": "rewriting the most recent version of the prompt to improve its clarity for the next run",
    "correct": false
   },
   {
    "key": "D",
    "text": "updating the shared folder structure where Claude outputs are saved after each workflow run",
    "correct": false
   }
  ]
 },
 {
  "id": 94,
  "section": "Communication & Stakeholder Adaptation",
  "type": "single",
  "prompt": "A project lead is evaluating a Claude-generated status report against the project charter. The report will be delivered to a steering committee, which expects accurate status against committed milestones. Which set of criteria provides the strongest evaluation frame?",
  "options": [
   {
    "key": "A",
    "text": "readability, narrative flow, and whether the report tells a coherent story about the project's progress",
    "correct": false
   },
   {
    "key": "B",
    "text": "match to the prior status report's structure, since the steering committee expects consistent reporting from period to period",
    "correct": false
   },
   {
    "key": "C",
    "text": "accuracy of facts against the charter, completeness against required reporting fields, and relevance to the audience receiving the report",
    "correct": true
   },
   {
    "key": "D",
    "text": "length, formatting consistency, and tone appropriateness for a steering committee audience",
    "correct": false
   }
  ]
 },
 {
  "id": 95,
  "section": "Workflow Integration & Process Design",
  "type": "single",
  "prompt": "You are running an optimization pass on a recurring workflow. Which is the correct order of optimization steps?\n(1) Apply targeted optimization to the bottleneck step.\n(2) Roll out the optimized workflow to the broader team and document the change.\n(3) Identify the bottleneck step using measured time per step and queue length.\n(4) Map the current workflow steps, owners, and decision points.\n(5) Pilot the change with a small group and measure the effect against the prior baseline.",
  "options": [
   {
    "key": "A",
    "text": "3, 4, 1, 5, 2",
    "correct": false
   },
   {
    "key": "B",
    "text": "1, 4, 3, 5, 2",
    "correct": false
   },
   {
    "key": "C",
    "text": "4, 1, 3, 5, 2",
    "correct": false
   },
   {
    "key": "D",
    "text": "4, 3, 1, 5, 2",
    "correct": true
   }
  ]
 },
 {
  "id": 96,
  "section": "Workflow Integration & Process Design",
  "type": "multi",
  "prompt": "An operations assistant is redesigning a recurring data processing workflow step to use Code Execution. Which two design choices best support reliable integration? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Standardize the input file format the step expects, so each run of the Code Execution step receives consistent input and produces comparable, verifiable output across recurring weekly cycles.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Embed the Code Execution step inside the workflow and document the fields it produces only in code comments, without a separate reference the rest of the team can consult.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Allow the input file format to vary from run to run based on whichever source system happens to supply the data that week, since the Code Execution step can adapt to differences automatically.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Reduce the human review step to a brief final glance at the output before it advances to downstream consumers, treating Code Execution's internal checks as sufficient validation.",
    "correct": false
   },
   {
    "key": "E",
    "text": "Define a brief output verification step in which the human reviewer confirms the computed result against an expected range or sanity check before the output advances to downstream consumers.",
    "correct": true
   }
  ]
 },
 {
  "id": 97,
  "section": "Model Selection & Capabilities",
  "type": "single",
  "prompt": "A knowledge worker is explaining the cost, speed, and quality trade-offs across Claude models to a colleague. Which generalization correctly describes the trade-off?",
  "options": [
   {
    "key": "A",
    "text": "More capable models generally consume more of the rate limit and run more slowly, while lighter models are faster and consume less of the rate limit.",
    "correct": true
   },
   {
    "key": "B",
    "text": "More capable models generally consume less of the rate limit because their reasoning is more efficient, even though they run more slowly than lighter models.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Speed and rate-limit consumption are independent of model capability; the difference between Haiku, Sonnet, and Opus is reasoning depth alone.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Lighter models consume more of the rate limit per request than more capable models, since lighter models require multiple passes to match heavier-model quality.",
    "correct": false
   }
  ]
 },
 {
  "id": 98,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are a project lead reviewing a teammate's habit of using the same prompt template for every task regardless of type. Which feedback is most warranted?",
  "options": [
   {
    "key": "A",
    "text": "Task type has no effect on the appropriate prompting strategy, so a single template should perform equally well across every kind of task.",
    "correct": false
   },
   {
    "key": "B",
    "text": "The prompting strategy should be adapted to each task type because one template does not produce equally strong outputs across all tasks.",
    "correct": true
   },
   {
    "key": "C",
    "text": "The habit is reasonable because a proven template reduces prompt-writing time and most business tasks share the same structure.",
    "correct": false
   },
   {
    "key": "D",
    "text": "The prompting strategy should change only when the desired response length needs adjusting, since other differences between tasks rarely affect the appropriate approach.",
    "correct": false
   }
  ]
 },
 {
  "id": 99,
  "section": "Output Evaluation & Validation",
  "type": "single",
  "prompt": "A project manager is evaluating a proposal to use Claude to autonomously approve refunds above a defined threshold without human review. The volume is high (roughly 2,000 refunds per week), the average refund amount is moderate, and a small percentage of refunds in audits historically required correction. The team needs to reduce cycle time. Which response is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Approve the proposal but cap autonomous approvals at the threshold the team currently audits, so the existing audit sample continues to catch any errors after the fact.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Decline the autonomous-approval design and propose Claude triage refunds into auto-approve (low-risk), human-approve (standard), and escalate-to-supervisor (high-risk) lanes.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Approve the proposal and replace human review with a daily audit of a random sample of autonomous approvals, with corrective action taken on errors found.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Decline the autonomous-approval design and propose Claude pre-fill the refund decision and rationale, with a human approver completing each refund before it is issued.",
    "correct": false
   }
  ]
 },
 {
  "id": 100,
  "section": "Output Evaluation & Validation",
  "type": "multi",
  "prompt": "A Claude associate is evaluating whether to enable a Skill that was provided by an unfamiliar third party. Which two checks best support a sound trust decision? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Review the permissions and capabilities the Skill requests and confirm that the requested access is appropriate for the task the Skill is intended to perform.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Skip the permissions review because the Skill's description sounds narrowly scoped to its stated purpose.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Treat the Skill's appearance in a public listing as sufficient validation of its source and requested permissions.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Verify the source of the Skill against the organization's approved-Skill list before enabling it within claude.ai or any Project the team uses for its work.",
    "correct": true
   },
   {
    "key": "E",
    "text": "Enable the Skill based on strong reviews from external users in public forums, treating positive community feedback as a substitute for checking the source against the organization's approved list.",
    "correct": false
   }
  ]
 },
 {
  "id": 101,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are a business analyst evaluating a Claude-generated business case against the agreed acceptance criteria. Which is the correct order of evaluation steps?\n(1) Compare the business case to the source data and required topics.\n(2) Document gaps and inaccuracies for follow-up or correction.\n(3) Restate the acceptance criteria for the business case.\n(4) Decide whether to use the business case, iterate, or escalate.\n(5) Read the business case end to end to form an initial impression.",
  "options": [
   {
    "key": "A",
    "text": "3, 1, 5, 2, 4",
    "correct": false
   },
   {
    "key": "B",
    "text": "5, 3, 1, 2, 4",
    "correct": false
   },
   {
    "key": "C",
    "text": "1, 3, 5, 2, 4",
    "correct": false
   },
   {
    "key": "D",
    "text": "3, 5, 1, 2, 4",
    "correct": true
   }
  ]
 },
 {
  "id": 102,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "A procurement manager is evaluating a Claude-generated vendor proposal summary against the original RFP. The RFP lists twelve numbered requirements across pricing, security, and service levels. How should the summary be checked for completeness?",
  "options": [
   {
    "key": "A",
    "text": "Compare the section headings in the summary to the section headings in the RFP, since matching headings indicate matching content.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Spot-check three random requirements from the RFP against the summary, since random sampling is the standard completeness check for summaries.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Map each numbered requirement in the RFP to a section of the summary and confirm that each requirement is represented.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Read the summary end to end and confirm it reads as a coherent response to the RFP, since coherent summaries typically reflect coverage of the source.",
    "correct": false
   }
  ]
 },
 {
  "id": 103,
  "section": "Prompting & Task Framing",
  "type": "multi",
  "prompt": "You are designing a checklist for evaluating Claude outputs and must complete the upstream steps before scoring an output. Which two steps must be completed BEFORE scoring a Claude output against the checklist? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Promote the approved output into the downstream production process.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Define the evaluation criteria that matter for the task at hand.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Specify the threshold that distinguishes acceptable from unacceptable output.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Forward unacceptable outputs to a senior reviewer for second-pass review.",
    "correct": false
   },
   {
    "key": "E",
    "text": "Document the final score and the reviewer comments for the audit trail.",
    "correct": false
   }
  ]
 },
 {
  "id": 104,
  "section": "Output Evaluation & Validation",
  "type": "single",
  "prompt": "You are an analyst fact-checking a Claude-generated report. Two cited sources give conflicting dates for the same event. Which approach is correct?",
  "options": [
   {
    "key": "A",
    "text": "Publish both dates without resolving the conflict and let the reader choose.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Average the two conflicting dates and use the average.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Locate a primary or authoritative source for the event and use the date that source confirms.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Choose the more recent date on the basis that later sources typically reflect updated or corrected information.",
    "correct": false
   }
  ]
 },
 {
  "id": 105,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "You are an operations lead and notice that a Project's outputs have been drifting from the team's current expectations. Which maintenance action should be tried first?",
  "options": [
   {
    "key": "A",
    "text": "Retire the Project and rebuild a new one from scratch with fresh content.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Switch the Project to a different Claude model in the hope it behaves better.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Review the Project's instructions and reference materials against current standards.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Continue using the Project and accept the drift as the new baseline of behavior.",
    "correct": false
   }
  ]
 },
 {
  "id": 106,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are evaluating whether a \"redesign new-hire onboarding\" request should be decomposed before prompting Claude. Which feature of the request most strongly indicates decomposition will help?",
  "options": [
   {
    "key": "A",
    "text": "The request involves content the associate has produced many times before and knows can be handled in a single well-structured prompt.",
    "correct": false
   },
   {
    "key": "B",
    "text": "The request requires multiple distinct outputs: a process map, supporting materials, and a measurement plan.",
    "correct": true
   },
   {
    "key": "C",
    "text": "The request is for a single structured document that can be produced from one set of inputs in one prompt.",
    "correct": false
   },
   {
    "key": "D",
    "text": "The request involves a single well-defined output with a clear input and a familiar format.",
    "correct": false
   }
  ]
 },
 {
  "id": 107,
  "section": "Data Handling, Privacy & Security",
  "type": "multi",
  "prompt": "You are an HR specialist reviewing data items proposed for inclusion in a Claude prompt. Which two data items are appropriate to include in a Claude prompt for a routine task? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "a redacted job description that the model will adapt for a posting",
    "correct": true
   },
   {
    "key": "B",
    "text": "an anonymized summary of an HR policy that the model will rephrase",
    "correct": true
   },
   {
    "key": "C",
    "text": "accommodation request notes from an employee's HR file needed to draft a role adjustment memo",
    "correct": false
   },
   {
    "key": "D",
    "text": "a compensation band summary that includes employee names and current salary figures for a specific team",
    "correct": false
   },
   {
    "key": "E",
    "text": "employee ID numbers and hire dates for the team roster included to help Claude personalize onboarding communications",
    "correct": false
   }
  ]
 },
 {
  "id": 108,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are a knowledge worker who decomposed a \"draft a board memo\" request into fifteen tiny steps and noticed the output now feels disjointed because related ideas were split apart. Which adjustment is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Remove all sequencing so the steps run in random order.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Consolidate related steps into fewer cohesive sections that group naturally connected ideas.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Subdivide each tiny step into ten more tiny steps for additional precision.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Combine the original request back into one unstructured sentence.",
    "correct": false
   }
  ]
 },
 {
  "id": 109,
  "section": "Data Handling, Privacy & Security",
  "type": "single",
  "prompt": "You are an operations team member preparing inputs to summarize customer feedback. The feedback file mixes public quotations with personal contact details. Which preparation approach is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Strip out the feedback content and submit only the personal contact details.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Submit the entire file unchanged so Claude has complete context.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Replace the feedback content with the personal contact details and ask Claude to invent the missing feedback.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Extract only the feedback content needed for the summary, redact or anonymize personal contact details, and submit the trimmed input.",
    "correct": true
   }
  ]
 },
 {
  "id": 110,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "A finance manager must select a Claude feature for a task that requires deterministic calculations across a multi-tab spreadsheet. Which selection best fits the requirement?",
  "options": [
   {
    "key": "A",
    "text": "Use a standard chat prompt for the calculations, which generates text without running code and does not produce the verified deterministic output the multi-tab calculation task requires.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Use the Research feature for the calculations, which gathers and synthesizes external sources and is not the appropriate feature for deterministic computation on an uploaded spreadsheet.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Use an Artifact alone for the calculations, which provides a stable editable surface for the result but does not perform the deterministic computation that Code Execution would run.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Use Code Execution, which runs code in a sandbox to perform calculations on the uploaded file and produce verified outputs the associate can check.",
    "correct": true
   }
  ]
 },
 {
  "id": 111,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "A sales manager is iterating on a Claude-generated solution prototype after a stakeholder review identified two specific concerns. The rest of the prototype was accepted as written. Which iteration approach is most likely to produce a strong next version?",
  "options": [
   {
    "key": "A",
    "text": "Address the two specific concerns and add a third improvement the associate identified, since combining stakeholder feedback with self-identified improvements is more efficient.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Rewrite the prototype from scratch incorporating the two specific concerns, since starting fresh integrates the feedback more cleanly than targeted edits.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Address the two specific concerns and also revise unrelated sections to maintain consistent voice across the prototype after the edits.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Address the two specific concerns directly, leave unrelated parts unchanged, and document the changes for the next review.",
    "correct": true
   }
  ]
 },
 {
  "id": 112,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "multi",
  "prompt": "You are a marketing manager deciding what to include in custom instructions for a writing-focused Project. Which two items belong in the custom instructions? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "the prompt author's preferred response length for internal messages unrelated to external deliverables",
    "correct": false
   },
   {
    "key": "B",
    "text": "the standard structure and the length expectations for typical deliverables",
    "correct": true
   },
   {
    "key": "C",
    "text": "the brand voice and the tonal expectations the writing must follow",
    "correct": true
   },
   {
    "key": "D",
    "text": "the preferred writing style of the marketing manager who will review all final deliverables",
    "correct": false
   },
   {
    "key": "E",
    "text": "a representative sample of past writing that reflects the team's preferred style and structure",
    "correct": false
   }
  ]
 },
 {
  "id": 113,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "You are a knowledge worker transitioning from a long, drifting conversation into a fresh focused session. Which is the correct order of transition steps?\n(1) Begin a new chat and paste the summary as its starting context.\n(2) Summarize the goals, key decisions, and open questions from the long conversation.\n(3) Identify which references should persist beyond the current chat.\n(4) Move persistent references into a Project's knowledge base or attach them as needed.\n(5) Confirm the new chat is on-task before continuing the work.",
  "options": [
   {
    "key": "A",
    "text": "3, 2, 4, 1, 5",
    "correct": false
   },
   {
    "key": "B",
    "text": "2, 4, 3, 1, 5",
    "correct": false
   },
   {
    "key": "C",
    "text": "1, 2, 3, 4, 5",
    "correct": false
   },
   {
    "key": "D",
    "text": "2, 3, 4, 1, 5",
    "correct": true
   }
  ]
 },
 {
  "id": 114,
  "section": "Data Handling, Privacy & Security",
  "type": "multi",
  "prompt": "Before uploading a customer file for a Code Execution analysis, a customer-success associate at Noventra, Ltd. is reviewing the planned task. Which two practices best align with sound data handling? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Skip the upload review entirely on the basis of urgency, even though the file might contain regulated fields that organizational policy requires the user to redact before any code execution.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Confirm that the planned Code Execution task aligns with the organization's data classification policy and escalate to the appropriate contact if the data sensitivity exceeds approved use.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Upload the full unredacted customer file without review, on the assumption that a sandboxed execution environment removes the need to apply the organization's data classification policy.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Bypass the data classification policy because the task is internal, treating sandboxed processing as an exemption from the review the policy requires before sensitive data is uploaded.",
    "correct": false
   },
   {
    "key": "E",
    "text": "Review the file for sensitive, confidential, or regulated fields before upload, and remove or redact any fields that are not required for the planned Code Execution analysis.",
    "correct": true
   }
  ]
 },
 {
  "id": 115,
  "section": "Output Evaluation & Validation",
  "type": "single",
  "prompt": "A Claude associate is reviewing a Claude-drafted set of customer-segment descriptions for an internal marketing brief. One description applies a generalization about a demographic group's purchasing behavior that does not hold for individual customers in the segment. Which response is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Keep the description as written for the internal brief, since internal use does not carry the same risk as external publication of demographic generalizations.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Revise the description to focus on observed behaviors rather than generalizations about people, and validate the revision against actual customer data.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Remove the entire customer-segment description from the brief, since any segmentation that involves demographic characteristics is likely to introduce similar issues.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Add a disclaimer to the description, noting that the generalization may not apply to all individuals in the segment, and keep the underlying description unchanged.",
    "correct": false
   }
  ]
 },
 {
  "id": 116,
  "section": "Output Evaluation & Validation",
  "type": "single",
  "prompt": "You are a bank manager presented with a request to use Claude as the sole decision-maker on customer credit-line approvals. Which response is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Accept the sole-decision-maker design because Claude can process applications faster than a human review team.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Implement the design on a pilot basis and notify compliance only if issues arise during production use.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Decline the sole-decision-maker design and propose Claude assisting analysts who retain decision authority.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Expand the design so Claude both evaluates applications and issues final approval notices to customers directly.",
    "correct": false
   }
  ]
 },
 {
  "id": 117,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "A knowledge worker is applying the AI Fluency Framework Description competency while revising an underperforming prompt. Which revision best reflects Description principles?",
  "options": [
   {
    "key": "A",
    "text": "Remove the existing context from the prompt and submit only the bare task statement, eliminating the audience, format, and constraint information that Description principles call for in a clear specification.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Specify the task scope, the required output format, the audience, and the relevant constraints with sufficient clarity that the prompt produces a useful, reliable output on the next run.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Replace the specific instructions with generic phrasing that broadens the task scope, undoing the specification work that Description principles require for a reliable, useful output on the next run.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Add length to the prompt by inserting filler text that does not specify task scope, output format, audience, or constraints, leaving the original specification gaps in the underperforming prompt unaddressed.",
    "correct": false
   }
  ]
 },
 {
  "id": 118,
  "section": "Model Selection & Capabilities",
  "type": "single",
  "prompt": "You are an analyst working on a one-off complex problem that genuinely requires multi-step reasoning over an extended chain of thought. Which model is best suited to this work?",
  "options": [
   {
    "key": "A",
    "text": "Haiku, because lightweight models are always preferred regardless of complexity.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Any model, because reasoning depth does not vary across the lineup.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Opus, because it is positioned as the most capable for advanced reasoning on complex specialized tasks.",
    "correct": true
   },
   {
    "key": "D",
    "text": "A non-Anthropic model, because the Claude lineup has no option for complex reasoning.",
    "correct": false
   }
  ]
 },
 {
  "id": 119,
  "section": "Communication & Stakeholder Adaptation",
  "type": "multi",
  "prompt": "You are a marketing manager using Claude to ideate concepts for a campaign and must complete the framing steps before generating concepts. Which two framing steps must be completed BEFORE asking Claude to generate concepts? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Define the goal of the campaign and the success metrics for the campaign.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Select a finalist concept and prepare it for stakeholder approval.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Review the Claude-generated concepts and select the two strongest for further development.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Define the brand voice and the audience the concepts will speak to.",
    "correct": true
   },
   {
    "key": "E",
    "text": "Schedule the campaign launch and the rollout dates with the agency.",
    "correct": false
   }
  ]
 },
 {
  "id": 120,
  "section": "Communication & Stakeholder Adaptation",
  "type": "single",
  "prompt": "You are a product designer using Claude in a solution design exercise. Which solution-design step should be performed first when using Claude?",
  "options": [
   {
    "key": "A",
    "text": "Generate candidate solution concepts using Claude across diverse styles.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Compare the candidate concepts against the constraints and select a finalist.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Articulate the problem the solution must address and the constraints in play.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Produce detailed mock-ups of the chosen solution for stakeholder review.",
    "correct": false
   }
  ]
 },
 {
  "id": 121,
  "section": "Workflow Integration & Process Design",
  "type": "single",
  "prompt": "A Claude associate is identifying the bottleneck in a content workflow that takes too long to publish. The workflow has five steps: research, drafting, internal review, legal review, and publication. There is cycle-time data for each step from the past month. Which signal most directly identifies the bottleneck?",
  "options": [
   {
    "key": "A",
    "text": "the step with the longest queue or the largest backlog of items waiting to enter it",
    "correct": true
   },
   {
    "key": "B",
    "text": "the step where individual contributors report the highest workload based on their weekly status updates",
    "correct": false
   },
   {
    "key": "C",
    "text": "the step with the highest average cycle time per item across the past month's runs",
    "correct": false
   },
   {
    "key": "D",
    "text": "the step most recently added to the workflow, based on the assumption that process changes introduce the most friction",
    "correct": false
   }
  ]
 },
 {
  "id": 122,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "A senior manager is reviewing a colleague's habit of never updating their team's Project configurations because \"if it works once, it works forever.\" Which feedback is most warranted?",
  "options": [
   {
    "key": "A",
    "text": "Configurations should be updated only when output quality visibly degrades, since proactive updates risk introducing regressions in working configurations.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Configurations should be left alone if the team is satisfied with current outputs, and any required updates should be handled at the chat level rather than the Project level.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Configurations should be reviewed and updated periodically because policies, terminology, and source documents change over time, even when output quality has not visibly degraded.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Configurations should be updated on a fixed schedule regardless of whether the underlying policies and source documents have changed, since regular maintenance prevents drift.",
    "correct": false
   }
  ]
 },
 {
  "id": 123,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are a research associate preparing inputs for a long task that references two lengthy regulatory documents, but only specific sections apply. Which approach best preserves context-window capacity?",
  "options": [
   {
    "key": "A",
    "text": "Extract only the relevant sections from each document and include those, omitting unrelated chapters.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Paste the full text of both documents without trimming to maximize available material.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Split each document into one-character pieces and feed them one at a time.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Skip the documents entirely and rely on Claude to invent the missing context.",
    "correct": false
   }
  ]
 },
 {
  "id": 124,
  "section": "Output Evaluation & Validation",
  "type": "single",
  "prompt": "You are a senior analyst using Claude to analyze requirements from several stakeholder sources. Which is the correct order of steps?\n(1) Group related requirements and flag conflicts or ambiguities for stakeholder review.\n(2) Validate the structured output against the original sources for accuracy and completeness.\n(3) Submit the consolidated inputs to Claude with a structured extraction prompt.\n(4) Gather and label the source materials so each requirement can be traced.\n(5) Document the final requirements set with source traceability and status.",
  "options": [
   {
    "key": "A",
    "text": "1, 4, 3, 2, 5",
    "correct": false
   },
   {
    "key": "B",
    "text": "4, 3, 1, 2, 5",
    "correct": true
   },
   {
    "key": "C",
    "text": "3, 4, 1, 2, 5",
    "correct": false
   },
   {
    "key": "D",
    "text": "4, 1, 3, 2, 5",
    "correct": false
   }
  ]
 },
 {
  "id": 125,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "An account manager has used Claude to extract requirements from stakeholder notes. Three requirements appear to conflict: two stakeholders specified mutually exclusive workflow steps, and a third requirement assumes an outcome the first two would prevent. Which step is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Present all three conflicting requirements as alternative options in the requirements document, leaving the resolution to the project's decision-making process later.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Apply Claude to propose a compromise wording for each conflict and submit the compromise to stakeholders as the proposed resolution.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Flag the conflicts in the requirements document, document the source for each side, and route the conflicts back to the originating stakeholders for resolution.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Select the requirement that has the strongest business justification in the source notes, set the conflicting requirements aside, and proceed with the selected one.",
    "correct": false
   }
  ]
 },
 {
  "id": 126,
  "section": "Claude Features (Projects, Skills, Connectors, Memory)",
  "type": "single",
  "prompt": "An HR business partner is building a long-running workspace where a team handbook, a leveling guide, and a policies-FAQ document will be referenced across many separate chats by several team members. Which Claude feature is designed for this use case?",
  "options": [
   {
    "key": "A",
    "text": "Connect the team's Google Drive folder where the three documents live, so the connector surfaces them inside each chat at the moment the chat needs them.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Create a Project, which provides a persistent workspace with its own knowledge base and custom instructions shared across chats and members.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Generate an Artifact containing the three documents, which gives the team an editable surface for the reference content that persists across chats.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Attach all three documents to each chat as needed, since per-chat attachments give the chat direct access to the documents without additional setup.",
    "correct": false
   }
  ]
 },
 {
  "id": 127,
  "section": "Communication & Stakeholder Adaptation",
  "type": "multi",
  "prompt": "You are a business analyst reviewing prompt drafts written by teammates. Which two elements belong in a well-structured prompt for a business task? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "a clear statement of the task that the model must perform",
    "correct": true
   },
   {
    "key": "B",
    "text": "relevant context such as the audience and the goal of the task",
    "correct": true
   },
   {
    "key": "C",
    "text": "a friendly, conversational tone instruction to make responses feel more approachable",
    "correct": false
   },
   {
    "key": "D",
    "text": "a comprehensive list of company products and services to provide the model with business context",
    "correct": false
   },
   {
    "key": "E",
    "text": "a short personal anecdote to make the prompt feel more conversational",
    "correct": false
   }
  ]
 },
 {
  "id": 128,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are a procurement associate decomposing a vendor-evaluation task. Which dependency ordering reflects sound sequencing?",
  "options": [
   {
    "key": "A",
    "text": "Define evaluation criteria first, gather vendor data against those criteria, then score and rank.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Skip criteria and ask Claude to produce a vendor recommendation from no inputs.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Score vendors first and decide on the criteria afterward.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Rank vendors before any data is collected.",
    "correct": false
   }
  ]
 },
 {
  "id": 129,
  "section": "Prompting & Task Framing",
  "type": "multi",
  "prompt": "You are reviewing claims about prompt iteration that colleagues have made in a recent training. Which two claims about prompt iteration are accurate? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Iteration should stop only after every possible alternative phrasing has been tried.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Repeated resubmission of the same prompt is the most reliable way to improve output.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Iteration is most productive when each change targets a specific diagnosed weakness.",
    "correct": true
   },
   {
    "key": "D",
    "text": "More iterations always produce a better output regardless of what was changed.",
    "correct": false
   },
   {
    "key": "E",
    "text": "Output comparison against original criteria validates whether iteration helped.",
    "correct": true
   }
  ]
 },
 {
  "id": 130,
  "section": "Communication & Stakeholder Adaptation",
  "type": "multi",
  "prompt": "You are validating evaluation criteria proposed for a Claude-generated business brief. Which two criteria are valid for evaluating a Claude-generated brief? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "factual accuracy of the claims made against the supplied source material",
    "correct": true
   },
   {
    "key": "B",
    "text": "consistency of the writing style with the organization's established tone guidelines",
    "correct": false
   },
   {
    "key": "C",
    "text": "alignment of the output with the requested format and length constraints",
    "correct": true
   },
   {
    "key": "D",
    "text": "total word count of the output relative to industry benchmarks for business briefs",
    "correct": false
   },
   {
    "key": "E",
    "text": "presence of an executive summary section as a structural completeness check",
    "correct": false
   }
  ]
 },
 {
  "id": 131,
  "section": "Communication & Stakeholder Adaptation",
  "type": "single",
  "prompt": "Preparing a stakeholder communication about a proposed Claude use case, a senior manager is applying the AI Fluency Framework Description competency. Which framing best reflects Description principles for stakeholder communication?",
  "options": [
   {
    "key": "A",
    "text": "Omit the human oversight that will remain in place from the communication, even though Description principles require setting expectations that reflect the actual capability boundaries of the use case.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Understate Claude's capabilities to lower stakeholder expectations, even though Description principles require accuracy in both directions rather than systematic minimization of what Claude can produce.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Describe what Claude can reliably produce for the use case, the known limitations, and the human oversight that will remain in place, calibrated to the audience's familiarity with AI.",
    "correct": true
   },
   {
    "key": "D",
    "text": "Overstate Claude's capabilities to secure stakeholder support, even though Description principles require accurate framing of what Claude can and cannot reliably produce for the proposed use case.",
    "correct": false
   }
  ]
 },
 {
  "id": 132,
  "section": "Workflow Integration & Process Design",
  "type": "multi",
  "prompt": "You are reviewing colleagues' responses to feedback received on Claude-drafted communications. Which two feedback responses are productive? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "incorporating all feedback received, including contradictory suggestions, into the next draft simultaneously",
    "correct": false
   },
   {
    "key": "B",
    "text": "deferring all feedback to a later revision cycle to avoid disrupting the current draft's consistency",
    "correct": false
   },
   {
    "key": "C",
    "text": "asking clarifying questions when feedback is ambiguous before acting on it",
    "correct": true
   },
   {
    "key": "D",
    "text": "mapping each piece of feedback to the specific change made in the next draft",
    "correct": true
   },
   {
    "key": "E",
    "text": "declining to revise sections that were generated by Claude on the basis that the model's output should be trusted as written",
    "correct": false
   }
  ]
 },
 {
  "id": 133,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "A learning specialist is configuring a Project for course-design work. Their organization has an internal instructional-design standard and a preferred output structure for lesson outlines. Which custom-instruction set best supports this use case?",
  "options": [
   {
    "key": "A",
    "text": "Name Claude's role as a course designer, require alignment to the organization's instructional-design standards, and specify the preferred output structure for lesson outlines.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Name Claude's role as a course designer and require alignment to the organization's instructional-design standards; leave output structure to Claude based on the topic of each lesson.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Specify only the preferred output structure for lesson outlines, since the structure carries the standards implicitly and naming the role adds no value.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Name Claude's role as a course designer; let each chat's prompt specify the standards and output structure for that lesson, since lessons vary widely.",
    "correct": false
   }
  ]
 },
 {
  "id": 134,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are reviewing a Claude-generated competitor brief for unsupported claims. Which is the correct order of review steps?\n(1) Cross-check each specific claim against the supplied source material or trusted external references.\n(2) Decide whether to correct, re-prompt, or escalate based on findings.\n(3) Document each unsupported or inconsistent claim with location and severity.\n(4) Identify the specific factual claims, statistics, and citations in the brief.\n(5) Read the brief end to end and flag any claims that feel surprising.",
  "options": [
   {
    "key": "A",
    "text": "5, 1, 4, 3, 2",
    "correct": false
   },
   {
    "key": "B",
    "text": "1, 4, 5, 3, 2",
    "correct": false
   },
   {
    "key": "C",
    "text": "5, 4, 1, 3, 2",
    "correct": false
   },
   {
    "key": "D",
    "text": "4, 5, 1, 3, 2",
    "correct": true
   }
  ]
 },
 {
  "id": 135,
  "section": "Communication & Stakeholder Adaptation",
  "type": "single",
  "prompt": "A business analyst is converting a sticky-note request from a stakeholder into a structured prompt for Claude. Which is the correct order of conversion steps?\n(1) Confirm the audience and the decision the response must support.\n(2) Submit the structured prompt to Claude.\n(3) Identify the underlying task hidden in the sticky-note language.\n(4) Specify the desired length, tone, and output format.\n(5) Add the supporting facts and constraints relevant to the task.",
  "options": [
   {
    "key": "A",
    "text": "1, 3, 5, 4, 2",
    "correct": false
   },
   {
    "key": "B",
    "text": "2, 3, 1, 5, 4",
    "correct": false
   },
   {
    "key": "C",
    "text": "3, 1, 5, 4, 2",
    "correct": true
   },
   {
    "key": "D",
    "text": "3, 5, 1, 4, 2",
    "correct": false
   }
  ]
 },
 {
  "id": 136,
  "section": "Prompting & Task Framing",
  "type": "multi",
  "prompt": "You are a business analyst deciding which output formatting and context-window practices to recommend to teammates. Which two practices represent effective use of the context window? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Reuse the same context block across multiple requests to avoid rebuilding it each time.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Paste full email threads related to the project into context so the model has complete conversational history.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Concatenate all source documents end-to-end with no separators between them.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Trim irrelevant material before submitting the request to keep context focused.",
    "correct": true
   },
   {
    "key": "E",
    "text": "Use clear section headers to separate different parts of the input material.",
    "correct": true
   }
  ]
 },
 {
  "id": 137,
  "section": "Communication & Stakeholder Adaptation",
  "type": "single",
  "prompt": "A Claude associate is troubleshooting a Claude response that addressed only one of three required questions in a prompt. The prompt listed all three questions in a single paragraph separated by commas. Which root cause is most likely?",
  "options": [
   {
    "key": "A",
    "text": "The prompt's audience and tone specification overshadowed the task statement, so Claude prioritized voice over coverage.",
    "correct": false
   },
   {
    "key": "B",
    "text": "The prompt's required questions were addressed implicitly across the response, even though the response did not visibly answer each question.",
    "correct": false
   },
   {
    "key": "C",
    "text": "The prompt was too long and Claude focused on the question with the strongest grounding in the surrounding context.",
    "correct": false
   },
   {
    "key": "D",
    "text": "The prompt's task statement did not enumerate the three required questions explicitly enough for Claude to address each one in turn.",
    "correct": true
   }
  ]
 },
 {
  "id": 138,
  "section": "Prompting & Task Framing",
  "type": "single",
  "prompt": "You are a refining a prompt over several iterations. The output drifts further from the requested template with each change. Which step is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Revert to the version of the prompt that produced the closest match and adjust from that baseline.",
    "correct": true
   },
   {
    "key": "B",
    "text": "Discard all prior versions and start with no record of what worked.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Continue making large simultaneous changes until the output happens to align.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Stop iterating and accept the most off-target version.",
    "correct": false
   }
  ]
 },
 {
  "id": 139,
  "section": "Output Evaluation & Validation",
  "type": "single",
  "prompt": "An associate is responding to an executive who claims that Claude will eliminate the need for any human review on customer-facing content. The executive is the budget approver for the team's AI tools. Which response is most appropriate?",
  "options": [
   {
    "key": "A",
    "text": "Pilot the executive's proposal on a low-risk subset of customer-facing content first, and use the pilot results to make the case for retaining human review on higher-risk content.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Acknowledge the productivity gains, then explain that human review remains essential on customer-facing content because of accuracy and brand risk, with specific examples.",
    "correct": true
   },
   {
    "key": "C",
    "text": "Escalate the executive's claim to a senior leader outside the team before responding directly, since the issue affects more than just the associate's team.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Defer to the executive's authority and remove the human review step from customer-facing content, monitoring the results closely for the first several weeks.",
    "correct": false
   }
  ]
 },
 {
  "id": 140,
  "section": "Model Selection & Capabilities",
  "type": "multi",
  "prompt": "You are a project manager at Orinexa, Inc. You are picking a Claude model for a new production workload and must complete the requirements steps before testing candidates. Which two steps must be completed BEFORE testing candidate models on a representative sample? (Select two.)",
  "options": [
   {
    "key": "A",
    "text": "Sign off on the production rollout plan with the platform and security teams.",
    "correct": false
   },
   {
    "key": "B",
    "text": "Promote the selected model to production traffic for the workload.",
    "correct": false
   },
   {
    "key": "C",
    "text": "Retest the selected model whenever a new model version is released.",
    "correct": false
   },
   {
    "key": "D",
    "text": "Define the quality bar, the latency tolerance, and the expected request volume.",
    "correct": true
   },
   {
    "key": "E",
    "text": "Choose a candidate model based on the requirements profile and known capabilities.",
    "correct": true
   }
  ]
 }
];
