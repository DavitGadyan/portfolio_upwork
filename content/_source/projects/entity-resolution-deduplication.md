# project-4 → entity-resolution-deduplication

## Hugo front matter

```json
{
  "title": "Entity Resolution",
  "date": "2021-06-30T06:14:34.000Z",
  "image": "images/portfolio/entity-resolution.jpg",
  "categories": [
    "machine learning"
  ],
  "description": "This is meta description.",
  "draft": false,
  "project_info": [
    {
      "name": "Client",
      "icon": "fas fa-user",
      "content": "Dave Imrem"
    }
  ]
}
```

## Hugo body

Entity resolution (ER) is the task of disambiguating records that correspond to real world entities across and within datasets. The applications of entity resolution are tremendous, particularly for public sector and federal datasets related to health, transportation, finance, law enforcement, and antiterrorism.

In more lemon terms, companies may record same client/user multiple times in their system. Entity resolution aims to detect those entities and remove duplicates for future analysis.

#### Project Details

Initially, we tried JedAI open-source software but compute time was too high. After some research I have found a good open-source library called dedupe https://github.com/dedupeio/dedupe. This library was using ML methods and training model based on labeled training set. After output analysis it was clear this method was doing good job and it was considered to be one solution to this problem.

## Catalogue entry

```json
{
  "id": "project-4",
  "title": "Entity Resolution",
  "site_title": "Entity Resolution",
  "date": "2021-06-30",
  "url": "https://davitgadyan.github.io/portfolio_app/portfolio/project-4/",
  "client": "Dave Imrem",
  "listed": true,
  "summary": "Entity resolution to deduplicate records referring to the same real-world entity across and within client datasets.",
  "themes": [
    "Classical ML & predictive modelling"
  ],
  "industries": [
    "Research & public sector"
  ],
  "domains": [
    "Machine learning",
    "Data quality",
    "Record linkage"
  ],
  "skills": [
    "dedupe (Python)",
    "JedAI evaluation",
    "Active-learning labelling",
    "Python",
    "Compute/performance benchmarking"
  ],
  "site_tags": [
    "Machine Learning"
  ],
  "role": "Sole data scientist",
  "outcomes": [
    "Benchmarked JedAI and rejected it on compute cost",
    "Selected and tuned the ML-based dedupe library against a labelled training set, with output analysis confirming quality"
  ],
  "cv_bullet": "Delivered an entity-resolution solution for deduplicating customer records — benchmarked JedAI, rejected it on compute cost, and trained the ML-based dedupe library on a labelled set with output analysis confirming match quality.",
  "links": [
    {
      "label": "Referenced",
      "url": "https://github.com/dedupeio/dedupe"
    }
  ],
  "notes": [],
  "image": "https://davitgadyan.github.io/portfolio_app/images/portfolio/entity-resolution.jpg",
  "source_text": "Entity resolution (ER) is the task of disambiguating records that correspond to real world entities across and within datasets. The applications of entity resolution are tremendous, particularly for public sector and federal datasets related to health, transportation, finance, law enforcement, and antiterrorism.\n\nIn more lemon terms, companies may record same client/user multiple times in their system. Entity resolution aims to detect those entities and remove duplicates for future analysis.\n\n#### Project Details\n\nInitially, we tried JedAI open-source software but compute time was too high. After some research I have found a good open-source library called dedupe https://github.com/dedupeio/dedupe. This library was using ML methods and training model based on labeled training set. After output analysis it was clear this method was doing good job and it was considered to be one solution to this problem.",
  "also_published_as": []
}
```
