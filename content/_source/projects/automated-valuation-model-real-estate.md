# project-15 → automated-valuation-model-real-estate

## Hugo front matter

```json
{
  "title": "Automated Valution model & Real Estate Bot",
  "date": "2021-07-07T06:14:34.000Z",
  "image": "images/portfolio/avm.jpg",
  "categories": [
    "machine learning",
    "web scraping",
    "api"
  ],
  "description": "This is meta description.",
  "draft": false,
  "project_info": [
    {
      "name": "Client",
      "icon": "fas fa-user",
      "content": "Chris Ambas"
    }
  ]
}
```

## Hugo body

Project goals were to create Automated Valuation model and Bot for Australian Real Estate Market.

#### Project Details

Initially, the task was to create an AVM model which will predict property prices as close as possible. Target was the Australian estate market and I started from data collection by combing APIs like https://developer.domain.com.au/ and scraping directly from real estate websites. After gathering much-needed data I created an XGBoost model which has outperformed other algorithms. My target was to improve R2 and I have reached around 84% which was a pretty good result for my use case.

As a next stage client shared an algorithm which was basically how a real estate broker will evaluate the property under consideration to yield the highest profit. Details were clear and after some time prototype was ready and I have started testing. But as you can imagine it required much-needed data. However, the alpha version all features and currently it is just a matter of having enough data to cover all combinations.

## Catalogue entry

```json
{
  "id": "project-15",
  "title": "Automated Valution model & Real Estate Bot",
  "site_title": "Automated Valution model & Real Estate Bot",
  "date": "2021-07-07",
  "url": "https://davitgadyan.github.io/portfolio_app/portfolio/project-15/",
  "client": "Chris Ambas",
  "listed": true,
  "summary": "Automated Valuation Model and broker bot for the Australian real-estate market, from data collection through to a profit-maximising evaluation algorithm.",
  "themes": [
    "Classical ML & predictive modelling",
    "Data engineering & web scraping"
  ],
  "industries": [
    "Real estate & construction"
  ],
  "domains": [
    "Machine learning",
    "Real estate",
    "Web scraping",
    "API integration"
  ],
  "skills": [
    "XGBoost",
    "Python",
    "Domain.com.au API",
    "Web scraping",
    "Feature engineering",
    "Model comparison"
  ],
  "site_tags": [
    "Machine Learning",
    "Web Scraping",
    "Api"
  ],
  "role": "Sole data scientist and developer",
  "outcomes": [
    "XGBoost AVM reached ~84% R² on Australian property prices, outperforming alternatives",
    "Alpha bot implementing the client's broker evaluation algorithm, feature-complete pending data coverage"
  ],
  "cv_bullet": "Built an Automated Valuation Model for the Australian property market — data collected via the Domain.com.au API and direct scraping, with an XGBoost model reaching ~84% R² and outperforming the alternatives tested — plus a broker bot implementing the client's profit-maximising evaluation logic.",
  "links": [
    {
      "label": "Referenced",
      "url": "https://developer.domain.com.au/"
    }
  ],
  "notes": [],
  "image": "https://davitgadyan.github.io/portfolio_app/images/portfolio/avm.jpg",
  "source_text": "Project goals were to create Automated Valuation model and Bot for Australian Real Estate Market.\n\n#### Project Details\n\nInitially, the task was to create an AVM model which will predict property prices as close as possible. Target was the Australian estate market and I started from data collection by combing APIs like https://developer.domain.com.au/ and scraping directly from real estate websites. After gathering much-needed data I created an XGBoost model which has outperformed other algorithms. My target was to improve R2 and I have reached around 84% which was a pretty good result for my use case.\n\nAs a next stage client shared an algorithm which was basically how a real estate broker will evaluate the property under consideration to yield the highest profit. Details were clear and after some time prototype was ready and I have started testing. But as you can imagine it required much-needed data. However, the alpha version all features and currently it is just a matter of having enough data to cover all combinations.",
  "also_published_as": []
}
```
