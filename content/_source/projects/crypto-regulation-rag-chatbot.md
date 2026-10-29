# project-31 → crypto-regulation-rag-chatbot

## Hugo front matter

```json
{
  "title": "Crypto Blockchain Analysis RAG",
  "date": "2024-09-30T06:14:34.000Z",
  "image": "images/portfolio/rag_pinecone.png",
  "categories": [
    "generative ai",
    "llm",
    "chat gpt"
  ],
  "description": "",
  "draft": false,
  "project_info": [
    {
      "name": "Private Project Link",
      "icon": "fas fa-link",
      "content": "https://rag-2025-crypto-blockchain4242.streamlit.app"
    }
  ]
}
```

## Hugo body

Project goals were to build a Retrieval-Augmented Generation (RAG) chatbot that leverages ChatGPT-4 and Pinecone for fast, accurate research on 2024 blockchain and crypto regulations across multiple jurisdictions.

### Project Details

- Designed a LangChain-based backend that embeds legal and regulatory texts (PDFs, CSVs, HTML, plain text) into vector representations and indexes them in Pinecone for sub-second retrieval.
- Integrated ChatGPT-4 as the LLM backbone, orchestrating prompts to combine retrieved context with generative responses tailored to user queries about crypto laws.
- Developed a Streamlit frontend, delivering an intuitive conversational UI where users can ask jurisdiction-specific legal questions and view source citations inline.
- Built flexible ingestion pipelines to handle a variety of document formats—automating OCR for scanned PDFs, parsing CSV tables, and scraping HTML from the Global Legal Insights site.
- Optimized vector store performance, tuning embedding dimensions and Pinecone index parameters for cost-effective storage and rapid similarity searches at scale.
- Packaged the solution with deployment scripts, Docker configuration, and clear README instructions so other teams can adapt the RAG chatbot to their own data sources.
- Ensured extensibility, allowing future connectors (e.g., databases, APIs, streaming sources) to be added with minimal code changes.

## Catalogue entry

```json
{
  "id": "project-31",
  "title": "Crypto Blockchain Analysis RAG",
  "site_title": "Crypto Blockchain Analysis RAG",
  "date": "2024-09-30",
  "url": "https://davitgadyan.github.io/portfolio_app/portfolio/project-31/",
  "client": null,
  "listed": true,
  "summary": "RAG chatbot over 2024 blockchain and crypto regulation across jurisdictions, with inline source citations.",
  "themes": [
    "RAG & document intelligence",
    "Agentic AI & LLM systems"
  ],
  "industries": [
    "Legal & compliance",
    "Crypto & blockchain"
  ],
  "domains": [
    "Generative AI / RAG",
    "Legal & regulatory",
    "Crypto / blockchain"
  ],
  "skills": [
    "LangChain",
    "GPT-4",
    "Pinecone",
    "Streamlit",
    "Vector embeddings",
    "OCR for scanned PDFs",
    "CSV/HTML parsing",
    "Web scraping",
    "Docker"
  ],
  "site_tags": [
    "Generative Ai",
    "Llm",
    "Chat Gpt"
  ],
  "role": "Sole architect and builder",
  "outcomes": [
    "Sub-second retrieval over legal texts in Pinecone",
    "Multi-format ingestion (PDF, CSV, HTML, plain text) with automated OCR",
    "Shipped with deployment scripts, Docker config and README so other teams can adapt it"
  ],
  "cv_bullet": "Built a RAG research assistant over multi-jurisdiction crypto regulation (LangChain + GPT-4 + Pinecone, Streamlit UI) with multi-format ingestion including OCR for scanned PDFs, sub-second retrieval and inline source citations.",
  "links": [
    {
      "label": "Private Project Link",
      "url": "https://rag-2025-crypto-blockchain4242.streamlit.app"
    }
  ],
  "notes": [],
  "image": "https://davitgadyan.github.io/portfolio_app/images/portfolio/rag_pinecone.png",
  "source_text": "Project goals were to build a Retrieval-Augmented Generation (RAG) chatbot that leverages ChatGPT-4 and Pinecone for fast, accurate research on 2024 blockchain and crypto regulations across multiple jurisdictions.\n\n### Project Details\n\n- Designed a LangChain-based backend that embeds legal and regulatory texts (PDFs, CSVs, HTML, plain text) into vector representations and indexes them in Pinecone for sub-second retrieval.\n- Integrated ChatGPT-4 as the LLM backbone, orchestrating prompts to combine retrieved context with generative responses tailored to user queries about crypto laws.\n- Developed a Streamlit frontend, delivering an intuitive conversational UI where users can ask jurisdiction-specific legal questions and view source citations inline.\n- Built flexible ingestion pipelines to handle a variety of document formats—automating OCR for scanned PDFs, parsing CSV tables, and scraping HTML from the Global Legal Insights site.\n- Optimized vector store performance, tuning embedding dimensions and Pinecone index parameters for cost-effective storage and rapid similarity searches at scale.\n- Packaged the solution with deployment scripts, Docker configuration, and clear README instructions so other teams can adapt the RAG chatbot to their own data sources.\n- Ensured extensibility, allowing future connectors (e.g., databases, APIs, streaming sources) to be added with minimal code changes.",
  "also_published_as": []
}
```
