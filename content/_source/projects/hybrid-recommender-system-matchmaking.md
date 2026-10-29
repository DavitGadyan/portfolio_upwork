# project-9 → hybrid-recommender-system-matchmaking

## Hugo front matter

```json
{
  "title": "Recommender System",
  "date": "2019-02-10T06:14:34.000Z",
  "image": "images/portfolio/recommender-system.jpg",
  "categories": [
    "machine learning",
    "deep learning",
    "recommender system"
  ],
  "description": "This is meta description.",
  "draft": false,
  "project_info": [
    {
      "name": "Client",
      "icon": "fas fa-user",
      "content": "Rafi Newman"
    }
  ]
}
```

## Hugo body

Goal of the project was to create a recommender system for a matchmaking website.

#### Project Details

As a final solution I have created a hybrid recommender system with 3 layers: rule-based, collaborative-based and content-based filtering. Rules were defined by client like male-female, limit for maximum age difference etc.. Then there was collaborative-based filtering which in this context was suggesting pairs together based on their previous choices. As last stage content-based filtering layer was defined as ML model. Ensemble model was created which consisted of Logistic Regression, Random Foresta and Neural Network. 

Results were decent and matched to pairs that experts from company manual had been recommending.

## Catalogue entry

```json
{
  "id": "project-9",
  "title": "Recommender System",
  "site_title": "Recommender System",
  "date": "2019-02-10",
  "url": "https://davitgadyan.github.io/portfolio_app/portfolio/project-9/",
  "client": "Rafi Newman",
  "listed": true,
  "summary": "Hybrid three-layer recommender system for a matchmaking website, combining client rules, collaborative filtering and an ML ensemble.",
  "themes": [
    "Recommender systems & matching",
    "Classical ML & predictive modelling"
  ],
  "industries": [
    "Consumer & leisure"
  ],
  "domains": [
    "Machine learning",
    "Recommender systems",
    "Consumer product"
  ],
  "skills": [
    "Collaborative filtering",
    "Content-based filtering",
    "Logistic Regression",
    "Random Forest",
    "Neural networks",
    "Ensemble modelling",
    "Python"
  ],
  "site_tags": [
    "Machine Learning",
    "Deep Learning",
    "Recommender System"
  ],
  "role": "Sole data scientist",
  "outcomes": [
    "Three-layer architecture: client rules, collaborative filtering, then an ensemble content model",
    "Recommendations matched the pairs the company's human experts were recommending manually"
  ],
  "cv_bullet": "Designed a three-layer hybrid recommender for a matchmaking platform — business rules, collaborative filtering and a Logistic Regression / Random Forest / neural-network ensemble — producing matches that agreed with the company's human expert pairings.",
  "links": [],
  "notes": [],
  "image": "https://davitgadyan.github.io/portfolio_app/images/portfolio/recommender-system.jpg",
  "source_text": "Goal of the project was to create a recommender system for a matchmaking website.\n\n#### Project Details\n\nAs a final solution I have created a hybrid recommender system with 3 layers: rule-based, collaborative-based and content-based filtering. Rules were defined by client like male-female, limit for maximum age difference etc.. Then there was collaborative-based filtering which in this context was suggesting pairs together based on their previous choices. As last stage content-based filtering layer was defined as ML model. Ensemble model was created which consisted of Logistic Regression, Random Foresta and Neural Network.\n\nResults were decent and matched to pairs that experts from company manual had been recommending.",
  "also_published_as": []
}
```
