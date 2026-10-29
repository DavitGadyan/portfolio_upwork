# project-27 → industry-classification-bert

## Hugo front matter

```json
{
  "title": "Classification of Industry of Firm",
  "date": "2024-08-08T06:14:34.000Z",
  "image": "images/portfolio/bert_nyc_orgs.png",
  "categories": [
    "deep learning",
    "machine learning",
    "generative ai",
    "llm",
    "chat gpt"
  ],
  "description": "",
  "draft": false,
  "project_info": [
    {
      "name": "Client",
      "icon": "fas fa-user",
      "content": "Andrew Miles"
    }
  ]
}
```

## Hugo body

Project goals were to infer the industry sectors of New York–based firms—without pre-existing labels—by matching them to reference datasets and then building a machine-learning model to predict NAICS/SIC codes at scale.

### Project Details

In this project I engineered an end-to-end pipeline that:

- Matched unlabeled firms (with only name, owner, address, zip code, city, state, establishment/dissolution years) against secondary registries to retrieve known NAICS/SIC industry codes via fuzzy string and location‐based matching.
- Curated a labeled training set by combining successfully matched entries and augmenting it with a few-shot labeling approach using GPT-4 to expand coverage without manual annotation.
- Developed a BERT-based classifier (experimenting with SVM and Random Forest baselines) in Python to predict industry codes for the remaining unmatched firms, optimizing for accuracy and inference cost.
- Implemented QA controls, with random manual reviews of both matching results and model predictions to ensure high data quality.
- Delivered full documentation and a replication package so stakeholders can reproduce the matching logic, labeling strategy, and model training/inference workflows.

## Catalogue entry

```json
{
  "id": "project-27",
  "title": "Classification of Industry of Firm",
  "site_title": "Classification of Industry of Firm",
  "date": "2024-08-08",
  "url": "https://davitgadyan.github.io/portfolio_app/portfolio/project-27/",
  "client": "Andrew Miles",
  "listed": true,
  "summary": "End-to-end pipeline that infers NAICS/SIC industry codes for unlabelled New York firms by registry matching plus a BERT classifier, with GPT-4 few-shot labelling to expand coverage.",
  "themes": [
    "NLP & text analytics",
    "Classical ML & predictive modelling"
  ],
  "industries": [
    "Research & public sector"
  ],
  "domains": [
    "Machine learning",
    "NLP",
    "Entity matching",
    "Research data"
  ],
  "skills": [
    "Python",
    "BERT",
    "GPT-4 few-shot labelling",
    "Fuzzy string matching",
    "Geospatial matching",
    "SVM",
    "Random Forest",
    "QA process design"
  ],
  "site_tags": [
    "Deep Learning",
    "Machine Learning",
    "Generative Ai",
    "Llm",
    "Chat Gpt"
  ],
  "role": "Sole engineer; delivered documentation and a replication package",
  "outcomes": [
    "Labelled training set built by combining registry matches with GPT-4 few-shot augmentation, avoiding manual annotation",
    "BERT classifier chosen over SVM/Random Forest baselines, optimised for accuracy and inference cost",
    "Random manual QA reviews of both matching and predictions",
    "Replication package delivered so stakeholders can reproduce the whole workflow"
  ],
  "cv_bullet": "Built an end-to-end industry-classification pipeline for unlabelled firm records: fuzzy name/location matching against registries, GPT-4 few-shot labelling to expand the training set, and a BERT classifier (beating SVM/RF baselines) predicting NAICS/SIC codes at scale, with QA controls and a replication package.",
  "links": [],
  "notes": [],
  "image": "https://davitgadyan.github.io/portfolio_app/images/portfolio/bert_nyc_orgs.png",
  "source_text": "Project goals were to infer the industry sectors of New York–based firms—without pre-existing labels—by matching them to reference datasets and then building a machine-learning model to predict NAICS/SIC codes at scale.\n\n### Project Details\n\nIn this project I engineered an end-to-end pipeline that:\n\n- Matched unlabeled firms (with only name, owner, address, zip code, city, state, establishment/dissolution years) against secondary registries to retrieve known NAICS/SIC industry codes via fuzzy string and location‐based matching.\n- Curated a labeled training set by combining successfully matched entries and augmenting it with a few-shot labeling approach using GPT-4 to expand coverage without manual annotation.\n- Developed a BERT-based classifier (experimenting with SVM and Random Forest baselines) in Python to predict industry codes for the remaining unmatched firms, optimizing for accuracy and inference cost.\n- Implemented QA controls, with random manual reviews of both matching results and model predictions to ensure high data quality.\n- Delivered full documentation and a replication package so stakeholders can reproduce the matching logic, labeling strategy, and model training/inference workflows.",
  "also_published_as": []
}
```
