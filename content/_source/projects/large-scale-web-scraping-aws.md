# project-5 → large-scale-web-scraping-aws

## Hugo front matter

```json
{
  "title": "Scrapy + AWS EC2 + S3",
  "date": "2021-04-19T06:14:34.000Z",
  "image": "images/portfolio/scrapy_awsec2.jpg",
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
      "content": "Cary Sparrow"
    }
  ]
}
```

## Hugo body

The main goal of project was to develop a web scraping solution to collect data from millions of pages from indeed.com and store inside of AWS S3 bucket under specific folder and naming conventions. 


#### Project Details

Python's Scrapy framework was used with Crawlera as proxy rotator so bot does not get blocked. There was a middleware in place which was pushing data into S3. Scrapy bot was deployed on AWS EC2 Ubuntu instance was running on specified schedule. As a result, we have extracted millions of data points and stored inside of an S3 bucket.

## Catalogue entry

```json
{
  "id": "project-5",
  "title": "Scrapy + AWS EC2 + S3",
  "site_title": "Scrapy + AWS EC2 + S3",
  "date": "2021-04-19",
  "url": "https://davitgadyan.github.io/portfolio_app/portfolio/project-5/",
  "client": "Cary Sparrow",
  "listed": true,
  "summary": "Large-scale Scrapy crawler collecting millions of Indeed pages into structured S3 storage on a schedule.",
  "themes": [
    "Data engineering & web scraping",
    "MLOps, cloud & deployment"
  ],
  "industries": [
    "HR & recruitment"
  ],
  "domains": [
    "Web scraping",
    "Data engineering",
    "Cloud"
  ],
  "skills": [
    "Scrapy",
    "Crawlera proxy rotation",
    "AWS S3",
    "AWS EC2",
    "Scrapy middleware",
    "Scheduled jobs"
  ],
  "site_tags": [
    "Web Scraping",
    "Cloud"
  ],
  "role": "Sole engineer",
  "outcomes": [
    "Millions of data points extracted and stored in S3 under a defined folder and naming convention",
    "Ran on schedule from an EC2 Ubuntu instance without being blocked"
  ],
  "cv_bullet": "Built a large-scale Scrapy crawler with Crawlera proxy rotation and a custom S3 middleware, running scheduled on AWS EC2 to extract millions of job-listing data points into structured S3 storage.",
  "links": [],
  "notes": [],
  "image": "https://davitgadyan.github.io/portfolio_app/images/portfolio/scrapy_awsec2.jpg",
  "source_text": "The main goal of project was to develop a web scraping solution to collect data from millions of pages from indeed.com and store inside of AWS S3 bucket under specific folder and naming conventions.\n\n#### Project Details\n\nPython’s Scrapy framework was used with Crawlera as proxy rotator so bot does not get blocked. There was a middleware in place which was pushing data into S3. Scrapy bot was deployed on AWS EC2 Ubuntu instance was running on specified schedule. As a result, we have extracted millions of data points and stored inside of an S3 bucket.",
  "also_published_as": []
}
```
