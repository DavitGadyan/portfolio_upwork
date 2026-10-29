# project-11 → scrapy-bigquery-pipeline

## Hugo front matter

```json
{
  "title": "Scrapy + BigQuery + Cloud",
  "date": "2021-06-09T06:14:34.000Z",
  "image": "images/portfolio/scrapy+python.jpg",
  "categories": [
    "web scraping",
    "cloud"
  ],
  "description": "This is meta description.",
  "draft": false,
  "project_info": [
    {
      "name": "Client",
      "icon": "fas fa-user",
      "content": "Josh"
    }
  ]
}
```

## Hugo body

Goal of the project was to extract information for damaged cars from a website that did not have proper API support.

#### Project Details

Scraper was receiving input urls from a BigQuery table and pushing into several other ones. So I have created appropriate pipeline files with Scrapy. Eventually, Scrapy bot was deployed on cloud to run 24/7.

## Catalogue entry

```json
{
  "id": "project-11",
  "title": "Scrapy + BigQuery + Cloud",
  "site_title": "Scrapy + BigQuery + Cloud",
  "date": "2021-06-09",
  "url": "https://davitgadyan.github.io/portfolio_app/portfolio/project-11/",
  "client": "Josh",
  "listed": true,
  "summary": "Scrapy pipeline for damaged-car listings from a site without API support, reading input URLs from BigQuery and writing results back to BigQuery tables.",
  "themes": [
    "Data engineering & web scraping",
    "MLOps, cloud & deployment"
  ],
  "industries": [
    "Automotive"
  ],
  "domains": [
    "Web scraping",
    "Data engineering",
    "Cloud"
  ],
  "skills": [
    "Scrapy",
    "BigQuery",
    "Scrapy pipelines",
    "Cloud deployment",
    "24/7 scheduling"
  ],
  "site_tags": [
    "Web Scraping",
    "Cloud"
  ],
  "role": "Sole developer",
  "outcomes": [
    "BigQuery-in, BigQuery-out scraping pipeline running 24/7 in the cloud"
  ],
  "cv_bullet": "Built a Scrapy pipeline for a site with no API, reading target URLs from BigQuery and writing extracted listings back into BigQuery tables, deployed to run 24/7 in the cloud.",
  "links": [],
  "notes": [],
  "image": "https://davitgadyan.github.io/portfolio_app/images/portfolio/scrapy+python.jpg",
  "source_text": "Goal of the project was to extract information for damaged cars from a website that did not have proper API support.\n\n#### Project Details\n\nScraper was receiving input urls from a BigQuery table and pushing into several other ones. So I have created appropriate pipeline files with Scrapy. Eventually, Scrapy bot was deployed on cloud to run 24/7.",
  "also_published_as": []
}
```
