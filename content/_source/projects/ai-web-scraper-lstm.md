# project-8 → ai-web-scraper-lstm

## Hugo front matter

```json
{
  "title": "AI powered Scrapy bot",
  "date": "2019-12-30T06:14:34.000Z",
  "image": "images/portfolio/ai-powered-bot.jpeg",
  "categories": [
    "machine learning",
    "deep learning",
    "cloud",
    "web scraping"
  ],
  "description": "This is meta description.",
  "draft": false,
  "project_info": [
    {
      "name": "Client",
      "icon": "fas fa-user",
      "content": "Robin Tar"
    }
  ]
}
```

## Hugo body

Goal of the project was to create a Scrapy bot which will go to thousands of websites from particular sector and extract most important data points like company about page, address, news and specifically employee realted information.

#### Project Details

The complexity of task was that all webpages had different html strucuture. So, practically there was no way to create so many rules and xpaths to capture all data points. 

My solution to this problem was to develop a model, which will detect tags containing needed information and then Scrapy bot will just extract text or other attributes from it. Model of choice in this case was LSTM and it performed well for this task. So with some help I have labelled training set to train model for this task and successfully deployed model on the cloud.

## Catalogue entry

```json
{
  "id": "project-8",
  "title": "AI powered Scrapy bot",
  "site_title": "AI powered Scrapy bot",
  "date": "2019-12-30",
  "url": "https://davitgadyan.github.io/portfolio_app/portfolio/project-8/",
  "client": "Robin Tar",
  "listed": true,
  "summary": "Scrapy bot that extracts company and employee data from thousands of structurally different websites by using an LSTM model to locate the right HTML tags.",
  "themes": [
    "Data engineering & web scraping",
    "NLP & text analytics"
  ],
  "industries": [
    "B2B data / lead generation"
  ],
  "domains": [
    "Machine learning / deep learning",
    "Web scraping",
    "Cloud"
  ],
  "skills": [
    "Scrapy",
    "LSTM",
    "Deep learning",
    "Training-set labelling",
    "Python",
    "Cloud deployment"
  ],
  "site_tags": [
    "Machine Learning",
    "Deep Learning",
    "Cloud",
    "Web Scraping"
  ],
  "role": "Sole engineer",
  "outcomes": [
    "Replaced per-site xpath rules with a learned tag-detection model, making the crawler generalise across thousands of layouts",
    "Model deployed to the cloud in production"
  ],
  "cv_bullet": "Solved cross-site scraping at scale by training an LSTM to detect which HTML tags hold the target fields — replacing thousands of hand-written xpaths — and deploying it behind a Scrapy crawler in the cloud.",
  "links": [],
  "notes": [],
  "image": "https://davitgadyan.github.io/portfolio_app/images/portfolio/ai-powered-bot.jpeg",
  "source_text": "Goal of the project was to create a Scrapy bot which will go to thousands of websites from particular sector and extract most important data points like company about page, address, news and specifically employee realted information.\n\n#### Project Details\n\nThe complexity of task was that all webpages had different html strucuture. So, practically there was no way to create so many rules and xpaths to capture all data points.\n\nMy solution to this problem was to develop a model, which will detect tags containing needed information and then Scrapy bot will just extract text or other attributes from it. Model of choice in this case was LSTM and it performed well for this task. So with some help I have labelled training set to train model for this task and successfully deployed model on the cloud.",
  "also_published_as": []
}
```
