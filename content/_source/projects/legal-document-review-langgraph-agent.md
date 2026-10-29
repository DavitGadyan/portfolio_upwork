# project-28 → legal-document-review-langgraph-agent

## Hugo front matter

```json
{
  "title": "Gemini LangGraph LLM Agent",
  "date": "2024-08-06T06:14:34.000Z",
  "image": "images/portfolio/gemini_langgraph.png",
  "categories": [
    "deep learning",
    "machine learning",
    "generative ai",
    "llm",
    "langchain",
    "langgraph"
  ],
  "description": "",
  "draft": false,
  "project_info": [
    {
      "name": "Client",
      "icon": "fas fa-user",
      "content": "Alan Arnott"
    }
  ]
}
```

## Hugo body

Project goals were to enhance and extend a document‐review API for a law-firm due diligence workflow, adding dynamic verification checks, external ABN/ACN validation, and configurable recommendations—all powered by a MultiAgent AI pipeline.

### Project Details

In this phase, I architected and implemented a LangChain + LangGraph system backed by Google’s Gemini LLM to:

- Add a Document Verification Section: Introduce AI-driven checks for cross‐references, page numbers, party addresses, signature blocks, and ABN/ACN presence and formatting.
- Integrate External Validation: Leverage an ABN/ACN verification API to confirm the authenticity and digit‐count correctness of Australian business identifiers.
- Enable Dynamic Questioning: Refactor the API to accept arbitrary lists of questions and variables from the web app—no more hard-coded prompts—so the AI can answer any set of user-provided checks.
- Customize Improvement Recommendations: Replace the fixed 10-item recommendation array with a parameterized response, allowing the client to specify how many suggestions they need.
- Support Long Documents: Use a MultiAgent workflow with Gemini’s extended context window to process lengthy contracts and due-diligence materials end-to-end.
- Automate Report Generation: Produce ready-to-use Word-formatted AI review reports that seamlessly integrate into the firm’s internal processes.
- Comprehensive documentation and a replication package ensure the system can be maintained and extended by future developers.

## Catalogue entry

```json
{
  "id": "project-28",
  "title": "Gemini LangGraph LLM Agent",
  "site_title": "Gemini LangGraph LLM Agent",
  "date": "2024-08-06",
  "url": "https://davitgadyan.github.io/portfolio_app/portfolio/project-28/",
  "client": "Alan Arnott",
  "listed": true,
  "summary": "Multi-agent document-review API for a law firm's due-diligence workflow, adding dynamic verification checks, external ABN/ACN validation and configurable recommendations.",
  "themes": [
    "Agentic AI & LLM systems",
    "RAG & document intelligence"
  ],
  "industries": [
    "Legal & compliance"
  ],
  "domains": [
    "Generative AI / agents",
    "Legal tech",
    "Document intelligence",
    "API"
  ],
  "skills": [
    "LangChain",
    "LangGraph",
    "Google Gemini",
    "Multi-agent workflows",
    "Long-context processing",
    "External API integration",
    "Python",
    "Word report generation"
  ],
  "site_tags": [
    "Deep Learning",
    "Machine Learning",
    "Generative Ai",
    "Llm",
    "Langchain",
    "Langgraph"
  ],
  "role": "Architected and implemented the phase; delivered docs and replication package",
  "outcomes": [
    "AI checks for cross-references, page numbers, party addresses, signature blocks and ABN/ACN formatting",
    "ABN/ACN authenticity verified against an external API",
    "Hard-coded prompts replaced with arbitrary user-supplied questions and variables",
    "Long contracts processed end to end via multi-agent workflow on Gemini's extended context",
    "Ready-to-use Word review reports generated automatically"
  ],
  "cv_bullet": "Architected a LangChain + LangGraph multi-agent document-review system on Google Gemini for a law firm's due diligence — dynamic user-defined verification checks, external ABN/ACN validation, long-contract processing and automated Word review reports.",
  "links": [],
  "notes": [],
  "image": "https://davitgadyan.github.io/portfolio_app/images/portfolio/gemini_langgraph.png",
  "source_text": "Project goals were to enhance and extend a document‐review API for a law-firm due diligence workflow, adding dynamic verification checks, external ABN/ACN validation, and configurable recommendations—all powered by a MultiAgent AI pipeline.\n\n### Project Details\n\nIn this phase, I architected and implemented a LangChain + LangGraph system backed by Google’s Gemini LLM to:\n\n- Add a Document Verification Section: Introduce AI-driven checks for cross‐references, page numbers, party addresses, signature blocks, and ABN/ACN presence and formatting.\n- Integrate External Validation: Leverage an ABN/ACN verification API to confirm the authenticity and digit‐count correctness of Australian business identifiers.\n- Enable Dynamic Questioning: Refactor the API to accept arbitrary lists of questions and variables from the web app—no more hard-coded prompts—so the AI can answer any set of user-provided checks.\n- Customize Improvement Recommendations: Replace the fixed 10-item recommendation array with a parameterized response, allowing the client to specify how many suggestions they need.\n- Support Long Documents: Use a MultiAgent workflow with Gemini’s extended context window to process lengthy contracts and due-diligence materials end-to-end.\n- Automate Report Generation: Produce ready-to-use Word-formatted AI review reports that seamlessly integrate into the firm’s internal processes.\n- Comprehensive documentation and a replication package ensure the system can be maintained and extended by future developers.",
  "also_published_as": []
}
```
